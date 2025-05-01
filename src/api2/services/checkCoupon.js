import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

export const checkCoupon = async (couponCode) => {

    const endPointKey = "checkcoupon";

    const token =  getTokenWithClient()
    if (!token) throw new Error("Token not found");

    try {
        const response = await fetchAPI(endPointKey, "POST", { code: couponCode },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return response ?? null;
    } catch (error) {

        console.log(error)
        console.error(`Failed to verify coupon ${couponCode}:`, error.message);
        throw new Error(`Failed to verify coupon ${couponCode}`);
    }
};
