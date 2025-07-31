# EmptyState Component

مكون جميل ومبدع لعرض حالات عدم وجود بيانات مع انيميشن CSS مذهل.

## الاستخدام

```jsx
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

// استخدام أساسي
<EmptyState 
    title="لا توجد أقسام لعرضها"
    subtitle="عذراً، لا توجد أقسام متاحة حالياً"
    actionText="تحديث الصفحة"
    showAction={true}
    type="sections"
/>

// لعدم وجود منتجات
<EmptyState 
    title="لا توجد منتجات"
    subtitle="لم يتم العثور على منتجات تطابق معايير البحث"
    type="products"
/>

// لعدم وجود نتائج بحث
<EmptyState 
    title="لا توجد نتائج"
    subtitle="جرب كلمات بحث مختلفة"
    type="search"
    showAction={false}
/>

// مع أيقونة مخصصة
<EmptyState 
    title="خطأ في الاتصال"
    subtitle="فشل في تحميل البيانات"
    type="error"
    customIcon={<CustomIcon />}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "لا توجد أقسام لعرضها" | العنوان الرئيسي |
| `subtitle` | string | "عذراً، لا توجد أقسام متاحة حالياً" | النص الفرعي |
| `actionText` | string | "تحديث الصفحة" | نص زر التحديث |
| `showAction` | boolean | true | إظهار أزرار الإجراءات |
| `type` | string | "sections" | نوع الحالة (sections, products, categories, search, error) |
| `customIcon` | ReactNode | null | أيقونة مخصصة |

## الأنواع المتاحة

- `sections`: أيقونة مجلد مفتوح
- `products`: أيقونة حزمة
- `categories`: أيقونة حقيبة تسوق
- `search`: أيقونة بحث
- `error`: أيقونة تنبيه

## المميزات

- 🎨 تصميم جميل مع خلفية متدرجة
- ✨ انيميشن CSS مبدع
- 📱 متجاوب مع جميع الأجهزة
- 🎯 أيقونات مختلفة حسب النوع
- 🔄 زر تحديث الصفحة
- 🏠 زر العودة للرئيسية
- 🌟 عناصر زخرفية متحركة 