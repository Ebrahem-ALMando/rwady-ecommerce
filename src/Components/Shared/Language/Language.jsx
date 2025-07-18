// "use client";
//
// import React, {useEffect} from "react";
// import styles from "./Language.module.css";
// import { usePathname, useRouter } from "@/i18n/navigation";
//
// import {useTranslations} from "next-intl";
// import {useParams} from "next/navigation";
//
// const languages = [
//     { label: "ع", code: "ar", name: "العربية" },
//     { label: "En", code: "en", name: "الإنجليزية" },
// ];
//
// export default function Language({ hideMobile }) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { locale: currentLocale } = useParams();
//     const t = useTranslations("Language");
//     const currentIndex = languages.findIndex(l => l.code === currentLocale);
//
//     const handleSelect = (index) => {
//         if (index === currentIndex) return;
//
//         const langCode = languages[index].code;
//
//         router.replace(pathname, { locale: langCode });
//     };
//     const handleSelectPrefetch = (index) => {
//         if (index === currentIndex) return;
//
//         const langCode = languages[index].code;
//
//
//         const segments = pathname.split('/');
//
//
//         const pathWithoutLocale = segments.length > 1 && (segments[1] === 'ar' || segments[1] === 'en')
//             ? `/${segments.slice(2).join('/')}`
//             : pathname;
//
//         const targetPath = `/${langCode}${pathWithoutLocale}`;
//         console.log("Prefetching:", targetPath);
//
//         router.prefetch(targetPath);
//     };
//
//
//     return (
//         <div
//             className={`${styles.languageDiv} ${hideMobile ? styles.hideMobile : ""}`}
//             role="group"
//             aria-label={t("select")}
//         >
//             {languages.map((lang, i) => (
//                 <button
//                     key={lang.code}
//                     type="button"
//                     aria-label={t("changeTo", { lang: lang.name })}
//                     onClick={() => handleSelect(i)}
//                     onMouseEnter={()=>handleSelectPrefetch(i)}
//                     className={styles.language}
//                     style={{
//                         border:
//                             currentIndex === i ? "2px solid #0741AD" : "1px solid transparent",
//                         backgroundColor:
//                             currentIndex === i ? "#ffffff" : "#eeeff2",
//                         color: currentIndex === i ? "#0741AD" : "#000",
//                         cursor: "pointer",
//                         padding: "6px 12px",
//                         borderRadius: "6px",
//                         transition: "all 0.2s ease-in-out",
//                     }}
//                 >
//                     {lang.label}
//                 </button>
//             ))}
//         </div>
//     );
// }
"use client";

import React, { useEffect } from "react";
import styles from "./Language.module.css";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const languages = [
    { label: "ع", code: "ar", name: "العربية" },
    { label: "En", code: "en", name: "الإنجليزية" },
];

export default function Language({ hideMobile }) {
    const router = useRouter();
    const pathname = usePathname();
    const { locale: currentLocale } = useParams();
    const t = useTranslations("Language");

    const currentIndex = languages.findIndex(l => l.code === currentLocale);

    useEffect(() => {
        const otherLang = languages.find(l => l.code !== currentLocale);
        if (!otherLang) return;
        router.prefetch(pathname, { locale: otherLang.code });
    }, [pathname, currentLocale, router]);


    const handleSelect = (index) => {
        if (index === currentIndex) return;

        const langCode = languages[index].code;
        router.replace(pathname, { locale: langCode });
    };

    return (
        <div
            className={`${styles.languageDiv} ${
                hideMobile ? styles.hideMobile : ""
            }`}
            role="group"
            aria-label={t("select")}
        >
            {languages.map((lang, i) => (
                <button
                    key={lang.code}
                    type="button"
                    aria-label={t("changeTo", { lang: lang.name })}
                    onClick={() => handleSelect(i)}
                    className={styles.language}
                    style={{
                        border:
                            currentIndex === i ? "2px solid #0741AD" : "1px solid transparent",
                        backgroundColor: currentIndex === i ? "#ffffff" : "#eeeff2",
                        color: currentIndex === i ? "#0741AD" : "#000",
                        cursor: "pointer",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        transition: "all 0.2s ease-in-out",
                    }}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
