import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getProductDetails = async (productId) => {
    "use server";


    const endPointKey = `product/${productId}`;

    try {
        const productDetails = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return productDetails?.data ?? {};
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
