import { fetchAPI } from "@/api/api";
import { getTokenWithClient } from "@/utils/getTokenWithClient";
import ApiConfig from "@/api/apiConfig";

export const logoutUser = async () => {
    const endPointKey = "auth/logout";

    const token = getTokenWithClient();
    if (!token) {
        // console.error("Token not found");
        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }

    const res = await fetchAPI(endPointKey, "POST", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res??[];
};
