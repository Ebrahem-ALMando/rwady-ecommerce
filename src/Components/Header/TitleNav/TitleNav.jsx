"use client";
import styles from './TitleNav.module.css';
import { useState } from "react";
import { CloseIcon } from "@/utils/Icons";

const TitleNav = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return null;
    return (
        <div className={`${styles.mainDiv}`}>
            <button className={styles.closeIcon} onClick={() => {
                setIsVisible(false);
            }}>
                {CloseIcon}
            </button>
            <div className={`${styles.centerContent}`}>
                <h4 className={styles.title}>عـــــــروض على جميع المنتجات</h4>
            </div>
            <button className={`${styles.startShopBTN}`}>أبدأ تسوق الآن</button>
        </div>
    );
};

export default TitleNav;
