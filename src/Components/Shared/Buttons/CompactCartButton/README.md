# CompactCartButton Component

مكون زر إضافة للسلة مضغوط ومرن مناسب لجميع أحجام الكروت مع مزامنة تلقائية مع السيرفر.

## الميزات

- **3 أشكال مختلفة**: `default`, `compact`, `minimal`
- **3 أحجام**: `small`, `medium`, `large`
- **مزامنة تلقائية** مع السيرفر
- **تحكم في الكمية** مدمج
- **انيميشن CSS محسّن** بدون dependencies إضافية
- **تخطيط ذكي**: أفقي للحاسوب (>775px) وعمودي للموبايل
- **تجاوب كامل** مع جميع أحجام الشاشات
- **دعم RTL/LTR**
- **إشعارات Toast** مخصصة

## كيفية الاستخدام

### الاستيراد

```jsx
import CompactCartButton from "@/Components/Shared/Buttons/CompactCartButton/CompactCartButton";
import useCart from "@/hooks/useCart";
```

### الاستخدام الأساسي

```jsx
const { addItem, removeItem, updateQuantity, getItemQuantity, getIsItemExisting, cart, isSyncing } = useCart();
const cartRef = useRef();

<CompactCartButton
  ref={cartRef}
  product={product}
  lang={lang}
  addItem={addItem}
  removeItem={removeItem}
  updateQuantity={updateQuantity}
  getItemQuantity={getItemQuantity}
  getIsItemExisting={getIsItemExisting}
  cart={cart}
  isSyncing={isSyncing}
  variant="compact"
  size="small"
  showQuantityControls={true}
/>
```

## الخصائص (Props)

| الخاصية | النوع | الافتراضي | الوصف |
|---------|------|---------|------|
| `product` | `Object` | مطلوب | بيانات المنتج |
| `lang` | `String` | مطلوب | لغة الواجهة |
| `addItem` | `Function` | مطلوب | دالة إضافة المنتج للسلة |
| `removeItem` | `Function` | مطلوب | دالة حذف المنتج من السلة |
| `updateQuantity` | `Function` | مطلوب | دالة تحديث الكمية |
| `getItemQuantity` | `Function` | مطلوب | دالة الحصول على كمية المنتج |
| `getIsItemExisting` | `Function` | مطلوب | دالة فحص وجود المنتج في السلة |
| `cart` | `Array` | مطلوب | مصفوفة السلة |
| `isSyncing` | `Boolean` | `false` | حالة المزامنة مع السيرفر |
| `variant` | `String` | `'default'` | شكل الزر: `'default'`, `'compact'`, `'minimal'` |
| `size` | `String` | `'medium'` | حجم الزر: `'small'`, `'medium'`, `'large'` |
| `showQuantityControls` | `Boolean` | `true` | إظهار أزرار التحكم في الكمية |
| `className` | `String` | `''` | فئة CSS إضافية |

## أشكال الزر (Variants)

### 1. Default
الشكل الافتراضي مع نص كامل وأيقونة. مناسب للمساحات الواسعة.

```jsx
<CompactCartButton
  variant="default"
  size="medium"
  // ... باقي الخصائص
/>
```

### 2. Compact
شكل مضغوط مع نص قصير. مناسب لكروت المنتجات العادية.

```jsx
<CompactCartButton
  variant="compact"
  size="small"
  // ... باقي الخصائص
/>
```

### 3. Minimal
شكل بسيط مع أيقونة فقط. مناسب للمساحات الضيقة جداً.

```jsx
<CompactCartButton
  variant="minimal"
  size="small"
  showQuantityControls={false}
  // ... باقي الخصائص
/>
```

## الدوال المتاحة (Ref Methods)

يمكن الوصول لهذه الدوال عبر `ref`:

