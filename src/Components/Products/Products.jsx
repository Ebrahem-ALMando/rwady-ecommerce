"use client";
import styles from './Products.module.css';

import React, {useEffect, useMemo, useState} from "react";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

import useFilters from "@/hooks/useFilters";
import { getProductsClient } from "@/api/services/listProductsClient";

import CategoriesData from "@/Components/Products/FilterSectionData/CategoriesData";
import BrandData from "@/Components/Products/FilterSectionData/BrandData";

import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaPrice from "@/Components/Products/FilterSection/FilterCriteriaPrice/FilterCriteriaPrice";
import { ProductData } from "@/Components/Products/ProductsItem/ProductData";

import Line from "@/Components/Shared/Line/Line";
import { productHeaderDownArrowIcon, productHeaderIcon } from "@/utils/Icons";
// import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
// import {usePrevious} from "@/hooks/usePrevious";
import SortDropdown from "@/Components/Shared/SortDropdown/SortDropdown";

// import {useRouter, useSearchParams} from "next/navigation";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import {getSortedProducts} from "@/utils/sortedData";
import {useLocale, useTranslations} from "next-intl";
// import {getProducts} from "@/api/services/listProducts";
import { MdFilterAltOff } from "react-icons/md";
import {useQueryFilterUpdater} from "@/utils/updateQueryParam";
import BrandsData from "@/Components/Products/FilterSectionData/BrandData";
import ProductCardSkeleton from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSkeleton/ProductCardSkeleton";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import ViewToggle from "@/Components/Shared/ViewToggle/ViewToggle";
import Pagination from "@/Components/Shared/Pagination";
import { useRouter } from "next/navigation";

