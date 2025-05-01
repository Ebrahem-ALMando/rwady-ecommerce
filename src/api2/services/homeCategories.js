import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getHomeCategory = async () => {
    "use server";
    const endPointKey="home-categories"
    try {
        const homeCategory = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return homeCategory??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
