"use client";
import styles from './Language.module.css';
import React, { useState } from 'react';

function Language({ hideMobile }) {
    const [isSelected, setIsSelected] = useState(0);
    const languages = [
        { label: 'ع', value: 0, name: "العربية" },
        { label: 'En', value: 1, name: "الإنجليزية" }
    ];

    const handleSelect = (val) => {
        setIsSelected(val);
        // i18n.changeLanguage()
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
                        backgroundColor: isSelected === lang.value ? '#ffffff' : '#eeeff2',
                        color: isSelected === lang.value ? '#424242' : '#000',
                    }}
                >
                    {lang.label}
                </div>
            ))}
        </div>
    );
}

export default Language;
