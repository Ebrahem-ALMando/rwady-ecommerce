# أفضل ممارسات Loading في Next.js 15

## 🎯 نظرة عامة
هذا الدليل يوضح أفضل الطرق لعرض loading states في Next.js 15 مع التركيز على الأداء وتجربة المستخدم.

## 🏆 أفضل الطرق (مرتبة حسب الأولوية)

### 1. **Suspense + Loading.js (الأفضل) ⭐⭐⭐⭐⭐**

```javascript
// src/app/[locale]/(main)/promotions/loading.js
import PromotionsSkeleton from "@/Components/Promotions/PromotionsSkeleton";

export default function Loading() {
    return <PromotionsSkeleton />;
}
```

**المزايا:**
- ✅ تحميل تلقائي من Next.js
- ✅ لا حاجة لـ client-side state
- ✅ أداء ممتاز
- ✅ SEO friendly
- ✅ Stream rendering

### 2. **Suspense + Wrapper Component ⭐⭐⭐⭐**

```javascript
// src/Components/Promotions/PromotionsWrapper.jsx
"use client"
import { Suspense } from "react";
import Promotions from "./Promotions";
import PromotionsSkeleton from "./PromotionsSkeleton";

export default function PromotionsWrapper({ promotions, error, meta }) {
    return (
        <Suspense fallback={<PromotionsSkeleton />}>
            <Promotions 
                promotions={promotions} 
                error={error} 
                meta={meta} 
            />
        </Suspense>
    );
}
```

**المزايا:**
- ✅ تحكم أفضل في loading state
- ✅ إمكانية تمرير props
- ✅ مرونة في التخصيص

### 3. **Client-side Hydration ⭐⭐⭐**

```javascript
// الطريقة القديمة (غير موصى بها)
const [isClient, setIsClient] = useState(false);

useEffect(() => {
    setIsClient(true);
}, []);

if (!isClient) return <PromotionsSkeleton />;
```

**العيوب:**
- ❌ Hydration mismatch
- ❌ أداء أقل
- ❌ مشاكل SEO
- ❌ Flash of content

## 🎨 تصميم Skeleton محسن

### 1. **React Loading Skeleton (الأفضل) ⭐⭐⭐⭐⭐**

**المزايا:**
- ✅ مكتبة خفيفة وسريعة
- ✅ انيميشن مدمج
- ✅ دعم للشكل الدائري والمستطيل
- ✅ تخصيص سهل للألوان
- ✅ أداء ممتاز
- ✅ دعم responsive

```javascript
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// استخدام أساسي
<Skeleton height={32} width="60%" />

// شكل دائري
<Skeleton circle width={80} height={80} />

// مع className مخصص
<Skeleton 
    height={32} 
    width="60%" 
    className={styles.titleSkeleton}
/>
```

### 2. **Staggered Animation (مع React Loading Skeleton)**
```javascript
{[...Array(8)].map((_, index) => (
    <div key={index} className={styles.cardSkeleton}>
        <Skeleton 
            height={24} 
            width="70%" 
            className={styles.titleSkeleton}
        />
        <Skeleton 
            height={16} 
            width="60%" 
            className={styles.subtitleSkeleton}
        />
    </div>
))}
```

### 3. **Custom Skeleton Colors**
```css
/* Custom Skeleton Colors for Hero Section */
.heroSkeleton :global(.react-loading-skeleton) {
    background-color: rgba(255, 255, 255, 0.3) !important;
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.3) 25%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.3) 75%
    ) !important;
}

/* Custom Skeleton Colors for Cards */
.cardSkeleton :global(.react-loading-skeleton) {
    background-color: #e5e7eb !important;
    background-image: linear-gradient(
        90deg,
        #e5e7eb 25%,
        #f3f4f6 50%,
        #e5e7eb 75%
    ) !important;
}
```

## 📁 هيكل الملفات الموصى به

```
src/
├── app/
│   └── [locale]/
│       └── (main)/
│           └── promotions/
│               ├── page.jsx          # الصفحة الرئيسية
│               └── loading.js        # Loading state
└── Components/
    └── Promotions/
        ├── Promotions.jsx            # المكون الرئيسي
        ├── PromotionsWrapper.jsx     # Wrapper مع Suspense
        ├── PromotionsSkeleton.jsx    # Skeleton component
        └── PromotionsSkeleton.module.css
```

## 🔧 التطبيق العملي مع React Loading Skeleton

### 1. **تثبيت المكتبة**
```bash
npm install react-loading-skeleton
# أو
yarn add react-loading-skeleton
```

### 2. **إنشاء Skeleton Component**
```javascript
// src/Components/Promotions/PromotionsSkeleton.jsx
"use client"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PromotionsSkeleton.module.css";

export default function PromotionsSkeleton() {
    return (
        <div className={styles.container}>
            {/* Hero Skeleton */}
            <div className={styles.heroSkeleton}>
                <div className={styles.heroContent}>
                    <Skeleton 
                        circle 
                        width={80} 
                        height={80} 
                        className={styles.heroIconSkeleton}
                    />
                    <Skeleton 
                        height={32} 
                        width="60%" 
                        className={styles.heroTitleSkeleton}
                    />
                    <Skeleton 
                        height={20} 
                        width="40%" 
                        className={styles.heroSubtitleSkeleton}
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className={styles.statCardSkeleton}>
                        <Skeleton 
                            circle 
                            width={48} 
                            height={48} 
                            className={styles.statIconSkeleton}
                        />
                        <div className={styles.statContentSkeleton}>
                            <Skeleton 
                                height={24} 
                                width="60%" 
                                className={styles.statNumberSkeleton}
                            />
                            <Skeleton 
                                height={16} 
                                width="80%" 
                                className={styles.statLabelSkeleton}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Promotions Grid */}
            <div className={styles.promotionsGrid}>
                {[...Array(8)].map((_, index) => (
                    <div key={index} className={styles.promotionCardSkeleton}>
                        <Skeleton 
                            height={24} 
                            width={80} 
                            className={styles.typeBadgeSkeleton}
                        />
                        <div className={styles.cardHeaderSkeleton}>
                            <Skeleton 
                                height={20} 
                                width="70%" 
                                className={styles.titleSkeleton}
                            />
                            <Skeleton 
                                height={16} 
                                width={60} 
                                className={styles.statusSkeleton}
                            />
                        </div>
                        {/* ... المزيد من العناصر */}
                    </div>
                ))}
            </div>
        </div>
    );
}
```