const Products = ({initError, data, categoriesData, brandsData, searchParams, meta}) => {
    // const [loading1, setLoading] = useState(false);
    const [sortValue, setSortValue] = useState("");
    const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
    const [animateFilter, setAnimateFilter] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const lang = useLocale();
    const t = useTranslations("products");

    const router = useRouter();
    const { toggleQueryParam, resetAllQueryParams, setPriceRange } = useQueryFilterUpdater();
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [loadingPage, setIsLoadingPage] = useState(false);
    const [loadingPerPage, setLoadingPerPage] = useState(false);

    useEffect(() => {
        if (isPendingUpdate) {
            setIsPendingUpdate(false);
        }
    }, [data]);

    // إضافة useEffect لمراقبة تغييرات الـ limit
    useEffect(() => {
        const currentLimit = meta?.per_page || 20;
        if (currentLimit !== (searchParams.limit ? parseInt(searchParams.limit) : 20)) {
            setLoadingPerPage(true);
            setTimeout(() => setLoadingPerPage(false), 300);
        }
    }, [meta?.per_page, searchParams.limit]);

    const sortedData = useMemo(() => getSortedProducts(data, sortValue, lang), [data, sortValue, lang]);

    const filtersData = {
        category_id: Array.isArray(searchParams["category_ids[]"])
            ? searchParams["category_ids[]"]
            : searchParams["category_ids[]"]
                ? [searchParams["category_ids[]"]]
                : [],
        brand_id: Array.isArray(searchParams["brand_ids[]"])
            ? searchParams["brand_ids[]"]
            : searchParams["brand_ids[]"]
                ? [searchParams["brand_ids[]"]]
                : [],
        price_min: searchParams["price_min"] ? parseInt(searchParams["price_min"]) : 0,
        price_max: searchParams["price_max"] ? parseInt(searchParams["price_max"]) : 100000,
        search: searchParams["search"] || "",
    };
    
    // console.log('Products.jsx - searchParams:', searchParams);
    // console.log('Products.jsx - filtersData:', filtersData);
    // console.log('Products.jsx - meta:', meta);
    
    useEffect(() => {
        setSelectedFilters(filtersData);
    }, [searchParams]);

    const [selectedFilters, setSelectedFilters] = useState({
        category_id: filtersData.category_id,
        brand_id: filtersData.brand_id,
    });
    
    console.log('Products.jsx - selectedFilters:', selectedFilters);

    if (initError) return <ReloadWithError/>;

    const debouncedToggleFilter = useDebouncedCallback((key, id, callback) => {
        toggleQueryParam(key, id,lang);
        if (callback) callback();
    }, 200);

    const handleGenericChange = (section, id) => {
        setIsPendingUpdate(true);
        setSelectedFilters((prev) => {
            const prevSection = prev[section] || [];
            const exists = prevSection.includes(id.toString());
            const updated = exists
                ? prevSection.filter((i) => i !== id.toString())
                : [...prevSection, id.toString()];
            return { ...prev, [section]: updated };
        });

        debouncedToggleFilter(section, id);
    };

    const handleClearFilter = () => {
        setSortValue("");
        resetAllQueryParams(lang);
        // setSelectedFilters([]);
    };

    const openFilter = () => {
        setIsMobileFilterVisible(true);
        setTimeout(() => setAnimateFilter(true), 10);
    };

    const closeFilter = () => {
        setAnimateFilter(false);
        setTimeout(() => setIsMobileFilterVisible(false), 70);
    };

    useEffect(() => {
        if (isMobileFilterVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileFilterVisible]);

    const handlePageChange = async (page) => {
        try {
            setIsLoadingPage(true);
            // إزالة scroll behavior من هنا لأنه موجود في Pagination
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            
            router.push(`?${params.toString()}`, { scroll: false });
    
        } catch (error) {
            console.error('Error changing page:', error);
        } finally {
            // تقليل وقت التحميل لتحسين الأداء
            setTimeout(() => setIsLoadingPage(false), 200);
        }
    };


    return (
        <div className={styles.container}>

            <button
                className={`mobile:block hidden fixed left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-[100000]
                        transition-all duration-300
                    ${isMobileFilterVisible ? 'bottom-[calc(77%-28px)]' : 'bottom-4'}`}
                onClick={() => {
                    isMobileFilterVisible ? closeFilter() : openFilter();
                }}
            >
                {isMobileFilterVisible ? t('closeFilters') : t('showFilters')}
            </button>




                <div className={styles.filterSidebar}>
                    <CategoriesData isPendingUpdate={isPendingUpdate} lang={lang} selected={selectedFilters.category_id}
                                    onChange={handleGenericChange} data={categoriesData} t={t}/>
                    <Line/>
                    <BrandsData isPendingUpdate={isPendingUpdate} lang={lang} selected={selectedFilters.brand_id}
                                onChange={handleGenericChange} data={brandsData} t={t}/>
                    <Line/>
                    <FilterSection title={t('price')} section="price">
                        <FilterCriteriaPrice 
                            t={t} 
                            searchParams={searchParams}
                            setPriceRange={setPriceRange}
                            lang={lang}
                        />
                    </FilterSection>
                    <Line/>
                    {(sortValue || Object.keys(searchParams).length > 0) && (
                                <button className={styles.resetButton}
                                        onClick={handleClearFilter}>{t('clearFilter')}</button>
                            )}
                </div>


            {isMobileFilterVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-[99999] block min-[1000px]:hidden"
                    onClick={closeFilter}
                >
                    <div
                        className={`fixed bottom-0 left-0 w-full max-h-[77%] bg-white rounded-t-2xl z-[99999] overflow-y-auto transition-transform duration-300 ease-in-out ${animateFilter ? 'translate-y-0' : 'translate-y-full'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <CategoriesData isPendingUpdate={isPendingUpdate} lang={lang}
                                            selected={selectedFilters.category_id} onChange={handleGenericChange}
                                            data={categoriesData} t={t}/>
                            <Line/>
                            <BrandsData isPendingUpdate={isPendingUpdate} lang={lang}
                                        selected={selectedFilters.brand_id} onChange={handleGenericChange}
                                        data={brandsData} t={t}/>
                            <Line/>
                            <FilterSection title={t('price')} section="price">
                                <FilterCriteriaPrice 
                                    t={t} 
                                    searchParams={searchParams}
                                    setPriceRange={setPriceRange}
                                    lang={lang}
                                />
                            </FilterSection>
                            <Line/>
                            {(sortValue || Object.keys(searchParams).length > 0) && (
                                <button className={styles.resetButton}
                                        onClick={handleClearFilter}>{t('clearFilter')}</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.products}>
                <div className={styles.header}>
                   <div className={`flex items-center gap-4 ${styles.headerIcons}`}>
                       {/* {productHeaderIcon} */}
                 
                       <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
                       {(sortValue || Object.keys(searchParams).length > 0) && (
                           <button onClick={handleClearFilter} className={styles.clearButton} title={t("clearFilter")}>
                               <MdFilterAltOff size={18}/></button>
                       )}
                   </div>
                    <div className={styles.sort}>

                        <span>{t("sortBy")}</span>
                        <SortDropdown value={sortValue} onChange={(val) => setSortValue(val)}/>

                    </div>

                </div>
                {sortedData.length===0&&
                <div className="flex justify-center ">
                    <EmptyState message={t('noMatchingData')} />
                </div>
                }     
                {sortedData.length>0&&
                <div className={`${styles.items} ${viewMode === 'list' ? styles.listView : ''}`}>
                    {isPendingUpdate  ? (
                        <>
                            <ProductCardSkeleton/>
                            <ProductCardSkeleton/>
                            <ProductCardSkeleton/>
                        </>
                    ) : (
                        <>
                        {loadingPage || loadingPerPage ?
                        
                        <>
                       
                         {Array.from({ length: meta?.per_page || 20 }, (_, index) => (
                             <ProductCardSkeleton key={`skeleton-${index}`} />
                         ))}
                        </>
                    :
                    <ProductsItem
                    // key={JSON.stringify(selectedFilters)}
                    data={sortedData}
                    lang={lang}
                    t={t}
                    viewMode={viewMode}
                />
                    }
                     
                        </>
                     
                    )}
                </div>
                }

                {/* Pagination Component */}
                {meta && meta.last_page > 1 && (
                    <>
                        {console.log('Rendering Pagination with meta:', meta)}
                        <Pagination
                            currentPage={meta.current_page}
                            lastPage={meta.last_page}
                            perPage={meta.per_page}
                            total={meta.total}
                            showInfo={true}
                            showPerPage={true}
                            onPageChange={handlePageChange}
                            loadingPage={loadingPage || loadingPerPage}
                            setIsLoadingPage={setIsLoadingPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
