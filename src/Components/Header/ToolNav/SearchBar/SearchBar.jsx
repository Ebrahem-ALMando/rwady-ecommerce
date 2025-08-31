

"use client";
import styles from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";

import React, {useEffect, useMemo, useRef, useState} from "react";
import Skeleton from "react-loading-skeleton";
import { FiInfo } from "react-icons/fi";

import NoResultsFound from "@/Components/Shared/SearchModal/NoResults/NoResultsFound";
import useSWR from "swr";
import {getProductsClient} from "@/api/services/listProductsClient";
import useDebounce from "@/hooks/useDebounce";
import {images} from "@/Data/images";
import {AnimatePresence,motion} from "framer-motion";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import {useRouter, useSearchParams} from "next/navigation";
import Link from 'next/link'
import RecentSearches from "@/Components/Shared/SearchModal/RecentSearches/RecentSearches";
import {useLocale, useTranslations} from "next-intl";
import {getProducts} from "@/api/services/listProducts";
import {slugify} from "@/utils/slugify";


const SearchBar = ({
                       isScrolled,
                       className,
                       onOpenModal,
                       onCloseModal,
                       isModalOpen=false,
                   }) => {
    const  t  = useTranslations("searchBar");
    const lang=useLocale()
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const router =useRouter()
    const debouncedQuery = useDebounce(searchQuery, 600);

    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    useEffect(() => {
        if (search && search !== searchQuery) {
            setSearchQuery(search);
        }
    }, [search]);


    const inputRef=useRef(null)

    // Modified to use server-side search
    const { data: productsData, isLoading: isSWRLoading, mutate } = useSWR(
        debouncedQuery ? `productsList?search=${debouncedQuery}` : 'productsList',
        () => getProducts(debouncedQuery ? `search=${debouncedQuery}` : ""),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );
    const isDebouncing = searchQuery && searchQuery !== debouncedQuery;
    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

        setRecentSearches(savedSearches);

    }, [isModalOpen]);

   

    const handleSaveHistory=(searchQuery)=>{

        if (searchQuery.trim()) {
            const newSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)];
            const limitedSearches = newSearches.slice(0, 5);
            setRecentSearches(limitedSearches);
            console.log(newSearches)
            localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
        }
    }
    const handleClearHistory = () => {
        localStorage.removeItem('recentSearches');
        setRecentSearches([]);
    };

    const handleDeleteSearch = (index) => {
        const newSearches = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(newSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
        if(newSearches.length>0){
            onOpenModal();
        }else {
            closeModal()
        }
    };

    const closeModal=()=>{
        onCloseModal();
        
    }
    
    // Remove frontend filtering since we're now using server-side search
    const filteredProducts = productsData?.data || [];

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) onOpenModal();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const showResults = searchQuery.trim().length > 0;
    const showRecentSearches = !showResults && recentSearches.length > 0;
    const showStartSearching = !showResults && recentSearches.length === 0;
    // console.log(searchQuery)
    return (
        <div className={`${styles.mainDiv} ${isScrolled ? styles.scrolled : ''} ${className}`}>
            <label htmlFor="searchInput" className="sr-only">
                {t("label")}
            </label>

            <span
                className={styles.SearchIcon}
                role="button"
                tabIndex={0}
                onClick={() => {
                    if (!searchQuery.trim()) return;
                    router.push(`/${lang}/products?search=${searchQuery.trim()}`);
                    closeModal();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(`/${lang}/products?search=${searchQuery.trim()}`);
                        handleSaveHistory(searchQuery);
                        closeModal();
                    }
                }}
            >
                      <CiSearch size={22}/>
                    </span>


            <input
                ref={inputRef}
                id="searchInput"
                className={` ${styles.SearchInput}`}
                type="search"
                placeholder={t("placeholder")}
                autoComplete="off"
                inputMode="search"
                aria-label={t("aria")}
                value={searchQuery}
                onChange={(e) => {
                    const query = e.target.value;
                    handleSearch(query);
                }}
                onBlur={closeModal}
                onClick={(e) => {
                    // const query = e.target.value;
                    if (recentSearches.length > 0) {
                        onOpenModal();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(`/${lang}/products?search=${searchQuery.trim()}`);
                        handleSaveHistory(searchQuery);
                        closeModal();
                    }
                }}

            />
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -15}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -15}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className={`${styles.searchArea}`}>
                        {searchQuery.length === 0 && showRecentSearches &&
                            <ul className={styles.resultsList}>

                                <RecentSearches
                                    searches={recentSearches}
                                    onDelete={handleDeleteSearch}
                                    onToggleShowMore={() => {
                                        setShowMore(!showMore)
                                        onOpenModal();
                                    }}
                                    onBlur={onCloseModal}
                                    showMore={showMore}
                                    onSearch={handleSearch}
                                    onClearHistory={handleClearHistory}
                                />


                            </ul>
                        }
                        {isDebouncing || isSWRLoading ? (
                            <ul className={styles.resultsList}>
                                {[...Array(4)].map((_, index) => (
                                    <motion.li
                                        key={index}
                                        className={styles.resultItem}
                                        initial={{opacity: 0, x: -30}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{duration: 0.3, delay: index * 0.05}}
                                    >
                                        <div className={styles.skeletonRow}>
                                            <Skeleton width={40} height={40} circle/>
                                            <Skeleton width={430} height={24}/>
                                            <Skeleton width={80} height={24}/>
                                        </div>

                                    </motion.li>
                                ))}
                            </ul>
                        ) : (
                            <ul className={styles.resultsList}

                            >
                                {filteredProducts.length > 0 && !showRecentSearches ? (
                                    filteredProducts.map((result, index) => {

                                        const imageUrl =
                                            result.media?.find((item) => item.type === 'image')?.url ??
                                            '/placeholder.jpg';
                                        return (
                                            <motion.li
                                                key={index}
                                                className={styles.resultItem}
                                                initial={{opacity: 0, x: -30}}
                                                animate={{opacity: 1, x: 0}}
                                                transition={{duration: 0.3, delay: index * 0.05}}

                                            >
                                                <div
                                                    onMouseEnter={() => {
                                                        router.prefetch(`/${lang}/products?search=${searchQuery.trim()}`);
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        router.push(`/${lang}/products?search=${searchQuery.trim()}`);
                                                    }}
                                                    className={styles.productInfo}

                                                >
                                                    <div className={styles.wrapperImg}>
                                                        <SafeImage
                                                            fallback="/FallbackProductImage.png"
                                                            src={imageUrl}
                                                            alt={result.name?.[lang]}
                                                            width={50}
                                                            height={50}
                                                            className={styles.productImage}
                                                        />
                                                    </div>
                                                    <span className={styles.productName}>{result.name?.[lang]}</span>
                                                </div>

                                                <Link
                                                    href={`/${lang}/products/${result.id}/${slugify(result?.name?.[lang])}`}
                                                    className={styles.detailsButton}
                                                    prefetch={false}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onMouseEnter={() => {
                                                        router.prefetch(`/${lang}/products/${result.id}/${slugify(result?.name?.[lang])}`);
                                                    }}
                                                >
                                                    <FiInfo/>
                                                    <span>{t("details", "تفاصيل")}</span>
                                                </Link>
                                            </motion.li>

                                        )

                                    })
                                ) : (
                                    searchQuery.length > 0 &&
                                    <li className={styles.resultItem}>
                                        <NoResultsFound/>
                                    </li>
                                )}
                            </ul>

                        )}
                    </motion.div>

                )}
            </AnimatePresence>

        </div>
    );
};

export default SearchBar;

