import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @param {number} countryId 
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getCities = async (countryId = null) => {
    let endPointKey = "general/addresses/cities";
    

    if (countryId) {
        endPointKey += `?country_id=${countryId}`;
    }

    // await new Promise(resolve => setTimeout(resolve, 3500));
    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
