import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getRecentAddedProducts = async () => {
    "use server"
    const endPointKey="list-recent-added-products"
    try {
        const recommendProducts = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return recommendProducts??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
