import { fetchAPI } from "@/api/api";
import { getTokenWithClient } from "@/utils/getTokenWithClient";

export const logout = async () => {
    const endPointKey = "logout";

    const token = getTokenWithClient();
    if (!token) {
        console.error("Token not found");
        return { error: true, message: "Token not found" };
    }

    const res = await fetchAPI(endPointKey, "POST", null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res??[];
};
