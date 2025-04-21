import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";



export const getCities = async () => {
    const endPointKey = "cities";
    try {
        const response = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime ,
                tags: [endPointKey],
            },
        });
        return response;
    } catch (err) {
        console.error("Failed to fetch provinces:", err.message);
        throw err;
    }
};
