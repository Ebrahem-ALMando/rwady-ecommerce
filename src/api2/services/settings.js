import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

let cachedSettings = null;
export const getSettings = async () => {
    const endPointKey="settings"

    if (cachedSettings) return cachedSettings;
    try {

        const ListSettings = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });
         cachedSettings = ListSettings;
        return cachedSettings??[];

    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