### 3. **إنشاء Loading.js**
```javascript
// src/app/[locale]/(main)/promotions/loading.js
import PromotionsSkeleton from "@/Components/Promotions/PromotionsSkeleton";

export default function Loading() {
    return <PromotionsSkeleton />;
}
```

### 2. **إنشاء Wrapper Component**
```javascript
// src/Components/Promotions/PromotionsWrapper.jsx
"use client"
import { Suspense } from "react";
import Promotions from "./Promotions";
import PromotionsSkeleton from "./PromotionsSkeleton";

export default function PromotionsWrapper({ promotions, error, meta }) {
    return (
        <Suspense fallback={<PromotionsSkeleton />}>
            <Promotions 
                promotions={promotions} 
                error={error} 
                meta={meta} 
            />
        </Suspense>
    );
}
```

### 3. **تحديث الصفحة**
```javascript
// src/app/[locale]/(main)/promotions/page.jsx
import PromotionsWrapper from "@/Components/Promotions/PromotionsWrapper";

export default function PromotionsPage() {
    return (
        <Suspense fallback={null}>
            <PromotionsData />
        </Suspense>
    );
}

async function PromotionsData() {
    const response = await getPromotions();
    return (
        <PromotionsWrapper 
            promotions={response?.data || []} 
            error={response?.error || false} 
            meta={response?.meta || null} 
        />
    );
}
```

## 🎯 أفضل الممارسات

### 1. **استخدم Loading.js دائماً**
- يوفر Next.js تحميل تلقائي
- لا يحتاج client-side logic
- أداء ممتاز

### 2. **صمم Skeleton واقعي**
- مطابق للتصميم النهائي
- نفس الأبعاد والمسافات
- انيميشن سلس

### 3. **استخدم Staggered Animation**
- تحميل تدريجي للعناصر
- تجربة مستخدم أفضل
- تجنب التحميل المفاجئ

### 4. **تحسين الأداء**
```javascript
// استخدم React.memo للـ skeleton
const PromotionsSkeleton = React.memo(() => {
    return (
        <div className={styles.container}>
            {/* Skeleton content */}
        </div>
    );
});

export default PromotionsSkeleton;
```

### 5. **Error Boundaries**
```javascript
// src/Components/Promotions/PromotionsErrorBoundary.jsx
"use client"
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
    return (
        <div className="error-container">
            <h2>حدث خطأ في تحميل العروض</h2>
            <button onClick={() => window.location.reload()}>
                إعادة المحاولة
            </button>
        </div>
    );
}

export default function PromotionsErrorBoundary({ children }) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}
```

## 🚫 تجنب هذه الأخطاء

### 1. **Client-side Hydration**
```javascript
// ❌ خطأ
const [isClient, setIsClient] = useState(false);
if (!isClient) return <Skeleton />;
```

### 2. **Loading State في Server Component**
```javascript
// ❌ خطأ
const [loading, setLoading] = useState(true);
```

### 3. **Skeleton بدون انيميشن**
```javascript
// ❌ خطأ
<div className="skeleton" /> // بدون انيميشن
```

## 📊 مقارنة الأداء

| الطريقة | الأداء | SEO | التعقيد | التوصية |
|---------|--------|-----|---------|---------|
| Loading.js | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ الأفضل |
| Suspense Wrapper | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ جيد |
| Client Hydration | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ❌ تجنب |

## 🎨 نصائح التصميم

### 1. **ألوان Skeleton**
```css
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
```

### 2. **Border Radius**
```css
.skeleton {
    border-radius: 8px; /* مطابق للتصميم النهائي */
}
```

### 3. **Responsive Design**
```css
@media (max-width: 768px) {
    .skeleton {
        /* تعديلات للموبايل */
    }
}
```

## 🔮 التطويرات المستقبلية

### 1. **Streaming SSR**
- تحميل تدريجي للمحتوى
- تحسين Core Web Vitals
- تجربة مستخدم أفضل

### 2. **Intelligent Loading**
- تحميل ذكي حسب سرعة الإنترنت
- تحميل مسبق للمحتوى المهم
- تحسين الأداء

### 3. **Progressive Enhancement**
- تحميل تدريجي للميزات
- دعم الأجهزة الضعيفة
- تجربة شاملة

## 📝 ملاحظات مهمة

1. **استخدم Loading.js دائماً** - إنها الطريقة الأفضل في Next.js 15
2. **صمم Skeleton واقعي** - مطابق للتصميم النهائي
3. **استخدم انيميشن سلس** - تجربة مستخدم أفضل
4. **تحسين الأداء** - استخدم React.memo و useMemo
5. **اختبار شامل** - تأكد من عمل التحميل في جميع الحالات
