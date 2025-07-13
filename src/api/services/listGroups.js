import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

/**
 * @var endPoint end point
 * @returns {Promise<*|*[]>}
 */
export const getGroups = async () => {
    // "use server";
    // const endPoint="groups";
    // try {
    //     const groupe = await fetchAPI(endPoint, "GET", null, {
    //         next: {
    //             revalidate:ApiConfig.revalidateTime,
    //             tags:endPoint,
    //         },
    //     });
    //     return groupe??[];
    // } catch (error) {
    //     console.error("Failed to fetch groups:", error.message);
    //     throw new Error("Failed to fetch groups");
    // }
    return []
};
