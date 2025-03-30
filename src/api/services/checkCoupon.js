import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const checkCoupon = async (couponCode) => {
    "use server"
    const endPointKey = "checkcoupon";

    try {
        const response = await fetchAPI(endPointKey, "POST", { coupon: couponCode }, {
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
