import { fetchAPI } from "@/api/api";
import {getTokenWithClient} from "@/utils/getTokenWithClient";


export const updateAddress = async (formData) => {

    const endPointKey = "edit-address";
    try {

        const token = getTokenWithClient()
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "POST", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Failed to update address:", error.message);
        return null;
    }
};
