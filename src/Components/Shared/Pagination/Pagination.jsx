"use client";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Pagination.module.css";

const Pagination = ({ 
    currentPage = 1, 
    lastPage = 1, 
    perPage = 20, 
    total = 0,
    onPageChange,
    className = "",
    showInfo = true,
    showPerPage = false,
    loadingPage = false
}) => {
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRTL = locale === "ar";

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(lastPage);
            } else if (currentPage >= lastPage - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = lastPage - 3; i <= lastPage; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(lastPage);
            }
        }
        
        return pages;
    }, [currentPage, lastPage]);

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    const handlePageChange = useCallback((page) => {
        if (page < 1 || page > lastPage || page === currentPage || loadingPage) return;
        
        // تحسين scroll behavior
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
        
        if (onPageChange) {
            onPageChange(page);
        } else {
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            router.push(`?${params.toString()}`, { scroll: false });
        }
    }, [currentPage, lastPage, onPageChange, router, searchParams, loadingPage]);

    const handlePerPageChange = useCallback((newPerPage) => {
        if (loadingPage) return;
         requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set("limit", newPerPage.toString());
            params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
    }, 250);
    }, [router, searchParams, loadingPage]);

    if (lastPage <= 1) return null;

    return (
        <div className={`${styles.paginationContainer} ${className}`}>
            {showInfo && (
                <div className={styles.pageInfo}>
                    <span className={styles.infoText}>
                        {isRTL ? (
                            `عرض ${startItem}-${endItem} من ${total} منتج`
                        ) : (
                            `Showing ${startItem}-${endItem} of ${total} products`
                        )}
                    </span>
                </div>
            )}

            {/* أزرار التنقل */}
            <div className={styles.paginationControls}>
                {/* زر الصفحة السابقة */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loadingPage}
                    className={`${styles.navButton} ${styles.prevButton} ${currentPage === 1 ? styles.disabled : ""} ${loadingPage ? styles.loading : ""}`}
                    aria-label={isRTL ? "الصفحة السابقة" : "Previous page"}
                >
                    {isRTL ? (
                        <FiChevronRight className={styles.navIcon} />
                    ) : (
                        <FiChevronLeft className={styles.navIcon} />
                    )}
                </button>

                {/* أرقام الصفحات */}
                <div className={styles.pageNumbers}>
                    {pageNumbers.map((page, index) => (
                        <button
                            key={index}
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                            className={`${styles.pageButton} ${
                                page === currentPage 
                                    ? styles.active 
                                    : page === "..." 
                                        ? styles.ellipsis 
                                        : ""
                            } ${loadingPage ? styles.loading : ""}`}
                            disabled={page === "..." || loadingPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* زر الصفحة التالية */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage || loadingPage}
                    className={`${styles.navButton} ${styles.nextButton} ${currentPage === lastPage ? styles.disabled : ""} ${loadingPage ? styles.loading : ""}`}
                    aria-label={isRTL ? "الصفحة التالية" : "Next page"}
                >
                    {isRTL ? (
                        <FiChevronLeft className={styles.navIcon} />
                    ) : (
                        <FiChevronRight className={styles.navIcon} />
                    )}
                </button>
            </div>

            {showPerPage && (
                <div className={styles.perPageSelector}>
                    <label className={styles.perPageLabel}>
                        {isRTL ? "لكل صفحة:" : "Per page:"}
                    </label>
                    <select 
                        value={perPage} 
                        onChange={(e) => handlePerPageChange(Number(e.target.value))}
                        className={styles.perPageSelect}
                        disabled={loadingPage}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>

                        {/* <option value={50}>50</option>
                        <option value={100}>100</option> */}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Pagination;
