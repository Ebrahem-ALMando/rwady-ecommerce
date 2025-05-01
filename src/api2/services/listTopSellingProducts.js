"use server"
import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


let cachedData = null;

export const getTopSellingProducts = async () => {
    if (cachedData) return cachedData;


    const endPointKey="list-top-selling-products"
    try {
        const topSellingProducts = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return topSellingProducts??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
