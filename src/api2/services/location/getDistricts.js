"use server";

import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * ملاحظاتي من اجل التعديل في وقت لاحق
 * جلب المناطق (districts) حسب معرف المدينة
 * @param {number|string} cityId
 */
export const getDistricts = async (cityId) => {
    const endPointKey = `district/${cityId}`;
    try {
        const response = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return response;
    } catch (err) {
        console.error(`Failed to fetch districts for city ${cityId}:`, err.message);
        throw err;
    }
};
