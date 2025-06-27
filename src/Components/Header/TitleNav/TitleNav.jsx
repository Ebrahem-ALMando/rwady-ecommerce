"use client";
import styles from './TitleNav.module.css';
import { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/utils/Icons";
import { useTranslations } from 'next-intl';

const TitleNav = () => {
    const t = useTranslations('navBar');
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div
            className={styles.mainDiv}
            role="region"
            aria-label={t("promoRegion")}
        >
            <button
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
                aria-label={t("close")}
            >
                {CloseIcon}
            </button>

            <div className={styles.centerContent}>
                <h4
                    className={`${styles.title} text-center font-arabic`}
                    aria-label={t("title")}
                >
                    {t("title")}
                </h4>
            </div>

            <Link
                href="/products"
                className={styles.startShopBTN}
                aria-label={t("startShopping")}
            >
                {t("startShopping")}
            </Link>
        </div>
    );
};

export default TitleNav;
