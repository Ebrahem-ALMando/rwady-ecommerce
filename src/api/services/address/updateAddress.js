import { fetchAPI } from "@/api/api";
import {getTokenWithServer} from "@/utils/getTokenWithServer";


export const updateAddress = async (formData) => {
    "use server";
    const endPointKey = "update-address";
    try {

        const token = await getTokenWithServer()
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
