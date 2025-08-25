'use client';

import { useEffect } from 'react';


import { mutate } from 'swr';
import { useLocale } from 'next-intl';
import { showEnhancedToast } from '@/hooks/useNotification';

/**
 * مكون عام لإدارة الإشعارات في جميع أنحاء التطبيق
 * يستمع للإشعارات ويحدث البيانات ويعرض التوست
 */
export default function NotificationProvider() {
    const lang = useLocale();
   
    useEffect(() => {
        if(typeof window !== "undefined") {
        const { messaging } = require('@/hooks/firebase');
        const { onMessage } = require('firebase/messaging');
        if (!messaging) {
            console.warn('⚠️ [NotificationProvider] Firebase messaging not available');
            return;
        }

        const unsubscribe = onMessage(messaging, (payload) => {
            
            // تحديث بيانات الإشعارات في جميع أنحاء التطبيق
            mutate(["notificationData", lang]);
            mutate("notificationDataCount");
            
            // عرض الإشعار باستخدام toast محسن
            if (payload.notification?.title) {
                showEnhancedToast(
                    payload.notification.title, 
                    payload.notification.body, 
                    payload.notification.image || payload.notification.icon
                );
            } else if (payload.notification?.body) {
                showEnhancedToast(
                    'إشعار جديد', 
                    payload.notification.body, 
                    payload.notification.image || payload.notification.icon
                );
            }
        });

        // تنظيف الاشتراك عند إلغاء تحميل المكون
        return () => {
            console.log('🧹 [NotificationProvider] Cleaning up message listener...');
            unsubscribe();
        };
        }
      
    }, [lang]);

    return null;
}
