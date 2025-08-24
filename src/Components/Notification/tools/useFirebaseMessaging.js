import { getBrowserInfo, canUseFCM, requestNotificationPermission as requestPermission } from './browser-utils';
import { messaging } from './firebase';
import { deleteToken, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const useFirebaseMessaging = () => {
    const [permission, setPermission] = useState('default');
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
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
            // فحص دعم FCM
            if (!canUseFCM()) {
                const browserInfo = getBrowserInfo();
                setError(browserInfo.supportMessage);
                return null;
            }

            // طلب الإذن باستخدام الدالة المحسنة
            const result = await requestPermission();
            setPermission(result.permission);

            if (result.success) {
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
                    
                    toast.success('تم تفعيل الإشعارات بنجاح');
                    return fcmToken;
                } catch (tokenError) {
                    console.error('Error getting FCM token:', tokenError);
                    setError('فشل في الحصول على token الإشعارات');
                    return null;
                }
            } else {
                setError(result.error || 'تم رفض إذن الإشعارات');
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
            toast.success('تم إلغاء تفعيل الإشعارات');
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
            toast.success('تم إرسال إشعار تجريبي');
        } else {
            toast.error('يجب السماح بالإشعارات أولاً');
        }
    };

    // الاستماع للإشعارات في المقدمة
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const unsubscribe = onMessage(messaging, (payload) => {
            // عرض toast notification
            toast.success(payload.notification?.title || 'إشعار جديد', {
                description: payload.notification?.body,
                duration: 5000,
            });
        });

        return () => unsubscribe();
    }, []);

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