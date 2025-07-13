import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getOffers = async () => {
    // const endPointKey = "offers";
    //
    // const res = await fetchAPI(endPointKey, "GET", null, {
    //     next: {
    //         revalidate: ApiConfig.revalidateTime,
    //         tags: [endPointKey],
    //     },
    // });
    //
    // return res??[];
    return {
        error: true,
        data: [],
        message: "Token not found",
    };
};
