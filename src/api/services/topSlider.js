import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


export const getTopSlider = async () => {
    const endPointKey="top-sliders"

    try {

        const ListTopSlider = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });
        return ListTopSlider??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
