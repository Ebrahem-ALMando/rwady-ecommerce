import React from "react";
import styles from "./TopIcon.module.css";
import Link from "next/link";

const TopIcon = ({
                     link = "#",
                     isSelect = false,
                     setIsOpen = null,
                     element,
                     count = 0,
                     isSearch = false,
                     isDownload = false,
                     showMobile = false,
                 }) => {
    const handleClick = (e) => {
        if (setIsOpen) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
        }
    };

    return (
        <Link
            href={link}
            className={`${styles.link} ${showMobile ? styles.showMobile : ""}`}
            aria-label="أيقونة تنقل علوية"
        >
            <div
                className={`${styles.topIcon} 
                    ${isSelect ? styles.selected : ""} 
                    ${showMobile ? styles.showMobile : ""} 
                    ${isSearch ? styles.search : ""}`}
                onClick={handleClick}
                role={setIsOpen ? "button" : undefined}
                tabIndex={setIsOpen ? 0 : undefined}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && setIsOpen) handleClick(e);
                }}
            >
                <div className={`${styles.iconWrapper} ${isDownload ? styles.download : ""}`}>
                    {element}
                    {Number(count) > 0 && (
                        <span className={styles.badge} aria-label={`عدد العناصر ${count}`}>
                            {count}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default TopIcon;
