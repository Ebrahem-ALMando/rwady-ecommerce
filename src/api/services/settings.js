import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


export const getSettings = async () => {
    const endPointKey="settings"
    try {

        const ListSettings = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });

        return ListSettings??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
