"use server";

import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * جلب قائمة المنتجات باستخدام فلاتر محددة
 * @param {Object} filters - الفلاتر المستخدمة (مثل: category_id، name، limit، ...إلخ)
 * @returns قائمة المنتجات أو خطأ
 */
export const getProducts = async (filters = {}) => {
    const endPointKey = "products";

    try {
        const formData = new URLSearchParams();

        for (const key in filters) {
            if (filters[key] !== undefined && filters[key] !== "") {
                formData.append(key, filters[key]);
            }
        }

        const response = await fetchAPI(endPointKey, "POST", formData, {
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return response ?? { data: [] };
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return { data: [] };
    }
};
