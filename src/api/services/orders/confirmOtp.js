import { fetchAPI } from "@/api/api";

/**
 * Verify OTP
 @param {bigint} orderId - The orderId
 * @param {string} otp - The OTP code entered by the user
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const confirmOtp = async (orderId, otp) => {
    const endPointKey = `user/orders/${orderId}/confirm-otp`;

    const res = await fetchAPI(endPointKey, "POST", {
        otp,
    }, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};

