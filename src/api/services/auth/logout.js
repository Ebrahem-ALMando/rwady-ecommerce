
import { fetchAPI } from "@/api/api";
import {getTokenWithClient} from "@/utils/getTokenWithClient";




export const logout = async () => {
    const endPointKey = "logout";

    try {
        const token =  getTokenWithClient()
        console.log(token)
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "POST", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error(" Failed to logout:", error.message);
        return null;
    }
};
