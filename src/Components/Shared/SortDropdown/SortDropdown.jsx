"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { useTranslations } from "next-intl";

const SortDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const t = useTranslations("products.sort");

    const options = [
        { value: "", label: t("none") }, // بدون ترتيب
        { value: "price_desc", label: t("price_desc") },
        { value: "price_asc", label: t("price_asc") },
        { value: "name_asc", label: t("name_asc") },
        { value: "name_desc", label: t("name_desc") },
    ];

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.sortContainer}>
            <div
                className={styles.customDropdown}
                ref={dropdownRef}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.selectedOption}>
                    {selectedOption.label}
                    <FiChevronDown className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`} />
                </div>

                {isOpen && (
                    <div className={styles.dropdownMenu}>
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`${styles.dropdownItem} ${value === option.value ? styles.active : ""}`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                                {value === option.value && <FiCheck className={styles.checkIcon} />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortDropdown;
