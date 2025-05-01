import { fetchAPI } from "@/api/api";
import {getTokenWithClient} from "@/utils/getTokenWithClient";


export const addAddress = async (formData) => {

    const endPointKey = "add-address";
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
        console.error("Failed to add address:", error.message);
        return null;
    }
};
