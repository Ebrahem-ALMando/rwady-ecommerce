import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @param {bigint} productId
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const toggleFavourite = async (productId) => {
    const endPointKey = `user/products/${productId}/toggle-favorite`;

    const res = await fetchAPI(endPointKey, "POST", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



