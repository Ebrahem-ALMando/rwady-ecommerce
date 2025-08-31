import {getTokenWithClient} from "@/utils/getTokenWithClient";
import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";


/**
 * @param {Object} params - Query parameters for filtering
 * @param {string} params.status - Payment status filter
 * @param {string} params.start_date - Start date for date range filter
 * @param {string} params.end_date - End date for date range filter
 * @param {number} params.current_page - Current page number
 * @param {number} params.per_page - Items per page
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getTransaction = async (params = {}) => {
    const endPointKey = "user/order-payments";
    const token = getTokenWithClient();
    if (!token) {

        return {
            error: true,
            data: [],
            message: "Token not found",
        };
    }

    // Build query string from params
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            queryParams.append(key, params[key]);
        }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${endPointKey}?${queryString}` : endPointKey;

    const res = await fetchAPI(endpoint, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
        // cache: "no-store"
    });

    return res ?? [];
};