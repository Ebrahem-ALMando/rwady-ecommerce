import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getTerms = async () => {

    try {

        const terms = await fetchAPI("terms", "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: ["terms"],
            },
        });
        return terms??[];
    } catch (error) {
        console.error("Failed to fetch Terms:", error.message);
        throw new Error("Failed to fetch Terms");
    }
};
