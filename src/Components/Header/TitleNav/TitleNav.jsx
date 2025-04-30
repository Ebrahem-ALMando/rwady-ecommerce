"use client";
import styles from './TitleNav.module.css';
import { useState, useEffect } from "react";
import Link from "next/link";
import { CloseIcon } from "@/utils/Icons";
import { useTranslation } from "next-i18next";
import '@/i18n';

const TitleNav = () => {
    const { t } = useTranslation("common");
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div
            className={styles.mainDiv}
            role="region"
            aria-label={t("navBar.promoRegion")}
        >
            <button
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
                aria-label={t("navBar.close")}
            >
                {CloseIcon}
            </button>

            <div className={styles.centerContent}>
                <h4
                    className={`${styles.title} text-center font-arabic`}
                    aria-label={t("navBar.title")}
                >
                    {t("navBar.title")}
                </h4>
            </div>

            <Link
                href="/products"
                className={styles.startShopBTN}
                aria-label={t("navBar.startShopping")}
            >
                {t("navBar.startShopping")}
            </Link>
        </div>
    );
};

export default TitleNav;
