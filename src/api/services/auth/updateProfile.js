
import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";




/**
 * @param {FormData} formData
 * @returns {Promise<any>}
 */
export const updateProfile = async (formData) => {
    const endPointKey = "update-profile";

    try {

        const token = getTokenWithClient()
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "POST", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return response;
    } catch (error) {
        console.error("Failed to update profile:", error.message);
        throw error;
    }
};
