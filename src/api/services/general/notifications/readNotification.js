import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

/**
 * @param {bigint} id -  id
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const readNotification = async (id) => {
    const endPointKey = `general/notifications/${id}/read`;

    const token = getTokenWithClient();
    if (!token) {

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
