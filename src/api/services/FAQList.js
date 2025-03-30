import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


export const getFaqs = async () => {
    "use server"
    const endPointKey="faqs"
    try {

        const faqs = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });

        return faqs??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
