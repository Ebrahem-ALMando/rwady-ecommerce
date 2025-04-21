"use client";
import styles from './TitleNav.module.css';
import { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/utils/Icons";

const TitleNav = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={styles.mainDiv} role="region" aria-label="شريط العروض">
            <button
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
                aria-label="إغلاق الشريط الإعلاني"
            >
                {CloseIcon}
            </button>

            <div className={styles.centerContent}>
                <h4 className={styles.title} aria-label="عروض مميزة">
                    عـــــــروض على جميع المنتجات
                </h4>
            </div>

            <Link href={"/products"} passHref  className={styles.startShopBTN} aria-label="أبدأ تسوق الآن">
                    أبدأ تسوق الآن
            </Link>
        </div>
    );
};

export default TitleNav;
