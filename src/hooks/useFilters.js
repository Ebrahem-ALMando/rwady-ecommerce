"use client"
import { useState, useCallback } from "react";

const useFilters = () => {
    const [filters, setFilters] = useState({
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


    const toggleMultiValue = useCallback((key, value) => {
        setFilters((prev) => {
            const current = prev[key] || [];
            const exists = current.includes(value);
            const updated = exists ? current.filter((v) => v !== value) : [...current, value];
            return { ...prev, [key]: updated };
        });
    }, []);


    const setSingleValue = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, []);


    const setPriceRange = useCallback((min, max) => {
        setFilters((prev) => ({
            ...prev,
            price_from: min,
            price_to: max,
        }));
    }, []);


    const resetFilters = useCallback(() => {
        console.log(filters)
        setFilters({
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
    }, []);

    return {
        filters,
        toggleMultiValue,
        setSingleValue,
        setPriceRange,
        resetFilters,
        setFilters,
    };
};

export default useFilters;
