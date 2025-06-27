import ApiConfig from "@/api/apiConfig";
import {fetchAPI} from "@/api/api";

/**
 * @param {bigint} addressId
 * @param {Object} data
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const updateAddress = async (addressId,data) => {

    const endPointKey = `user/addresses/${addressId}`;
    const res = await fetchAPI(endPointKey, "PUT", data, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
