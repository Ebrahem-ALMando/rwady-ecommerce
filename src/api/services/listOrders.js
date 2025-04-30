import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";



export const getOrders = async () => {

    const endPointKey = "order-list";

    try {

        const token =  getTokenWithClient()
        if (!token) throw new Error("Token not found");

        const listOrders = await fetchAPI(endPointKey, "GET", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return listOrders ?? [];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return [];
    }
};
