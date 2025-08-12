
import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getProducts = async (queryString = "") => {
    const endpoint = queryString
        ? `user/products?${queryString}`
        : "user/products";

    const res = await fetchAPI(endpoint, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endpoint],
        },
    });
    
    return res ?? [];
};

