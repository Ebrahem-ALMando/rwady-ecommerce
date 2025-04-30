"use client";
import styles from './Products.module.css';

import React, { useEffect, useState } from "react";
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

import { useSearchParams } from "next/navigation";



// import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";

const Products = (props) => {
    const [loading, setLoading] = useState(false);
    const [sortValue, setSortValue] = useState("");
    const [filtersData, setFiltersData] = useState({
        category_ids: [],
        brand_ids: [],
        size_ids: [],
        color_ids: [],
        group_ids: [],
        price_from: 0,
        price_to: 10000,
        search: "",
        sort_by: "",
        is_offer: null,
        is_top_selling: null,
        is_top_rated: null,
        rate: null,
    });
    const searchParams = useSearchParams();
    useEffect(() => {
        const updatedFilters = { ...filtersData };

        const paramMap = [
            "category_ids",
            "brand_ids",
            "group_ids",
            "color_ids",
            "size_ids",
            "is_offer",
            "is_top_selling",
            "is_top_rated",
            "rate"
        ];

        paramMap.forEach((key) => {
            const param = searchParams.get(key);
            if (param) {

                updatedFilters[key] = param.includes(",")
                    ? param.split(",").map(Number)
                    : [Number(param)];
            }
        });

        setFiltersData(updatedFilters);

    }, []);
    const {
        setSingleValue,
        toggleMultiValue,
        setPriceRange,
        resetFilters
    } = useFilters();

    const getServerFiltersOnly = (filters) => {
        const { sort_by, ...serverFilters } = filters;
        return serverFilters;
    };

    const { data: ProductsListData, isLoading, error, mutate }
        = useSWR("productsList", () => getProductsClient(getServerFiltersOnly(filtersData)));


    const debouncedFetch = useDebouncedCallback(async (filters) => {
        setLoading(true);
        await mutate(() => getProductsClient(filters), false);
        setLoading(false);
    }, 500);


    const serverFilters = getServerFiltersOnly(filtersData);
    const prevServerFilters = usePrevious(serverFilters);

    useEffect(() => {
        const curr = JSON.stringify(serverFilters);
        const prev = JSON.stringify(prevServerFilters);

        if (curr !== prev) {
            debouncedFetch(serverFilters);
        }
    }, [serverFilters]);



    const { data: CategoriesListData } = useSWR("categoriesHome", props.getDataCategory);
    const { data: BrandsListData } = useSWR("BrandHome", props.getDataBrands);
    const { data: ColorsListData } = useSWR("ColorsHome", props.getDataColor);

    return (
        <div className={styles.container}>
            <div className={styles.filterSidebar}>
                <CategoriesData
                    selected={filtersData.category_ids}
                    // onChange={(key, id) => setSingleValue(key, [id], setFiltersData)}
                    onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
                    data={CategoriesListData}
                />
                <Line />

                <BrandData
                    onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
                    data={BrandsListData}
                />
                <Line />

                <FilterSection title={"السعر"} section={"price"}>
                    <FilterCriteriaPrice
                        onChange={(min, max) => setPriceRange(min, max, setFiltersData)}
                    />
                </FilterSection>
                <Line />

                <ColorsData
                    onChange={(key, id) => toggleMultiValue(key, id, setFiltersData)}
                    data={ColorsListData}
                />
                <Line />

                <button
                    className={styles.resetButton}
                    onClick={() => resetFilters(setFiltersData)}
                >
                    إعادة ضبط
                </button>
            </div>

            <div className={styles.products}>
                <div className={styles.header}>
                    {productHeaderIcon}
                    <div className={styles.sort}>
                        <span>ترتيب حسب:</span>
                        <SortDropdown
                            value={filtersData.sort_by}
                            onChange={(val) => setSingleValue("sort_by", val, setFiltersData)}
                        />
                    </div>


                </div>

                <div className={styles.items}>
                    <ProductData
                        filters={filtersData}
                        isError={error}
                        isLoading={loading}
                        mutate={mutate}
                        data={ProductsListData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
