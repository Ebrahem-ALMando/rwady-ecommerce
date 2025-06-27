import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * تحديث بيانات المستخدم
 * @param {Object} data -  name, avatar, language
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const updateProfile = async (data) => {
    const endPointKey = "user/me";

    const res = await fetchAPI(endPointKey, "PUT", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
