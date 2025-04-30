"use client";
import styles from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/i18n";

const SearchBar = ({ isScrolled }) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            router.push(`/products?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className={`${styles.mainDiv} ${isScrolled ? styles.scrolled : ''}`}>
            <label htmlFor="searchInput" className="sr-only">
                {t("searchBar.label")}
            </label>

            <span className={styles.SearchIcon}>
        <CiSearch size={22} />
      </span>

            <input
                id="searchInput"
                className={styles.SearchInput}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("searchBar.placeholder")}
                autoComplete="off"
                inputMode="search"
                aria-label={t("searchBar.aria")}
            />
        </div>
    );
};

export default SearchBar;
