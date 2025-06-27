"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import styles from './SearchModal.module.css';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState(["apple", "laptop", "phone"]);
    const [searchResults, setSearchResults] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSearchResults(query ? [`نتيجة 1 لـ ${query}`, `نتيجة 2 لـ ${query}`] : []);
    };

    const handleClose = () => {
        onClose();
        setSearchQuery("");
        setSearchResults([]);
    };

    return (
        <div className={`${styles.modalWrapper} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className={styles.closeButton} onClick={handleClose}>
                        <FiX size={24} />
                    </button>
                    <h2>البحث ضمن الموقع</h2>
                    <button className={styles.clearHistoryButton} onClick={() => setRecentSearches([])}>
                        مسح سجل البحث
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.searchInputWrapper}>
                        <CiSearch size={20} className={styles.searchIcon} />
                        <input
                            type="search"
                            placeholder="ابحث عن منتج، فئة..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    {/* عرض عمليات البحث الأخيرة */}
                    <div className={styles.searchHistory}>
                        <h3>عمليات البحث الأخيرة</h3>
                        {recentSearches.slice(0, showMore ? recentSearches.length : 3).map((item, index) => (
                            <div key={index} className={styles.searchItem}>
                                <span>{item}</span>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => setRecentSearches(recentSearches.filter((_, i) => i !== index))}
                                >
                                    <BsFillTrashFill size={16} />
                                </button>
                            </div>
                        ))}
                        {recentSearches.length > 3 && (
                            <button onClick={() => setShowMore(!showMore)} className={styles.showMoreBtn}>
                                {showMore ? "إخفاء" : "عرض المزيد"}
                            </button>
                        )}
                    </div>

                    {/* عرض نتائج البحث */}
                    <div className={styles.searchResults}>
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <div key={index} className={styles.resultItem}>
                                    <img src="https://via.placeholder.com/100" alt={result} />
                                    <span>{result}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                <img src="https://via.placeholder.com/50" alt="No results" />
                                <span>لا توجد نتائج مطابقة لبحثك</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
