'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiCalendar, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import styles from './DateRangePicker.module.css';

const DateRangePicker = ({ value, onChange, placeholder, locale = 'ar' }) => {
    const t = useTranslations('Orders.date_range_picker');
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const pickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value) {
            const [start, end] = value.split(' to ');
            setStartDate(start || '');
            setEndDate(end || '');
        } else {
            setStartDate('');
            setEndDate('');
        }
    }, [value]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleApply = () => {
        if (startDate && endDate) {
            const dateRange = `${startDate} to ${endDate}`;
            onChange({ target: { value: dateRange } });
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        onChange({ target: { value: '' } });
        setIsOpen(false);
    };

    const formatDisplayValue = () => {
        if (!value) return '';
        
        const [start, end] = value.split(' to ');
        if (!start || !end) return value;
        
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        const formatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        
        return `${startDate.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', formatOptions)} - ${endDate.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', formatOptions)}`;
    };

    return (
        <div className={styles.container} ref={pickerRef}>
            <div 
                className={styles.inputContainer}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FiCalendar className={styles.icon} />
                <input
                    type="text"
                    className={styles.input}
                    value={formatDisplayValue()}
                    placeholder={placeholder}
                    readOnly
                />
                {value && (
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}
                    >
                        <FiX />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className={styles.picker}>
                    <div className={styles.header}>
                        <h4>{t('title')}</h4>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className={styles.dateInputs}>
                        <div className={styles.dateInput}>
                            <label>{t('from_date')}</label>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className={styles.dateField}
                            />
                        </div>

                        <div className={styles.dateInput}>
                            <label>{t('to_date')}</label>
                            <input
                                type="datetime-local"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className={styles.dateField}
                                min={startDate}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.applyButton}
                            onClick={handleApply}
                            disabled={!startDate || !endDate}
                        >
                            {t('apply')}
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
