import { fetchAPI } from "@/api/api";

/**
 * Login using mobile number
 * @param {Object} formData - { phone: string, role?: string }
 * @returns {Object} response - { error: boolean, data?: any, message?: string }
 */
export const clientLogin = async (formData) => {

    
    const endPointKey = "auth/login";

    const requestData = {   
        phone: formData.phone,
        role: formData.role || "customer",
        device_type: formData.device_type || null,
    };


    if (formData.device_token) {
        requestData.device_token = formData.device_token;
    
    }  

  

    const res = await fetchAPI(endPointKey, "POST", requestData, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });


    return res ?? [];
};
