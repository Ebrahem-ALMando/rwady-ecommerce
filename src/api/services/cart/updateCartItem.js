import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {Object} data -
 * @param {bigint} cartItemId -
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const updateCartItem = async (cartItemId,data) => {
    const endPointKey = `user/cart-items/${cartItemId}`;

    const res = await fetchAPI(endPointKey, "PUT", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



