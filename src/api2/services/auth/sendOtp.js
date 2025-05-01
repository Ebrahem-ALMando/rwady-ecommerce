import { fetchAPI } from "@/api/api";
/**
 * Send OTP to the given phone number
 * @param {string} phoneNumber
 * @returns response with OTP code or error
 */
export const sendOtp = async (phoneNumber) => {
    // "use server";
    const endPointKey = "send-otp";

    try {
        const formData = new FormData();
        formData.append("phoneNumber", phoneNumber);

        const response = await fetchAPI(endPointKey, "POST", formData, {
            next: {
                revalidate: 0,
                tags: [endPointKey],
            },
        });

        return response;
    } catch (error) {
        console.error(`Failed to send OTP:`, error.message);
        throw new Error("Failed to send OTP.");
    }
};