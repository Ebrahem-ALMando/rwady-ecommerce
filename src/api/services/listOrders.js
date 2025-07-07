import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getOrders = async () => {
    const endPointKey = "user/orders";

    // await new Promise(resolve => setTimeout(resolve, 3500));
    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};


