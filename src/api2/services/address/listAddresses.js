import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";


export const listAddresses = async () => {

    const endPointKey = "list-address";
    try {

        const token = await getTokenWithClient()
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
