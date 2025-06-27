import { fetchAPI } from "@/api/api";

/**
 * Login using mobile number
 * @param {Object} formData - { phone: string, role?: string }
 * @returns {Object} response - { error: boolean, data?: any, message?: string }
 */
export const clientLogin = async (formData) => {
    const endPointKey = "auth/login";

    const res = await fetchAPI(endPointKey, "POST", {
        phone: formData.phone,
        role: formData.role || "customer",
    }, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
