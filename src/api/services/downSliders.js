import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getDownSlider = async () => {
    const endPointKey = "down-sliders";

    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res??[];
};
