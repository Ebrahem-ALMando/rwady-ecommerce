import { fetchAPI } from "@/api/api";

/**
 *
 * @param {File} file -
 * @param {string} folder - ("products", "users", ...)
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const uploadImage = async (file, folder ) => {
    const endPointKey = "general/images/upload";

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    const res = await fetchAPI(endPointKey, "POST", formData, {
        next: {
            revalidate: 0,
            tags: [endPointKey],
        },
    });

    return res ?? [];
};
