import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";


export const getFavourites = async () => {
    // const endPointKey = "favourites-list";
    // const token = getTokenWithClient();
    //
    // if (!token) {
    //     console.error("Token not found");
    //     return { error: true, message: "Token not found", data: [] };
    // }
    //
    // const res = await fetchAPI(endPointKey, "GET", null, {
    //
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //     next: {
    //         revalidate: ApiConfig.revalidateTime,
    //         tags: [endPointKey],
    //     },
    // });
    //
    // return res??[];
};
