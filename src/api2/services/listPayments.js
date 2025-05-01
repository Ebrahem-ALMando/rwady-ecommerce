import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";


export const getListPayments = async () => {
    const endPointKey="list-payments"
    try {

        const ListPayments = await fetchAPI(endPointKey, "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: [endPointKey],

            },
        });

        return ListPayments??[];
    } catch (error) {
        console.error(`Failed to fetch ${endPointKey}:`, error.message);
        throw new Error(`Failed to fetch ${endPointKey}`);
    }
};
