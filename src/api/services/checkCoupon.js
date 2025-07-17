import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const checkCoupon = async (couponCode) => {
    const endPointKey = "user/coupons/check";
    const token = getTokenWithClient();
    if (!token) {
        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }
    const res = await fetchAPI(endPointKey, "POST", {coupon:couponCode}, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },

    });

    return res ?? [];
};
