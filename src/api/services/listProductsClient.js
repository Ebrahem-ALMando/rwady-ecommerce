import {fetchAPI} from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getProductsClient = async (filters = {}) => {
    const endPointKey = "user/products";

    try {
        const formData = new URLSearchParams();

        for (const key in filters) {
            const value = filters[key];

            if (
                value === undefined ||
                value === null ||
                value === "" ||
                (Array.isArray(value) && value.length === 0)
            ) {
                continue;
            }


            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, item);
                });
            }


            else if (key.endsWith('_ids')) {
                formData.append(`${key}[0]`, value);
            }


            else {
                formData.append(key, value);
            }
        }

        // console.log("🟦 formData sent:", formData.toString());

        // const response = await fetchAPI(endPointKey, "GET", formData, {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     next: {
        //         revalidate: ApiConfig.revalidateTime,
        //         tags: [endPointKey],
        //     },
        // });

        // return response ?? { data: [] };
        return []
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        return { data: [] };
    }
};
