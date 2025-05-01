import { fetchAPI } from "@/api/api";

/**
 * Login using mobile number and country code
 * @param {Object} formData - { mobile: "...", country_code: "..." }
 * @returns response object with token or error
 */
export const clientLogin = async (formData) => {
    // "use server";
    const endPointKey = "client-login";

    try {
        const response = await fetchAPI(endPointKey, "POST", formData, {
            next: {
                revalidate: 0,
                tags: [endPointKey],
            },
        });
        return response;
    } catch (error) {
        console.error(`Failed to login:`, error.message);
        throw new Error("Login failed. Please try again.");
    }
};
