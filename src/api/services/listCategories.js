import { fetchAPI } from "@/api/api";

export const getCategories = async () => {
    try {
        const categories = await fetchAPI("categories", "GET", null, {
            next: {
                revalidate: 60,
                tags: ["categories"],
            },
        });
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error.message);
        throw new Error("Failed to fetch categories");
    }
};
