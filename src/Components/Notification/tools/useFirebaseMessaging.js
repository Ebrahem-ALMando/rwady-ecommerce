import { getBrowserInfo } from './browser-utils';
import { messaging } from './firebase';
// import { useAppDispatch } from '@/lib/redux/hooks';
// import { fetchNotifications } from '@/lib/redux/slices/notificationsSlice';
import { deleteToken, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';

// تم تعطيل الكاش في الموقع



export const useFirebaseMessaging = () => {
    const [permission, setPermission] = useState('default');
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useAppDispatch();
    
    // فحص دعم المتصفح
    const browserInfo = getBrowserInfo();

    // حماية: إذا كان Instagram WebView أو WebView عام، أوقف الميزات
    if (browserInfo.isInstagramWebView || browserInfo.isWebView) {
        return {
            permission: 'denied',
            token: null,
            isLoading: false,
            error: 'الإشعارات غير مدعومة في متصفح Instagram. يرجى فتح الموقع في متصفح خارجي.',
            browserSupport: browserInfo,
            requestPermission: async () => null,
            deleteFCMToken: async () => {},
            sendTestNotification: () => {},
        };
    }

    const checkBrowserSupport = () => {
        
        return {
            isFCMSupported: browserInfo.isFCMSupported,
            isPushSupported: browserInfo.isPushSupported,
            isSafari: browserInfo.isSafari,
            isChrome: browserInfo.isChrome,
            isFirefox: browserInfo.isFirefox,
            isEdge: browserInfo.isEdge,
            isWebView: browserInfo.isWebView,
            isMobile: browserInfo.isMobile,
            isInstagramWebView: browserInfo.isInstagramWebView,
            isFacebookWebView: browserInfo.isFacebookWebView,
            isSnapchatWebView: browserInfo.isSnapchatWebView,
            isIOS: browserInfo.isIOS,
            isAndroid: browserInfo.isAndroid,
            browserName: browserInfo.browserName,
            browserVersion: browserInfo.browserVersion,
            platform: browserInfo.platform,
            supportMessage: browserInfo.supportMessage,
            canRequestPermission: browserInfo.canRequestPermission
        };
    };

    const browserSupport = checkBrowserSupport();

    // طلب إذن الإشعارات
    const requestPermission = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const support = checkBrowserSupport();

            // فحص إذا كان المتصفح مدعوم
            if (!support.canRequestPermission) {
                setError(support.supportMessage);
                return null;
            }

            // طلب الإذن
            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);

            if (permissionResult === 'granted') {
                // الحصول على token
                const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
                if (!vapidKey) {
                    setError('VAPID key غير متوفر');
                    return null;
                }

                try {
                    const fcmToken = await getToken(messaging, { vapidKey });
                    setToken(fcmToken);
                    
                    // إرسال token إلى الخادم
                    await sendTokenToServer(fcmToken);
                    
                    toast.custom(() => (
                        <CustomToast
                            title="تم تفعيل الإشعارات بنجاح"
                            type="success"
                        />
                    ) ,{
                        duration: 3000,
                        position: 'top-center',
                    });
                    return fcmToken;
                } catch (tokenError) {
                    console.error('Error getting FCM token:', tokenError);
                    setError('فشل في الحصول على token الإشعارات');
                    return null;
                }
            } else {
                setError('تم رفض إذن الإشعارات');
                return null;
            }
        } catch (err) {
            console.error('Error requesting notification permission:', err);
            setError('حدث خطأ في طلب إذن الإشعارات');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // إرسال token إلى الخادم
    const sendTokenToServer = async (fcmToken) => {
        try {
            const response = await fetch('/api/fcm-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: fcmToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to send token to server');
            }
        } catch (err) {
            console.error('Error sending token to server:', err);
            // لا نريد أن نوقف العملية إذا فشل إرسال token
        }
    };

    // حذف token
    const deleteFCMToken = async () => {
        try {
            await deleteToken(messaging);
            setToken(null);
            setPermission('default');
            toast.custom(() => (
                <CustomToast
                    title="تم إلغاء تفعيل الإشعارات"
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        } catch (err) {
            console.error('Error deleting FCM token:', err);
            setError('فشل في إلغاء تفعيل الإشعارات');
        }
    };

    // إرسال إشعار تجريبي
    const sendTestNotification = () => {
        if (typeof window === 'undefined' || !('Notification' in window)) return;
        
        if (permission === 'granted') {
            new Notification('إشعار تجريبي', {
                body: 'هذا إشعار تجريبي من rwady',
                icon: '/logo.png',
                badge: '/logo.png'
            });
            toast.custom(() => (
                <CustomToast
                    title="تم إرسال إشعار تجريبي"
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        } else {
            toast.custom(() => (
                <CustomToast
                    title="يجب السماح بالإشعارات أولاً"
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        }
    };

    // الاستماع للإشعارات في المقدمة
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const unsubscribe = onMessage(messaging, (payload) => {
            
            // إضافة الإشعار إلى Redux store
            dispatch(fetchNotifications({}));
            
            // عرض toast notification
            toast.custom(() => (
                <CustomToast
                    title={payload.notification?.title || 'إشعار جديد'}
                    type="success"
                />
            ) ,{
                duration: 5000,
                position: 'top-center',
            });
        });

        return () => unsubscribe();
    }, [dispatch]);

    // التحقق من حالة الإذن عند التحميل
    useEffect(() => {
        if (typeof window === 'undefined') return;

        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    return {
        permission,
        token,
        isLoading,
        error,
        browserSupport,
        requestPermission,
        deleteFCMToken,
        sendTestNotification,
    };
}; 