'use client';  // تأكد من إضافة هذا السطر إذا كنت تستخدم `useRouter` في مكون عميل فقط.

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const router = useRouter();
    const pathname = router.asPath;  // يمكن أن تستخدم `asPath` للحصول على المسار الحالي.

    useEffect(() => {
        // استخدم `window.scrollTo` عند تغيير المسار
        window.scrollTo(0, 0);
    }, [pathname]);  // نفذ عند تغيير المسار.

    return null;
};

export default ScrollToTop;
