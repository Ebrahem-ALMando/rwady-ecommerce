import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getSizes = async () => {
    "use server";
    const endPointKey="sizes"
    try {
        const sizes = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return sizes??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
