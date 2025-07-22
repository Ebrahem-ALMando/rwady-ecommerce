import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getUnreadCountNotifications = async () => {
    const endPointKey = "general/notifications/unread-count";
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
    });

    return res ?? [];
};
