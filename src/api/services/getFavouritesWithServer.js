import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithServer} from "@/utils/getTokenWithServer";




export const getFavouritesWithServer = async () => {
    "use server";
    const endPointKey = "favourites-list";

    try {
        const token = await getTokenWithServer();
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

        const favourites = response?.data ?? [];


        const cleanProducts = favourites
            .map(item => item.product)
            .filter(p => p && p.id && p.name);

        return cleanProducts;

    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return [];
    }
};

