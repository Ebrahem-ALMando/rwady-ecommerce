import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithServer} from "@/utils/getTokenWithServer";


export const listAddresses = async () => {
    "use server";
    const endPointKey = "list-address";
    try {

        const token = await getTokenWithServer()
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "GET", null, {
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
        console.error("Failed to fetch addresses:", error.message);
        return null;
    }
};
