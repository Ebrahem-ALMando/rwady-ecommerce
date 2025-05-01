import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getBrands = async () => {
    "use server";
    const endPointKey="brands"
    try {
        const brands = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return brands??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
