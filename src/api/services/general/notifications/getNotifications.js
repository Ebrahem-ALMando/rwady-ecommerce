import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
import {useLocale} from "next-intl";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getNotifications = async (lang) => {
    const endPointKey = "general/notifications";
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
            tags: [`${endPointKey}-${lang}`],
        },

    },
        { showError: true },
    lang);

    return res ?? [];
};
