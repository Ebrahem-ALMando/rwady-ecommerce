import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {Object} data -
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const checkDetails = async (data) => {
    const endPointKey = "user/orders/check-details";

    const res = await fetchAPI(endPointKey, "POST", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};