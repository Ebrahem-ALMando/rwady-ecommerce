import { useState, useEffect } from 'react';
import { messaging } from "@/hooks/firebase";
import { getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import { useLocale } from 'next-intl';

export const useNotificationToast = () => {
    const [deviceToken, setDeviceToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const lang = useLocale();

    // طلب إذن الإشعارات وجلب توكن الجهاز
    const requestNotificationPermission = async () => {
        console.log('🔔 [useNotificationToast] Starting notification permission request...');
        try {
            if (!messaging) {
                console.warn('⚠️ [useNotificationToast] Firebase messaging is not available');
                return null;
            }

            console.log('🔔 [useNotificationToast] Requesting notification permission...');
            const permission = await Notification.requestPermission();
            console.log('🔔 [useNotificationToast] Permission result:', permission);
            
            if (permission === 'granted') {
                try {
                    console.log('🔔 [useNotificationToast] Getting Firebase token...');
                    const token = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                    });
                    console.log('✅ [useNotificationToast] Firebase token obtained:', token ? 'Token exists' : 'No token');
                    console.log('🔔 [useNotificationToast] Firebase token:', token);
                    return token;
                } catch (tokenError) {
                    console.error('❌ [useNotificationToast] Error getting Firebase token:', tokenError);
                    return null;
                }
            } else {
                console.warn('⚠️ [useNotificationToast] Notification permission denied:', permission);
                return null;
            }
        } catch (error) {
            console.error('❌ [useNotificationToast] Error requesting notification permission:', error);
            return null;
        }
    };

    // دالة عرض التوست المحسن
    const showNotificationToast = (payload) => {
        console.log('📨 [useNotificationToast] Showing notification toast:', payload);
        
        const title = payload.notification?.title || 'إشعار جديد';
        const body = payload.notification?.body || '';
        const image = payload.notification?.icon || payload.notification?.image || '/logo.png';
        
        // تحديث بيانات الإشعارات
        console.log('🔄 [useNotificationToast] Updating notification data...');
        mutate(["notificationData", lang]);
        mutate("notificationDataCount");

        // عرض التوست المحسن
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={image}
                                alt="Notification"
                                onError={(e) => {
                                    e.target.src = '/logo.png';
                                }}
                            />
                        </div>
                        <div className="mr-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 font-arabic">
                                {title}
                            </p>
                            {body && (
                                <p className="mt-1 text-sm text-gray-500 font-arabic line-clamp-2">
                                    {body}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex border-r border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
            position: 'top-right',
        });

        // عرض إشعار محلي إذا كان الإذن ممنوح
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: image,
                badge: '/logo.png',
                tag: 'notification',
                requireInteraction: false,
            });
        }
    };

    // إعداد الاستماع للإشعارات
    useEffect(() => {
        console.log('🚀 [useNotificationToast] Setting up notification listener...');
        
        if (!messaging) {
            console.warn('⚠️ [useNotificationToast] Firebase messaging not available for message listener');
            return;
        }

        console.log('🔔 [useNotificationToast] Setting up message listener...');
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('📨 [useNotificationToast] Received notification:', payload);
            showNotificationToast(payload);
        });

        // تنظيف الاشتراك عند إلغاء تحميل المكون
        return () => {
            console.log('🧹 [useNotificationToast] Cleaning up message listener...');
            unsubscribe();
        };
    }, [lang]);

    return {
        deviceToken,
        setDeviceToken,
        isLoading,
        setIsLoading,
        requestNotificationPermission,
        showNotificationToast
    };
};
