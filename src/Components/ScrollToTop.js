'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
// 'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect } from 'react';

// export default function ScrollToTop() {
//   const pathname = usePathname();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [pathname]);

//   return null;
// }
