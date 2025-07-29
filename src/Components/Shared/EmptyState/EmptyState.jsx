"use client";

import styles from "./EmptyState.module.css";
import Image from "next/image";
import {useLocale} from "next-intl";
import Link from "next/link";

const EmptyState = ({ message = "لا توجد منتجات لعرضها حالياً", item = null, initLink = "products" }) => {
    const lang = useLocale();
    return (
        <div className={styles.wrapper}>
            {/* نقاط متحركة عبر CSS */}
            <div className={styles.gridPattern}>
                {Array.from({ length: 36 }).map((_, i) => (
                    <span key={i} className={styles.gridDot} />
                ))}
            </div>
            {/* أشكال عائمة عبر CSS */}
            <div className={styles.floatingCircle} />
            <div className={styles.floatingTriangle} />
            <div className={styles.floatingHexagon} />
            <div className={styles.glowLayer} />
            <div className={styles.contentWrapper}>
                <div className={styles.iconContainer}>
                    <Link href={`/${lang}/${initLink}`} prefetch={true}>
                        <Image
                            src="/img_7.png"
                            alt={message}
                            className={styles.ghostIcon}
                            width={80}
                            height={80}
                        />
                    </Link>
                </div>
                <p className={styles.text}>{message}</p>
                <div className={styles.newItem}>{item && item}</div>
            </div>
        </div>
    );
};

export default EmptyState;