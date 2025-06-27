import { fetchAPI } from "@/api/api";

/**
 * Verify OTP for a phone number
 * @param {string} phone - Full phone number with country code (e.g., "+9647701234567")
 * @param {string} otp - The OTP code entered by the user
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const verifyOtp = async (phone, otp) => {
    const endPointKey = "auth/verify-otp";

    const res = await fetchAPI(endPointKey, "POST", {
        phone,
        otp,
    }, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
