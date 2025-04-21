'use client';

import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PaginationWrapper.module.css';

const PaginationWrapper = ({ totalItems = 50, itemsPerPage = 10, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        onPageChange?.(page);
    };

    const generatePagination = () => {
        const pages = [];
        const visibleRange = 1;
        const edgeCount = 2;

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const left = Math.max(currentPage - visibleRange, edgeCount + 1);
            const right = Math.min(currentPage + visibleRange, totalPages - edgeCount);

            for (let i = 1; i <= edgeCount; i++) {
                pages.push(i);
            }

            if (left > edgeCount + 1) {
                pages.push("...");
            }

            for (let i = left; i <= right; i++) {
                pages.push(i);
            }

            if (right < totalPages - edgeCount) {
                pages.push("...");
            }

            for (let i = totalPages - edgeCount + 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // }, [currentPage]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className={styles.paginationContainer}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={styles.arrowBtn}
                    disabled={currentPage === 1}
                    aria-label="السابق"
                >
                    <ChevronRight size={18} />
                </motion.button>

                <div className={styles.pageList}>
                    {generatePagination().map((item, index) =>
                        item === "..." ? (
                            <motion.span
                                key={`ellipsis-${index}`}
                                className={styles.ellipsis}
                                initial={{y: -5, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{duration: 0.4, ease: "easeOut"}}
                            >
                                ...
                            </motion.span>

                        ) : (
                            <motion.button
                                key={item}
                                onClick={() => handlePageChange(item)}
                                className={`${styles.pageBtn} ${item === currentPage ? styles.active : ''}`}
                                aria-label={`صفحة ${item}`}
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {item}
                            </motion.button>
                        )
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={styles.arrowBtn}
                    disabled={currentPage === totalPages}
                    aria-label="التالي"
                >
                    <ChevronLeft size={18} />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaginationWrapper;
