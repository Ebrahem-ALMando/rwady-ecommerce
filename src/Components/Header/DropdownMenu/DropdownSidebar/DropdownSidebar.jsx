"use client";
import styles from "./DropdownSidebar.module.css";
import DropdownSidebarItem from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebarItem/DropdownSidebarItem";
import { useEffect, memo } from "react";
import { categoryIcon } from "@/utils/Icons";
import { useLocale } from "next-intl";

const DropdownSidebar = ({ data = [], onSelect, arSection, keyData, selectedId }) => {
    const lang = useLocale();

    return (
        <nav className={styles.dropdownSidebar} aria-label="تصنيفات القائمة الجانبية">
            <div className={styles.title}>
                <span className={styles.icon}>{categoryIcon}</span>
                <h1>{lang === 'ar' ? arSection : keyData}</h1>
            </div>

            {data.map((item, index) => (
                <DropdownSidebarItem
                    key={item.id || index}
                    id={item.id}
                    name={item.name}
                    selectedId={selectedId}
                    onClick={onSelect}
                    lang={lang}
                    childrenItems={item.children}
                    prefix={`${index + 1}`}
                />
            ))}
        </nav>
    );
};

export default memo(DropdownSidebar);
