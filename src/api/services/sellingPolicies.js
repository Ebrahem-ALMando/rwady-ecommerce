import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getSellingPolicies = async () => {
    "use server"
    try {

        const sellingPolicies = await fetchAPI("selling-policies", "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: ["selling-policies"],
            },
        });
        return sellingPolicies??[];
    } catch (error) {
        console.error("Failed to fetch selling-policies:", error.message);
        throw new Error("Failed to fetch selling-policies");
    }
};
