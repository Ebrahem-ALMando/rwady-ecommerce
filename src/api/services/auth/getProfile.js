import { fetchAPI } from "@/api/api";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
/**
 * جلب بيانات المستخدم الحالية باستخدام التوكن
 * @returns بيانات المستخدم أو null في حال الفشل
 */
export const getProfile = async () => {
    // "use server";
    const endPointKey = "profile";
    try {

        const token =  getTokenWithClient()


        if (!token) throw new Error("Token not found");
        const response = await fetchAPI(endPointKey, "GET", null, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
            cache: "force-cache",
            // next: {
            //     revalidate: ApiConfig.revalidateTime,
            //     tags: [endPointKey],
            //
            // },
        });

        return response;
    } catch (error) {
        console.error("Failed to fetch profile:", error.message);
        return null;
    }
};
