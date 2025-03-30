import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getAboutUs = async () => {
    "use server";
    try {
        const aboutUs = await fetchAPI("about-us", "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: ["about-us"],
            },
        });
        return aboutUs;
    } catch (error) {
        console.error("Failed to fetch about-us:", error.message);
        throw new Error("Failed to fetch about-us");
    }
};
