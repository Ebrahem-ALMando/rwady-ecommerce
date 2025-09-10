'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchableSelect.module.css';
import { TextSearch } from 'lucide-react';
const SearchableSelect = ({ 
    options = [], 
    value, 
    onChange, 
    placeholder, 
    disabled = false,
    loading = false,
    className = '',
    searchPlaceholder = "البحث..."
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);


    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(option =>
                option.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchTerm, options]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

   
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled && !loading) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchTerm('');
            }
        }
    };

    const handleSelect = (option) => {
        onChange(option.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    const selectedOption = options.find(option => option.id === value);

    return (
        <div className={`${styles.selectContainer} ${className}`} ref={dropdownRef}>
            <div 
                className={`${styles.selectTrigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
                onClick={handleToggle}
            >
                <span className={styles.selectValue}>
                    {loading ? (
                        <span className={styles.loadingText}>جاري التحميل...</span>
                    ) : selectedOption ? (
                        selectedOption.name
                    ) : (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </span>
                {/* <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}>
                    ▼
                </span> */}
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.searchContainer}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchPlaceholder}
                            className={styles.searchInput}
                        />
                        <span className={styles.searchIcon}><TextSearch />  </span>
                    </div>
                    
                    <div className={styles.optionsList}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`${styles.option} ${value === option.id ? styles.selected : ''}`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <span className={styles.optionText}>{option.name}</span>
                                    {value === option.id && (
                                        <span className={styles.checkIcon}>✓</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                {searchTerm ? 'لا توجد نتائج' : 'لا توجد خيارات متاحة'}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
