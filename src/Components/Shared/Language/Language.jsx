"use client";
import styles from './Language.module.css';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import i18n from '@/i18n';
import {setHtmlDirection} from "@/utils/setDirection";

function Language({ hideMobile }) {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(0);

    const languages = [
        { label: 'ع', value: 0, name: "العربية", code: "ar" },
        { label: 'En', value: 1, name: "الإنجليزية", code: "en" }
    ];

    useEffect(() => {
        const savedLang = Cookies.get('language') || 'ar';
        const index = languages.findIndex(lang => lang.code === savedLang);
        if (index !== -1) {
            setIsSelected(index);
            i18n.changeLanguage(languages[index].code);
        }
    }, []);

    const handleSelect = (val) => {
        if (val === isSelected) return;

        const langCode = languages[val].code;
        Cookies.set('language', langCode);
        i18n.changeLanguage(langCode);
        setHtmlDirection(langCode);
        setIsSelected(val);
        router.replace(window.location.pathname);

    };

    return (
        <div className={`${styles.languageDiv} ${hideMobile ? styles.hideMobile : ''}`}>
            {languages.map((lang) => (
                <div
                    key={lang.value}
                    role="button"
                    tabIndex={0}
                    aria-label={`تغيير اللغة إلى ${lang.name}`}
                    onClick={() => handleSelect(lang.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSelect(lang.value);
                    }}
                    className={styles.language}
                    style={{
                        border: isSelected === lang.value ? '2px solid #0741AD' : '1px solid transparent',
                        backgroundColor: isSelected === lang.value ? '#ffffff' : '#eeeff2',
                        color: isSelected === lang.value ? '#0741AD' : '#000',
                    }}

                >
                    {lang.label}
                </div>
            ))}
        </div>
    );
}

export default Language;
