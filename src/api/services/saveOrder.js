import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {Object} data -
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const saveOrder = async (data) => {
    const endPointKey = "user/orders";

    const res = await fetchAPI(endPointKey, "POST", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



