import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import { getTokenWithClient } from "@/utils/getTokenWithClient";

export const getOrder = async (id) => {
    const endPointKey = `order/${id}`;

    try {
        const token = getTokenWithClient();
        if (!token) throw new Error("Token not found");

        const orderDetails = await fetchAPI(endPointKey, "GET", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return orderDetails?.data ?? null;
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return null;
    }
};
