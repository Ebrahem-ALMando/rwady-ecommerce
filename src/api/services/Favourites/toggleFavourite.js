import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

/**
 * @param {bigint} productId
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const toggleFavourite = async (productId) => {
    const endPointKey = `user/products/${productId}/toggle-favorite`;
    const token = getTokenWithClient();
    if (!token) {
        // console.error("Token not found");
        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }
    const res = await fetchAPI(endPointKey, "POST", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



