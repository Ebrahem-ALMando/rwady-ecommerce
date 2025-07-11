import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getProfile = async () => {
    const endPointKey = "user/me";
    const token = getTokenWithClient();
    if (!token) {
        // console.error("Token not found");
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
