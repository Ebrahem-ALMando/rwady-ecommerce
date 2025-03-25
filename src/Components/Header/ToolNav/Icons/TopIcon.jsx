import React from "react";
import styles from "./TopIcon.module.css";
import Link from "next/link";

const TopIcon = ({ link = "#", isSelect, setIsOpen, element, count = 0, isSearch, isDownload, showMobile }) => {
    return (
        <Link href={link} className={`${styles.link} ${showMobile ? styles.showMobile : ""}`}>
            <div
                className={`${styles.topIcon} 
                ${isSelect ? styles.selected : ""} 
                ${showMobile ? styles.showMobile : ""} 
                ${isSearch ? styles.search : ""}`}
                onClick={setIsOpen ? () => setIsOpen(prev => !prev) : undefined}
            >
                <div className={`${styles.iconWrapper} ${isDownload ? styles.download : ""}`}>
                    {element}
                    {Number(count) > 0 && <span className={styles.badge}>{count}</span>}
                </div>
            </div>
        </Link>
    );
};

export default TopIcon;
