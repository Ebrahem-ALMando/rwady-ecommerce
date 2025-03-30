import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


export const getDownSlider = async () => {
    const endPointKey="down-sliders"

    try {

        const ListDownSlider = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });
        // await new Promise(resolve => setTimeout(resolve, 3000));
        return ListDownSlider??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
