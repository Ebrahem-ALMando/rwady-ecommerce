import { BsFillTrashFill } from "react-icons/bs";
import styles from './SearchModal.module.css';

const SearchHistorySection = ({ recentSearches, setRecentSearches, showMore, setShowMore }) => {
    return (
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
    );
};

export default SearchHistorySection;
