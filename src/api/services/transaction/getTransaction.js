import {getTokenWithClient} from "@/utils/getTokenWithClient";
import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";


/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getTransaction = async () => {
    const endPointKey = "user/order-payments";
    const token = getTokenWithClient();
    if (!token) {

        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }
    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
        // cache: "no-store"
    });

    return res ?? [];
};