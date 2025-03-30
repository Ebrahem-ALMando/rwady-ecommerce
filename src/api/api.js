import axios from "axios";
import ApiConfig from "@/api/apiConfig";
const baseUrl = ApiConfig.API_BASE_URL;

const api = axios.create({
    baseURL:baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

const fetchAPI = async (endpoint, method = "GET", data = null, options = {}) => {
    try {
        const response = await api({
            url: endpoint,
            method,
            data,
            ...options,
        });

        if (response.status >= 400) {
            throw new Error(`Error: ${response.statusText} (${response.status})`);
        }

        return response.data;
    } catch (error) {
        console.error("Failed to fetch data:", error.response?.data || error.message);
        throw error;
    }
};
// const fetchAPI = async (endpoint, options = {}) => {
//     try {
//         const res = await fetch(`${baseUrl}/${endpoint}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//
//             },
//             ...options,
//         });
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch data:', error);
//         throw error;
//     }
// };
const fetcher = (url) => api.get(url).then((res) => res.data);
export { fetchAPI,api,fetcher };
