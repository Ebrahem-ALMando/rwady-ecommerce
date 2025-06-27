import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {delay} from "@/utils/delay";

export const getRecommendProducts = async () => {

    const endPointKey = "list-recommend-products";

    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res??[];
};
