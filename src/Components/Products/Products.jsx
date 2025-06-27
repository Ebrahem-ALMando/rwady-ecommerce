// "use client";
// import styles from './Products.module.css';
//
// import React, { useEffect, useState } from "react";
// import useSWR from "swr";
// import { useDebouncedCallback } from "use-debounce";
//
// import useFilters from "@/hooks/useFilters";
// import { getProductsClient } from "@/api/services/listProductsClient";
//
// import CategoriesData from "@/Components/Products/FilterSectionData/CategoriesData";
// import BrandData from "@/Components/Products/FilterSectionData/BrandData";
//
// import FilterSection from "@/Components/Products/FilterSection/FilterSection";
// import FilterCriteriaPrice from "@/Components/Products/FilterSection/FilterCriteriaPrice/FilterCriteriaPrice";
// import { ProductData } from "@/Components/Products/ProductsItem/ProductData";
//
// import Line from "@/Components/Shared/Line/Line";
// import { productHeaderDownArrowIcon, productHeaderIcon } from "@/utils/Icons";
// import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
// import {usePrevious} from "@/hooks/usePrevious";
// import SortDropdown from "@/Components/Shared/SortDropdown/SortDropdown";
//
// import { useSearchParams } from "next/navigation";
//
//
//
// // import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
//
// const Products = (props) => {
//     const [loading, setLoading] = useState(false);
//     const [sortValue, setSortValue] = useState("");
//     const [filtersData, setFiltersData] = useState({
//         category_ids: [],
//         brand_ids: [],
//         size_ids: [],
//         color_ids: [],
//         group_ids: [],
//         price_from: 0,
//         price_to: 10000,
//         search: "",
//         sort_by: "",
//         is_offer: null,
//         is_top_selling: null,
//         is_top_rated: null,
//         rate: null,
//     });
//     const searchParams = useSearchParams();
//     useEffect(() => {
//         const updatedFilters = { ...filtersData };
//
//         const paramMap = [
//             "category_ids",
//             "brand_ids",
//             "group_ids",
//             "color_ids",
//             "size_ids",
//             "is_offer",
//             "is_top_selling",
//             "is_top_rated",
//             "rate"
//         ];
//
//         paramMap.forEach((key) => {
//             const param = searchParams.get(key);
//             if (param) {
//
//                 updatedFilters[key] = param.includes(",")
//                     ? param.split(",").map(Number)
//                     : [Number(param)];
//             }
//         });
//
//         setFiltersData(updatedFilters);
//
//     }, []);
//     const {
//         setSingleValue,
//         toggleMultiValue,
//         setPriceRange,
//         resetFilters
//     } = useFilters();
//
//     const getServerFiltersOnly = (filters) => {
//         const { sort_by, ...serverFilters } = filters;
//         return serverFilters;
//     };
//
//     const { data: ProductsListData, isLoading, error, mutate }
//         = useSWR("productsList", () => getProductsClient(getServerFiltersOnly(filtersData)));
//
//
//     const debouncedFetch = useDebouncedCallback(async (filters) => {
//         setLoading(true);
//         await mutate(() => getProductsClient(filters), false);
//         setLoading(false);
//     }, 500);
//
//
//     const serverFilters = getServerFiltersOnly(filtersData);
//     const prevServerFilters = usePrevious(serverFilters);
//
//     useEffect(() => {
//         const curr = JSON.stringify(serverFilters);
//         const prev = JSON.stringify(prevServerFilters);
//
//         if (curr !== prev) {
//             debouncedFetch(serverFilters);
//         }
//     }, [serverFilters]);
//
//
//
//     const { data: CategoriesListData } = useSWR("categoriesHome", props.getDataCategory);
//     const { data: BrandsListData } = useSWR("BrandHome", props.getDataBrands);
//     const { data: ColorsListData } = useSWR("ColorsHome", props.getDataColor);
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.filterSidebar}>
//                 <CategoriesData
//                     selected={filtersData.category_ids}
//                     // onChange={(key, id) => setSingleValue(key, [id], setFiltersData)}
//                     onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
//                     data={CategoriesListData}
//                 />
//                 <Line />
//
//                 <BrandData
//                     onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
//                     data={BrandsListData}
//                 />
//                 <Line />
//
//                 <FilterSection title={"السعر"} section={"price"}>
//                     <FilterCriteriaPrice
//                         onChange={(min, max) => setPriceRange(min, max, setFiltersData)}
//                     />
//                 </FilterSection>
//                 <Line />
//
//                 <ColorsData
//                     onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
//                     data={ColorsListData}
//                 />
//                 <Line />
//
//                 <button
//                     className={styles.resetButton}
//                     onClick={() => resetFilters(setFiltersData)}
//                 >
//                     إعادة ضبط
//                 </button>
//             </div>
//
//             <div className={styles.products}>
//                 <div className={styles.header}>
//                     {productHeaderIcon}
//                     <div className={styles.sort}>
//                         <span>ترتيب حسب:</span>
//                         <SortDropdown
//                             value={filtersData.sort_by}
//                             onChange={(val) => setSingleValue("sort_by", val, setFiltersData)}
//                         />
//                     </div>
//
//
//                 </div>
//
//                 <div className={styles.items}>
//                     <ProductData
//                         filters={filtersData}
//                         isError={error}
//                         isLoading={loading}
//                         mutate={mutate}
//                         data={ProductsListData}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Products;


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
import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
import {usePrevious} from "@/hooks/usePrevious";
import SortDropdown from "@/Components/Shared/SortDropdown/SortDropdown";

