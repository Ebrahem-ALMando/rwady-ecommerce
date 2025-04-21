import { fetchAPI } from "@/api/api";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

export const toggleFavourite = async (productId) => {
    const endPointKey = "favourite";

    try {
        const token = getTokenWithClient();
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "POST", {
            product_id: productId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return null;
    }
};
