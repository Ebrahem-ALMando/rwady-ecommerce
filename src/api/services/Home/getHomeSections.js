import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @returns {Promise<{ error: boolean, data?: any, message?: string }>}
 */
export const getHomeSections = async () => {
    const endPointKey = "user/home-sections?desc_type=clean";
    const startTime = Date.now();
    // await new Promise(resolve => setTimeout(resolve, 3500));
    const res = await fetchAPI(endPointKey, "GET", null, {
        next: {
            revalidate: ApiConfig.revalidateTime,
            tags: [endPointKey],
        },
    });
    const duration = Date.now() - startTime;
    console.log(`⏱ HOME PAGE Time: ${duration}ms:${!res.error}`);
    return res ?? [];
};
