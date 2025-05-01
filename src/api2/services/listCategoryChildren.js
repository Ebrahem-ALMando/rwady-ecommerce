import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @param {number|string} categoryId
 */
export const getSubCategory= async (categoryId) => {
    const endPointKey = `category/sub_categories/${categoryId}`;
    try {
        const response = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });
        return response;
    } catch (err) {
        console.error(`Failed to fetch category  ${categoryId}:`, err.message);
        throw err;
    }
};
