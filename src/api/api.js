import axios from "axios";
import ApiConfig from "@/api/apiConfig";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie";
const baseUrl = ApiConfig.API_BASE_URL;

axios.defaults.withXSRFToken = true;
const api = axios.create({
    baseURL:baseUrl,
    withXSRFToken: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    timeout: 10000,
});
api.interceptors.request.use((config) => {
    const lang = Cookies.get('language') || 'ar';
    config.headers['Accept-Language'] = lang;
    return config;
}, (error) => Promise.reject(error));

let serverAvailable = null;


const checkServerStatus = async () => {
    if (serverAvailable !== null) return serverAvailable; // إذا معروف سابقاً، لا تفحص مجدداً

    try {
        const res = await api.get("/settings", { timeout: 4000 });
        serverAvailable = true;
        return true;
    } catch (error) {
        serverAvailable = false;
        toast.error(" لا يمكن الاتصال بالخادم. يرجى التحقق من الاتصال ");
        console.error(" اتصال الخادم فشل:", error.message);
        return false;
    }
};

const fetchAPI = async (endpoint, method = "GET", data = null, options = {}) => {
    // const canConnect = await checkServerStatus();
    // if (!canConnect) throw new Error(" السيرفر غير متاح");
    try {

        // if (endpoint.startsWith("/")) {
        //     endpoint = endpoint.slice(1);
        // }

            const config = {
                url: endpoint,
                method,
                data,
                ...options,
            };


        if (data instanceof URLSearchParams) {
            config.headers = {
                ...config.headers,
                "Content-Type": "application/x-www-form-urlencoded",
            };
        } else if (data instanceof FormData) {
            config.headers = {
                ...config.headers,
                "Content-Type": "multipart/form-data",
            };
            config.timeout = 60000;
        }
            const response = await api(config);
        const startTime = Date.now();

        console.log(`⏱️ API [${endpoint}] استغرقت: ${Date.now() - startTime} ms`);

            if (response.status >= 400) {
                throw new Error(`Error: ${response.statusText} (${response.status})`);
            }

        return response.data;


    } catch (error) {
        const status = error.response?.status;
        const msg = error.response?.data?.message || error.message;
        if (status === 401) {
            Cookies.remove("token");
            Cookies.remove("user_id");
            if (typeof window !== "undefined") {
                toast.error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
                setTimeout(() => {
                    window.location.href = "/sign-in";
                }, 2000);
            }
        }
                console.error("Failed to fetch data:", msg);
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
