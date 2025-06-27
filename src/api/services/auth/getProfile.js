import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getProfile = async () => {
    const endPointKey = "user/me";

    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
