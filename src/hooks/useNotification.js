import { useState, useEffect } from 'react';
import { messaging } from "@/hooks/firebase";
import { getToken, onMessage } from 'firebase/messaging';
import { toast } from 'react-hot-toast';

export const useNotification = () => {
    const [deviceToken, setDeviceToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // طلب إذن الإشعارات وجلب توكن الجهاز
    const requestNotificationPermission = async () => {
        console.log('🔔 [useNotification] Starting notification permission request...');
        try {
            if (!messaging) {
                console.warn('⚠️ [useNotification] Firebase messaging is not available');
                return null;
            }

            console.log('🔔 [useNotification] Requesting notification permission...');
            const permission = await Notification.requestPermission();
            console.log('🔔 [useNotification] Permission result:', permission);
            
            if (permission === 'granted') {
                try {
                    console.log('🔔 [useNotification] Getting Firebase token...');
                    const token = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                    });
                    console.log('✅ [useNotification] Firebase token obtained:', token ? 'Token exists' : 'No token');
                    console.log('🔔 [useNotification] Firebase token:', token);
                    return token;
                } catch (tokenError) {
                    console.error('❌ [useNotification] Error getting Firebase token:', tokenError);
                    return null;
                }
            } else {
                console.warn('⚠️ [useNotification] Notification permission denied:', permission);
                return null;
            }
        } catch (error) {
            console.error('❌ [useNotification] Error requesting notification permission:', error);
            return null;
        }
    };

    // إعداد الاستماع للإشعارات
    useEffect(() => {
        console.log('🚀 [useNotification] Setting up notification listener...');
        
        if (!messaging) {
            console.warn('⚠️ [useNotification] Firebase messaging not available for message listener');
            return;
        }

        console.log('🔔 [useNotification] Setting up message listener...');
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('📨 [useNotification] Received notification:', payload);
            
            // عرض الإشعار باستخدام toast
            if (payload.notification?.title) {
                console.log('📨 [useNotification] Showing notification with title:', payload.notification.title);
                toast.success(payload.notification.title, {
                    description: payload.notification.body,
                    duration: 5000,
                });
            } else if (payload.notification?.body) {
                console.log('📨 [useNotification] Showing notification with body only');
                toast.success('إشعار جديد', {
                    description: payload.notification.body,
                    duration: 5000,
                });
            }
        });

        // تنظيف الاشتراك عند إلغاء تحميل المكون
        return () => {
            console.log('🧹 [useNotification] Cleaning up message listener...');
            unsubscribe();
        };
    }, []);

    return {
        deviceToken,
        setDeviceToken,
        isLoading,
        setIsLoading,
        requestNotificationPermission
    };
};