import {useRouter, useSearchParams} from "next/navigation";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import {getSortedProducts} from "@/utils/sortedData";
import {useLocale, useTranslations} from "next-intl";
import {getProducts} from "@/api/services/listProducts";
import { MdFilterAltOff } from "react-icons/md";
import {useQueryFilterUpdater} from "@/utils/updateQueryParam";
import BrandsData from "@/Components/Products/FilterSectionData/BrandData";
import ProductSliderSkeleton
    from "@/Components/Shared/SliderComponents/ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton";
import ProductCardSkeleton
    from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSkeleton/ProductCardSkeleton";




// import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";

const Products = ({initError,data,categoriesData,brandsData,searchParams}) => {
    const [loading, setLoading] = useState(false);
    const [sortValue, setSortValue] = useState("");
    const lang=useLocale()
    const t = useTranslations("products");
    const sortedData = useMemo(() => getSortedProducts(data, sortValue, lang), [data, sortValue, lang]);
    const router=useRouter()
    const { toggleQueryParam, clearQueryParam, resetAllQueryParams } = useQueryFilterUpdater();
    const handleClearFilter=()=>
    {
        setSortValue("");
        resetAllQueryParams()
        setSelectedFilters([]);
        // router.refresh()
    }



    // const filtersData = {
    //     category_ids: Array.isArray(searchParams.category_id)
    //         ? searchParams.category_id
    //         : searchParams.category_id
    //             ? [searchParams.category_id]
    //             : [],
    //     // لاحقًا بنضيف brand_ids، color_ids، price_min، price_max، ...
    // };
    const filtersData = {
        category_id: Array.isArray(searchParams["category_id"])
            ? searchParams["category_id"]
            : searchParams["category_id"]
                ? [searchParams["category_id"]]
                : [],
        brand_id: Array.isArray(searchParams["brand_id"])
            ? searchParams["brand_id"]
            : searchParams["brand_id"]
                ? [searchParams["brand_id"]]
                : [],
        search: searchParams["search"] || "",
    };




    if(initError)return <ReloadWithError/>
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);

    const debouncedToggleFilter = useDebouncedCallback((key, id, callback) => {
        toggleQueryParam(key, id);
        if (callback) callback();

    }, 100);

    const [selectedFilters, setSelectedFilters] = useState({
        category_id: filtersData.category_id,
        brand_id: filtersData.brand_id,
        // لاحقًا: color_id, price, ...
    });



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

        debouncedToggleFilter(section, id, () => {
            setTimeout(() => setIsPendingUpdate(false), 150);
        });

    };


    return (
        <div className={styles.container}>
            <div className={styles.filterSidebar}>
                <CategoriesData
                    isPendingUpdate={isPendingUpdate}
                    lang={lang}
                    selected={selectedFilters.category_id}
                    onChange={handleGenericChange}
                    data={categoriesData}
                    t={t}
                />

                <Line />

                <BrandsData
                    isPendingUpdate={isPendingUpdate}
                    lang={lang}
                    selected={selectedFilters.brand_id}
                    onChange={handleGenericChange}
                    data={brandsData}
                    t={t}
                />
                <Line />


                    <FilterSection title={t('price')} section={"price"}>
                    <FilterCriteriaPrice
                        t={t}
                        // onChange={(min, max) => setPriceRange(min, max, setFiltersData)}
                    />
                </FilterSection>
                <Line />

                {/*<ColorsData*/}
                {/*    // onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}*/}
                {/*    // data={ColorsListData}*/}
                {/*/>*/}
                {/*<Line />*/}
                {(sortValue || Object.keys(searchParams).length > 0) && (
                    <button
                        className={styles.resetButton}
                        onClick={handleClearFilter}
                    >
                        {t('clearFilter')}
                    </button>
                )}
            </div>

            <div className={styles.products}>
                <div className={styles.header}>
                    {productHeaderIcon}
                    <div className={styles.sort}>
                        <span>{t("sortBy")}</span>
                        <SortDropdown
                            value={sortValue}
                            onChange={(val) => setSortValue(val)}
                        />
                        {(sortValue || Object.keys(searchParams).length > 0) && (
                            <button
                                onClick={handleClearFilter}
                                className={styles.clearButton}
                                title={t("clearFilter")}
                            >
                                <MdFilterAltOff size={18} />
                            </button>
                        )}

                    </div>


                </div>
                <div className={styles.items}>
                    {isPendingUpdate?
                        (
                            <>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                            </>
                        )
                    :
                        (   <ProductsItem
                            data={sortedData}
                            lang={lang}
                            // isLoading={isLoading}
                            // isError={isError}
                            // mutate={mutate}
                            // initialData={initialProductsData}
                            // initialError={initialError}
                            // getData={getProducts}
                            // keyData={"productsList"}
                        />)
                    }


                </div>
            </div>
        </div>
    );
};

export default Products;
