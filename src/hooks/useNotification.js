
export const useNotification = () => {
    // تأكد من أن الكود يعمل فقط في المتصفح
    if (typeof window === "undefined") return {};

    // الاستيرادات بعد التحقق من window
    const { getToken, onMessage } = require('firebase/messaging');
    const { toast } = require('react-hot-toast');
    const { mutate } = require('swr');
    const { useLocale } = require('next-intl');
    const CustomToast = require('@/Components/Shared/CustomToast/CustomToast').default;

    const [deviceToken, setDeviceToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const lang = useLocale();
    
    // طلب إذن الإشعارات وجلب توكن الجهاز
    const requestNotificationPermission = async () => {
        if(typeof window === "undefined") return null;  
        
        try {
            if (!messaging) {
                console.warn('⚠️ [useNotification] Firebase messaging is not available');
                return null;
            }

            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                try {
                    const token = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
                    });
                    return token;
                } catch (tokenError) {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.error('❌ [useNotification] Error requesting notification permission:', error);
            return null;
        }
    };

    // إعداد الاستماع للإشعارات
    useEffect(() => {
        if(typeof window === "undefined") return null;  
            
        
        if (!messaging) {
            console.warn('⚠️ [useNotification] Firebase messaging not available for message listener');
            return;
        }

        const unsubscribe = onMessage(messaging, (payload) => {
            
            // تحديث بيانات الإشعارات
            mutate(["notificationData", lang]);
            mutate("notificationDataCount");
            
            // عرض الإشعار باستخدام toast محسن
            if (payload.notification?.title) {
                showEnhancedToast(payload.notification.title, payload.notification.body, payload.notification.image);
            } else if (payload.notification?.body) {
                showEnhancedToast('إشعار جديد', payload.notification.body, payload.notification.image);
            }
        });

        // تنظيف الاشتراك عند إلغاء تحميل المكون
        return () => {
            console.log('🧹 [useNotification] Cleaning up message listener...');
            unsubscribe();
        };
    }, [lang]);

    return {
        deviceToken,
        setDeviceToken,
        isLoading,
        setIsLoading,
        requestNotificationPermission
    };
};

// دالة عرض توست محسن باستخدام CustomToast
export const showEnhancedToast = (title, message, imageUrl) => {
    if(typeof window === "undefined") return null;  

    // الاستيرادات بعد التحقق من window
    const { toast } = require('react-hot-toast');
    const CustomToast = require('@/Components/Shared/CustomToast/CustomToast').default;
    
    // تحديد نوع التوست بناءً على المحتوى
    let type = 'success';
    
    // إذا كان العنوان يحتوي على كلمات معينة، نحدد النوع
    const titleLower = title.toLowerCase();
    if (titleLower.includes('نجح') || titleLower.includes('تم') || titleLower.includes('success')) {
        type = 'success';
    } else if (titleLower.includes('خطأ') || titleLower.includes('فشل') || titleLower.includes('error')) {
        type = 'error';
    } else if (titleLower.includes('تحذير') || titleLower.includes('warning')) {
        type = 'warning';
    }
    
    // إنشاء أيقونة مخصصة إذا كانت هناك صورة
    const customIcon = imageUrl ? (
        <img 
            src={imageUrl} 
            alt="Notification"
            style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                objectFit: 'cover'
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
