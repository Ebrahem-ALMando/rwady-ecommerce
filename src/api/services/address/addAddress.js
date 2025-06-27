import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * تحديث بيانات المستخدم
 * @param {Object} data -  name, avatar, language
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const addAddress = async (data) => {
    const endPointKey = "user/addresses";

    const res = await fetchAPI(endPointKey, "POST", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};



