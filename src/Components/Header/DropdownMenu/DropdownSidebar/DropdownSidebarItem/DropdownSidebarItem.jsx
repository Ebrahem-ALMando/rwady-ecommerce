'use client'
import styles from "./DropdownSidebarItem.module.css";
import { LeftArrowIcon } from "@/utils/Icons";
import { useState } from "react";
import {AnimatePresence,motion} from "framer-motion";

const DropdownSidebarItem = ({
                                 id,
                                 name,
                                 selectedId,
                                 onClick,
                                 lang,
                                 childrenItems,
                                 prefix = ''
                             }) => {
    const [isOpen, setIsOpen] = useState(false);

    const localizedName = name?.[lang] || "بدون اسم";
    const isSelected = selectedId === id;

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleClick = () => {
        toggleOpen();
        onClick(id, localizedName);
    };

    return (
        <div className={styles.sidebarItemWrapper}>
            <button
                type="button"
                role="button"
                aria-pressed={isSelected}
                onClick={handleClick}
                className={`${styles.rowItem} ${isSelected ? styles.active : ''}`}
            >
                <span>{prefix} - {localizedName}</span>
                {childrenItems?.length > 0 && (
                    <span style={{
                        transform:
                            lang === 'en'
                                ? (isOpen ? 'rotate(0deg)' : 'rotate(-180deg)')
                                : (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')
                    }}>
                        {LeftArrowIcon}
                    </span>
                )}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && childrenItems?.length > 0 && (
                    <motion.div
                        style={{padding:lang==='ar'?'0 1.5rem 0 0':'0 0 0 1.5rem '}}
                        className={styles.childrenList}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        {childrenItems.map((child, index) => (
                            <DropdownSidebarItem
                                key={child.id}
                                id={child.id}
                                name={child.name}
                                selectedId={selectedId}
                                onClick={onClick}
                                lang={lang}
                                childrenItems={child.children}
                                prefix={`${prefix}.${index + 1}`}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownSidebarItem;
