import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
export const deleteAddress = async (addressId) => {
    // "use server";
    const endPointKey = `delete-address/${addressId}`;
    try {

        const token = getTokenWithClient()
        if (!token) throw new Error("Token not found");

        const response = await fetchAPI(endPointKey, "DELETE", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            }
        });

        return response;
    } catch (error) {
        console.error(" Failed to delete address:", error.message);
        return null;
    }
};
