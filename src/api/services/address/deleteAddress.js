import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 *
 * @param {bigint} addressId -  ID
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */

export const deleteAddress = async (addressId) => {
    const endPointKey = `user/addresses/${addressId}`;
    const res = await fetchAPI(endPointKey, "DELETE", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });
    return res ?? [];
};



