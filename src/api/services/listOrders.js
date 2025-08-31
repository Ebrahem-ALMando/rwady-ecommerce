import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @param {Object} params - معاملات الفلترة والباغنيشن
 * @param {string} params.status - حالة الطلب
 * @param {string} params.start_date - تاريخ البداية
 * @param {string} params.end_date - تاريخ النهاية
 * @param {number} params.current_page - رقم الصفحة الحالية
 * @param {number} params.per_page - عدد العناصر في الصفحة
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getOrders = async (params = {}) => {
    const endPointKey = "user/orders";
    
    // بناء query parameters
    const queryParams = new URLSearchParams();
    
    if (params.status) {
        queryParams.append('status', params.status);
    }
    
    if (params.start_date) {
        queryParams.append('start_date', params.start_date);
    }
    
    if (params.end_date) {
        queryParams.append('end_date', params.end_date);
    }
    
    if (params.current_page) {
        queryParams.append('current_page', params.current_page.toString());
    }
    
    if (params.per_page) {
        queryParams.append('per_page', params.per_page.toString());
    }
    
    const url = queryParams.toString() ? `${endPointKey}?${queryParams.toString()}` : endPointKey;

    const res = await fetchAPI(url, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};


