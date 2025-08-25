'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import { useLocale } from 'next-intl';



export const useNotification = () => {
  const [deviceToken, setDeviceToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const lang = useLocale();

  // ✅ طلب إذن الإشعارات وجلب التوكن
  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined') return null;

    try {
      const { messaging } = await import('@/hooks/firebase');
      const { getToken } = await import('firebase/messaging');

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        return token;
      }
    } catch (err) {
      console.error('🚫 Error getting notification token:', err);
    }

    return null;
  };

  // ✅ الاستماع للإشعارات
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let unsubscribe;

    const setupFirebaseListener = async () => {
      try {
        const { messaging } = await import('@/hooks/firebase');
        const { onMessage } = await import('firebase/messaging');

        unsubscribe = onMessage(messaging, (payload) => {
          console.log('🔔 New FCM payload:', payload);

          mutate(['notificationData', lang]);
          mutate('notificationDataCount');

          const { title, body, image } = payload.notification || {};
          showEnhancedToast(title || 'إشعار جديد', body, image);
        });
      } catch (err) {
        console.error('🚫 Error setting up notification listener:', err);
      }
    };

    setupFirebaseListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [lang]);

  return {
    deviceToken,
    setDeviceToken,
    isLoading,
    setIsLoading,
    requestNotificationPermission,
  };
};

// ✅ التوست المحسن
export const showEnhancedToast = (title, message, imageUrl) => {
  if (typeof window === 'undefined') return;

  const CustomToast = require('@/Components/Shared/CustomToast/CustomToast').default;

  let type = 'success';
  const titleLower = title?.toLowerCase() || '';

  if (titleLower.includes('نجح') || titleLower.includes('تم') || titleLower.includes('success')) {
    type = 'success';
  } else if (titleLower.includes('خطأ') || titleLower.includes('فشل') || titleLower.includes('error')) {
    type = 'error';
  } else if (titleLower.includes('تحذير') || titleLower.includes('warning')) {
    type = 'warning';
  }

  const customIcon = imageUrl ? (
    <img
      src={imageUrl}
      alt="Notification"
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        objectFit: 'cover',
      }}
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  ) : null;

  toast.custom((t) => (
    <CustomToast
      type={type}
      title={title}
      message={message}
      icon={customIcon}
    />
  ), {
    duration: 5000,
    position: 'top-left',
  });
};
