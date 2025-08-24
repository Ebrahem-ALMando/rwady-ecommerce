'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useNotificationToast } from '@/hooks/useNotificationToast';
import NotificationToast from '../NotificationToast/NotificationToast';
import { messaging } from '@/hooks/firebase';
import { onMessage } from 'firebase/messaging';
import { mutate } from 'swr';
import { useLocale } from 'next-intl';

const NotificationToastContext = createContext();

export const useNotificationToastContext = () => {
    const context = useContext(NotificationToastContext);
    if (!context) {
        throw new Error('useNotificationToastContext must be used within a NotificationToastProvider');
    }
    return context;
};

export const NotificationToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const { requestNotificationPermission } = useNotificationToast();
    const lang = useLocale();

    // إضافة توست جديد
    const addToast = (toast) => {
        const id = Date.now() + Math.random();
        const newToast = { ...toast, id };
        setToasts(prev => [...prev, newToast]);
        return id;
    };

    // إزالة توست
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // عرض توست إشعار
    const showNotificationToast = (payload) => {
        const title = payload.notification?.title || 'إشعار جديد';
        const message = payload.notification?.body || '';
        const image = payload.notification?.icon || payload.notification?.image || '/logo.png';
        
        // تحديث بيانات الإشعارات
        console.log('🔄 [NotificationToastProvider] Updating notification data...');
        mutate(["notificationData", lang]);
        mutate("notificationDataCount");
        
        addToast({
            title,
            message,
            image,
            type: 'info',
            duration: 6000
        });
    };

    // عرض توست نجاح
    const showSuccessToast = (title, message = '', image = null) => {
        return addToast({
            title,
            message,
            image,
            type: 'success',
            duration: 4000
        });
    };

    // عرض توست خطأ
    const showErrorToast = (title, message = '', image = null) => {
        return addToast({
            title,
            message,
            image,
            type: 'error',
            duration: 5000
        });
    };

    // عرض توست تحذير
    const showWarningToast = (title, message = '', image = null) => {
        return addToast({
            title,
            message,
            image,
            type: 'warning',
            duration: 5000
        });
    };

    // عرض توست معلومات
    const showInfoToast = (title, message = '', image = null) => {
        return addToast({
            title,
            message,
            image,
            type: 'info',
            duration: 4000
        });
    };

    // إعداد الاستماع للإشعارات
    useEffect(() => {
        console.log('🚀 [NotificationToastProvider] Setting up notification listener...');
        
        if (!messaging) {
            console.warn('⚠️ [NotificationToastProvider] Firebase messaging not available for message listener');
            return;
        }

        console.log('🔔 [NotificationToastProvider] Setting up message listener...');
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('📨 [NotificationToastProvider] Received notification:', payload);
            showNotificationToast(payload);
        });

        // تنظيف الاشتراك عند إلغاء تحميل المكون
        return () => {
            console.log('🧹 [NotificationToastProvider] Cleaning up message listener...');
            unsubscribe();
        };
    }, [lang]);

    const contextValue = {
        addToast,
        removeToast,
        showNotificationToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
        requestNotificationPermission
    };

    return (
        <NotificationToastContext.Provider value={contextValue}>
            {children}
            
            {/* عرض التوستات */}
            {toasts.map((toast, index) => (
                <NotificationToast
                    key={toast.id}
                    isVisible={true}
                    onClose={() => removeToast(toast.id)}
                    title={toast.title}
                    message={toast.message}
                    type={toast.type}
                    image={toast.image}
                    duration={toast.duration}
                    style={{
                        position: 'fixed',
                        top: `${20 + (index * 100)}px`,
                        right: '16px',
                        zIndex: 50 + index
                    }}
                />
            ))}
        </NotificationToastContext.Provider>
    );
};
