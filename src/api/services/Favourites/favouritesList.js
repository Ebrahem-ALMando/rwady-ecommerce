import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const getFavourites = async () => {

    const endpoint ='user/products?is_favorite=1'
    const token = getTokenWithClient();
    if (!token) {
        // console.error("Token not found");
        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }
    const res = await fetchAPI(endpoint, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endpoint],
        },
    });

    return res ?? [];
};

