import {fetchAPI, fetchWithSenderAPI} from "@/api/api";
import { getTokenWithClient } from "@/utils/getTokenWithClient";

export const toggleFavourite = async (productId) => {
    const endPointKey = "favourite";

    const token = getTokenWithClient();
    if (!token) {
        console.error("Token not found");
        return { error: true, message: "Token not found" };
    }

    const res = await fetchWithSenderAPI(
        endPointKey,
        "POST",
        { product_id: productId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return  res??[];
};
