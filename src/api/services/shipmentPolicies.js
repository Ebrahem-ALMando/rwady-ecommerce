import { fetchAPI } from "@/api/api";
import ApiConfig from "@/api/apiConfig";

export const getShipmentPolicies = async () => {
    "use server"
    try {

        const shipmentPolicies = await fetchAPI("shipment-policies", "GET", null, {
            next: {
                revalidate:ApiConfig.revalidateTime,
                tags: ["shipment-policies"],
            },
        });
        return shipmentPolicies??[];
    } catch (error) {
        console.error("Failed to fetch shipment-policies:", error.message);
        throw new Error("Failed to fetch shipment-policies");
    }
};
