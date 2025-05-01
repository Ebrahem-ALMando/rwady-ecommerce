import { fetchAPI } from "@/api/api";
import { getTokenWithClient } from "@/utils/getTokenWithClient";


export const saveOrder = async (formData) => {
    const endPointKey = "order";
    try {
        const token = getTokenWithClient();
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "POST", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Failed to save order:", error.message);
        return null;
    }
};
