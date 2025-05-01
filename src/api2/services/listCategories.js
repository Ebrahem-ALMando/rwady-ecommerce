import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getCategories = async () => {
    "use server";
    try {
        const categories = await fetchAPI("categories", "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: ["categories"],
            },
        });
        return categories??[];
    } catch (error) {
        console.error("Failed to fetch categories:", error.message);
        throw new Error("Failed to fetch categories");
    }
};
