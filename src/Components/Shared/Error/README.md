# Error Component

مكون بسيط وأنيق لعرض رسائل الخطأ مع إمكانية إعادة المحاولة.

## الاستخدام

```jsx
import Error from "@/Components/Shared/Error/Error";

// استخدام أساسي
<Error 
    onRetry={async () => {
        // منطق إعادة المحاولة
        await fetchData();
    }}
    message="خطأ في تحميل البيانات"
/>

// بدون رسالة مخصصة
<Error 
    onRetry={async () => {
        await retryOperation();
    }}
/>

// مثال مع منطق محاولات فعال
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error('فشل في تحميل البيانات');
        }
        const result = await response.json();
        setData(result);
        setError(null);
    } catch (err) {
        setError(err.message);
    }
};

// في JSX
{error && (
    <Error 
        onRetry={fetchData}
        message={error}
    />
)}
```

## المميزات

### **🎯 التصميم البسيط:**
- خلفية نظيفة وهادئة
- تصميم مركزي ومتوازن
- ألوان هادئة ومريحة للعين

### **⚡ منطق المحاولات المحسن:**
- **منع المحاولات المتعددة:** لا يمكن الضغط أثناء المعالجة
- **عداد المحاولات:** يظهر (1/3, 2/3, 3/3)
- **حد أقصى:** 3 محاولات فقط
- **لودر دوار:** أيقونة `RefreshCw` مع انيميشن
- **تأخير محاكي:** 2 ثانية لإظهار حالة التحميل

### **🔧 الوظائف:**
- **زر إعادة المحاولة:** مع لودر وتأثيرات
- **زر تحديث الصفحة:** خيار بديل
- **رسالة الحد الأقصى:** عند تجاوز المحاولات
- **تعطيل الأزرار:** أثناء المعالجة

### **📱 التجاوب:**
- متوافق مع جميع الأجهزة
- تصميم مخصص للموبايل
- أزرار متجاوبة

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRetry` | function | - | دالة إعادة المحاولة |
| `message` | string | "تعذر تحميل البيانات، يرجى المحاولة مرة أخرى" | رسالة الخطأ |

## مثال كامل

```jsx
import { useState, useEffect } from 'react';
import Error from '@/Components/Shared/Error/Error';

function DataComponent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/api/data');
            if (!response.ok) {
                throw new Error('فشل في تحميل البيانات');
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>جاري التحميل...</div>;
    }

    if (error) {
        return (
            <Error 
                onRetry={fetchData}
                message={error}
            />
        );
    }

    return (
        <div>
            {/* عرض البيانات */}
        </div>
    );
}
```

## المميزات التقنية

- **منع Race Conditions:** لا يمكن الضغط أثناء المعالجة
- **إدارة الحالة:** تتبع عدد المحاولات
- **معالجة الأخطاء:** try/catch شامل
- **تأخير محاكي:** لإظهار حالة التحميل
- **إعادة تعيين العداد:** عند النجاح 