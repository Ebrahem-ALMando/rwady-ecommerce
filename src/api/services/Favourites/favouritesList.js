import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";
/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const getFavourites = async () => {

    const endpoint ='user/products?is_favorite=1'
    const res = await fetchAPI(endpoint, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endpoint],
        },
    });

    return res ?? [];
};

