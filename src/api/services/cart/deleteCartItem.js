import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {bigint} cartItemId -
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const deleteCartItem = async (cartItemId) => {
    const endPointKey = `user/cart-items/${cartItemId}`;

    const res = await fetchAPI(endPointKey, "DELETE", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



