"use client";
import styles from "./DropdownSidebar.module.css";
import DropdownSidebarItem from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebarItem/DropdownSidebarItem";
import {useState, useEffect, memo} from "react"
import {categoryIcon} from "@/utils/Icons";

const DropdownSidebar = ({ data = [], onSelect ,arSection}) => {
    const [isSelected, setIsSelected] = useState(null);
    useEffect(() => {
        if (data[0]) {
            setIsSelected(data[0].id);
            onSelect?.(data[0].id, data[0].title);
        }
    }, [data]);

    const handleClick = (item) => {
        setIsSelected(item.id);
        onSelect?.(item.id, item.title);
    };
    return (
        <nav
            className={styles.dropdownSidebar}
            aria-label="تصنيفات القائمة الجانبية"
        >
            <div className={styles.title}>
                <span className={styles.icon}>{categoryIcon}</span>
                <h1>
                    {arSection}
                </h1>
            </div>

            {data.map((item, index) => (
                <DropdownSidebarItem
                    key={item.id || index}
                    isSelected={isSelected === item.id}
                    title={item.title}
                    onClick={() => handleClick(item)}
                />
            ))}
        </nav>
    );
};

export default memo(DropdownSidebar);
