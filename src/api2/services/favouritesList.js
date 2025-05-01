import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";



export const getFavourites = async () => {

    const endPointKey = "favourites-list";

    try {

        const token =  getTokenWithClient()
        if (!token) throw new Error("Token not found");

        const favourites = await fetchAPI(endPointKey, "GET", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return favourites ?? [];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return [];
    }
};