```jsx
const cartRef = useRef();

// الحصول على الكمية الحالية
const quantity = cartRef.current?.getQuantity();

// زيادة الكمية
cartRef.current?.increment();

// تقليل الكمية
cartRef.current?.decrement();

// تبديل حالة السلة
cartRef.current?.toggle();

// فحص وجود المنتج في السلة
const isInCart = cartRef.current?.isInCart();
```

## مزامنة السيرفر

المكون يدعم المزامنة التلقائية مع السيرفر:

- **مزامنة فورية**: محاولة مزامنة فورية عند أي تغيير
- **مزامنة دورية**: مزامنة كل ثانيتين للعمليات المعلقة
- **إعادة المحاولة**: إعادة محاولة العمليات الفاشلة
- **مؤشر المزامنة**: عرض حالة المزامنة للمستخدم

## أمثلة للاستخدام

### في ProductCardSlider

```jsx
<CompactCartButton
  ref={cartRef}
  product={product}
  lang={lang}
  addItem={addItem}
  removeItem={removeItem}
  updateQuantity={updateQuantity}
  getItemQuantity={getItemQuantity}
  getIsItemExisting={getIsItemExisting}
  cart={cart}
  isSyncing={isSyncing}
  variant="compact"
  size="small"
  showQuantityControls={true}
  className={styles.compactCartBtn}
/>
```

### في ProductCardHorizontal

```jsx
<CompactCartButton
  ref={cartRef}
  product={product}
  lang={lang}
  addItem={addItem}
  removeItem={removeItem}
  updateQuantity={updateQuantity}
  getItemQuantity={getItemQuantity}
  getIsItemExisting={getIsItemExisting}
  cart={cart}
  isSyncing={isSyncing}
  variant="default"
  size="medium"
  showQuantityControls={true}
  className={styles.horizontalCartBtn}
/>
```

## الستايلات المخصصة

يمكن تخصيص الستايلات عبر CSS Modules:

```css
.customCartBtn {
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(7, 65, 173, 0.2);
}

.customCartBtn:hover {
  transform: scale(1.05);
}
```

## التخطيط المتجاوب

المكون يدعم تخطيطين مختلفين حسب حجم الشاشة:

### **Desktop (أكبر من 775px)**
- **تخطيط أفقي**: الزر والتحكم في الكمية جنباً إلى جنب
- **مساحة أكبر**: استغلال أمثل للمساحة الأفقية
- **تفاعل سريع**: سهولة الوصول لجميع العناصر

### **Mobile (775px وأقل)**
- **تخطيط عمودي**: الزر فوق التحكم في الكمية
- **تصميم مضغوط**: مناسب للشاشات الضيقة
- **أزرار أكبر**: سهولة اللمس على الأجهزة المحمولة

### **Breakpoints**
- **Desktop (>775px)**: تخطيط أفقي كامل
- **Mobile (≤775px)**: تخطيط عمودي مضغوط
- **Small Mobile (≤480px)**: أحجام مصغرة أكثر

## الانيميشن والحركات

المكون يستخدم **CSS Animations** محسّنة للأداء:

### **حركات الأزرار**
- **Hover**: تكبير بسيط مع رفع
- **Active**: تصغير للإشارة للضغط
- **Loading**: دوران الأيقونة مع تغيير الحجم

### **حركات التحكم في الكمية**
- **Slide In**: انزلاق سلس عند الظهور
- **Fade**: تلاشي تدريجي عند الاختفاء
- **Scale**: تكبير وتصغير عند التفاعل

### **مؤشرات الحالة**
- **Sync Indicator**: دوران مستمر أثناء المزامنة
- **State Changes**: تحولات سلسة بين الحالات

## الإمكانية

- دعم قارئات الشاشة مع `aria-label`
- دعم التنقل بالكيبورد
- مؤشرات التركيز واضحة
- دعم وضع التباين العالي

## الملاحظات

- يجب تمرير جميع الخصائص المطلوبة
- المكون يدير الحالة الداخلية تلقائياً
- يتزامن مع السيرفر في الخلفية
- يدعم جميع أحجام الشاشات
- متوافق مع Next.js App Router
