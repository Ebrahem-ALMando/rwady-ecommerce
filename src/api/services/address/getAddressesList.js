import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getAddressesList = async () => {
    const endPointKey = "user/addresses";

    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
