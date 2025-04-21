import styles from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ isScrolled }) => {
    return (
        <div className={`${styles.mainDiv} ${isScrolled ? styles.scrolled : ''}`}>
            <label htmlFor="searchInput" className="sr-only">
                ابحث في الموقع
            </label>
            <span className={styles.SearchIcon}>
                <CiSearch size={28} />
            </span>
            <input
                id="searchInput"
                className={styles.SearchInput}
                type="search"
                placeholder="البحث عن ..."
                autoComplete="off"
                inputMode="search"
                aria-label="حقل البحث"
            />
        </div>
    );
};

export default SearchBar;
