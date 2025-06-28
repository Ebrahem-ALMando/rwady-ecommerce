import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {bigint} productId -
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const deleteCartItem = async (productId) => {
    const endPointKey = `user/cart-items/${productId}`;

    const res = await fetchAPI(endPointKey, "DELETE", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



