"use server"
import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getProducts = async (filters = {}) => {
    const endPointKey = "products";

    try {
        const formData = new URLSearchParams();

        for (const key in filters) {
            const value = filters[key];


            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            }

            else if (value !== undefined && value !== "" && value !== null) {
                formData.append(key, value);
            }
        }

        console.log("🟦 formData sent:", formData.toString());

        const response = await fetchAPI(endPointKey, "POST", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            next: {
                revalidate: ApiConfig.revalidateTime,
                tags: [endPointKey],
            },
        });

        return response ?? { data: [] };
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return { data: [] };
    }
};
