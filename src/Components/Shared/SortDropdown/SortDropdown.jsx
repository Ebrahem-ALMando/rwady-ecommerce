"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const SortDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: "", label: "بدون ترتيب" },
        { value: "price_desc", label: "السعر من الأعلى" },
        { value: "price_asc", label: "السعر من الأقل" },
        { value: "name_asc", label: "الاسم من أ → ي" },
        { value: "name_desc", label: "الاسم من ي → أ" },
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
            {/*<span className={styles.sortLabel}>ترتيب حسب:</span>*/}

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