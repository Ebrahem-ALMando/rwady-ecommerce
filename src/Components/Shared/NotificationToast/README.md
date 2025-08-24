# نظام التوست المحسن للإشعارات

## الميزات

✅ **توست محسن للموبايل والديسكتوب** - تصميم مختلف للموبايل والديسكتوب  
✅ **دعم الصور** - عرض صورة مع الإشعار  
✅ **تحديث تلقائي للإشعارات** - تحديث قائمة الإشعارات وعددها تلقائياً  
✅ **أنيميشن سلس** - تأثيرات حركية جميلة  
✅ **شريط تقدم** - يظهر الوقت المتبقي للتوست  
✅ **ألوان مختلفة** - نجاح، خطأ، تحذير، معلومات  
✅ **يعمل في كل مكان** - في أي صفحة في التطبيق  

## الاستخدام

### 1. استخدام Hook مبسط

```jsx
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
    const toast = useToast();

    const handleSuccess = () => {
        toast.success('تم بنجاح!', 'تم حفظ البيانات بنجاح', '/success-icon.png');
    };

    const handleError = () => {
        toast.error('خطأ!', 'حدث خطأ أثناء الحفظ', '/error-icon.png');
    };

    const handleWarning = () => {
        toast.warning('تحذير!', 'يرجى التحقق من البيانات', '/warning-icon.png');
    };

    const handleInfo = () => {
        toast.info('معلومات', 'هذه رسالة معلومات', '/info-icon.png');
    };

    return (
        <div>
            <button onClick={handleSuccess}>نجاح</button>
            <button onClick={handleError}>خطأ</button>
            <button onClick={handleWarning}>تحذير</button>
            <button onClick={handleInfo}>معلومات</button>
        </div>
    );
};
```

### 2. استخدام Context مباشرة

```jsx
import { useNotificationToastContext } from '@/Components/Shared/NotificationToastProvider/NotificationToastProvider';

const MyComponent = () => {
    const { showSuccessToast, showErrorToast } = useNotificationToastContext();

    const handleAction = () => {
        showSuccessToast('تم بنجاح!', 'تم حفظ البيانات بنجاح', '/icon.png');
    };

    return <button onClick={handleAction}>تنفيذ</button>;
};
```

### 3. طلب إذن الإشعارات

```jsx
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
    const { requestPermission } = useToast();

    const handleRequestPermission = async () => {
        const token = await requestPermission();
        if (token) {
            console.log('تم منح إذن الإشعارات');
        }
    };

    return <button onClick={handleRequestPermission}>تفعيل الإشعارات</button>;
};
```

## التصميم

### الموبايل
- يظهر من أعلى الشاشة
- يأخذ عرض الشاشة كاملاً مع هوامش
- تصميم مبسط ومريح للمس

### الديسكتوب
- يظهر من اليمين
- عرض ثابت مع ظل جميل
- شريط تقدم في الأسفل

## الألوان

- **نجاح**: أخضر
- **خطأ**: أحمر  
- **تحذير**: أصفر
- **معلومات**: أزرق

## التحديث التلقائي

عند وصول إشعار جديد، يتم تحديث:
- `["notificationData", lang]` - قائمة الإشعارات
- `"notificationDataCount"` - عدد الإشعارات

## الإعداد

تم إضافة `NotificationToastProvider` إلى `layout.js` ليعمل في كل مكان في التطبيق.
