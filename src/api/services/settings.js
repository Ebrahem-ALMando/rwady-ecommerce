import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {delay} from "@/utils/delay";

export const getSettings = async () => {
    const endPointKey = "settings";

    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });
    // await delay(3000)
    return res?? {};
};
