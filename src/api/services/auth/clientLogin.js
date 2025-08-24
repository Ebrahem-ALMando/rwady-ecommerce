import { fetchAPI } from "@/api/api";

/**
 * Login using mobile number
 * @param {Object} formData - { phone: string, role?: string }
 * @returns {Object} response - { error: boolean, data?: any, message?: string }
 */
export const clientLogin = async (formData) => {
    console.log('📡 [clientLogin] Starting login request...');
    console.log('📡 [clientLogin] Form data received:', {
        phone: formData.phone,
        role: formData.role,
        hasDeviceToken: !!formData.device_token
    });
    
    const endPointKey = "auth/login";

    const requestData = {   
        phone: formData.phone,
        role: formData.role || "customer",
        device_type: formData.device_type || null,
    };

    // إضافة device_token إذا كان متوفراً
    if (formData.device_token) {
        requestData.device_token = formData.device_token;
        console.log('🔔 [clientLogin] Device token included in request');
    } else {
        console.log('⚠️ [clientLogin] No device token provided');
    }

    console.log('📡 [clientLogin] Final request data:', requestData);
    console.log('📡 [clientLogin] Making API call to:', endPointKey);

    const res = await fetchAPI(endPointKey, "POST", requestData, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });

    console.log('📡 [clientLogin] API response:', res);
    return res ?? [];
};
