import axios from "axios";
import ApiConfig from "@/api/apiConfig";
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";
// axios.defaults.withXSRFToken = true;
const baseUrl = ApiConfig.API_BASE_URL;
const api = axios.create({
    baseURL:baseUrl,
    // withXSRFToken: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    timeout: 30000,
});
api.interceptors.request.use((config) => {
    const lang = Cookies.get('language') || 'ar';
    config.headers['Accept-Language'] = lang;
    return config;
}, (error) => Promise.reject(error));

let serverAvailable = null;
//
//
// const checkServerStatus = async () => {
//     if (serverAvailable !== null) return serverAvailable;
//
//     try {
//         const res = await api.get("/settings", { timeout: 4000 });
//         serverAvailable = true;
//         return true;
//     } catch (error) {
//         serverAvailable = false;
//         toast.error(" لا يمكن الاتصال بالخادم. يرجى التحقق من الاتصال ");
//         console.error(" اتصال الخادم فشل:", error.message);
//         return false;
//     }
// };
//
const fetchWithSenderAPI = async (endpoint, method = "GET", data = null, options = {}) => {
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
// // const fetchAPI = async (endpoint, options = {}) => {
// //     try {
// //         const res = await fetch(`${baseUrl}/${endpoint}`, {
// //             headers: {
// //                 'Content-Type': 'application/json',
// //
// //             },
// //             ...options,
// //         });
// //         const data = await res.json();
// //         return data;
// //     } catch (error) {
// //         console.error('Failed to fetch data:', error);
// //         throw error;
// //     }
// // };
// const fetcher = (url) => api.get(url).then((res) => res.data);
// export { fetchAPI,api,fetcher };


// 'use server'

// import {cookies} from "next/headers";




const timeoutFetch = (fetchPromise, timeout = 30000) => {
    return Promise.race([
        fetchPromise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
    ]);
};

const checkServerStatus = async () => {
    try {
        // const cookieStore = await cookies();
        const lang =/* cookieStore.get('language')?.value ||*/ 'ar';

        // const lang = Cookies.get('language') || 'ar';
        const res = await timeoutFetch(
            fetch(`${baseUrl}/settings`, {
                method: "GET",
                headers: {
                    "Accept-Language": lang,
                    "Content-Type": "application/json",
                },
            }),
            4000
        );
        if (!res.ok) throw new Error("Server not available");
        return true;
    } catch (error) {
        toast.error(" لا يمكن الاتصال بالخادم. يرجى التحقق من الاتصال ");
        console.error(" اتصال الخادم فشل:", error.message);
        return false;
    }
};

// const fetchAPI = async (endpoint, method = "GET", data = null, options = {}) => {
//     // const cookieStore = await cookies();
//     const lang =/* cookieStore.get('language')?.value ||*/ 'ar';
//
//     const url = `${baseUrl}${endpoint}`;
//     console.log(lang)
//     const headers = new Headers({
//         "Accept-Language": lang,
//     });
//
//     let body;
//     if (data instanceof URLSearchParams) {
//         headers.set("Content-Type", "application/x-www-form-urlencoded");
//         body = data.toString();
//     } else if (data instanceof FormData) {
//         body = data;
//     } else if (data && typeof data === "object" && method !== "GET") {
//         headers.set("Content-Type", "application/json");
//         body = JSON.stringify(data);
//     }
//
//     const fetchOptions = {
//         method,
//         headers,
//         ...options,
//     };
//
//     if (method !== "GET" && method !== "HEAD") {
//         fetchOptions.body = body;
//     }
//
//     try {
//         const response = await timeoutFetch(fetch(url, fetchOptions), body instanceof FormData ? 60000 : 30000);
//
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // Cookies.remove("token");
//                 // Cookies.remove("user_id");
//                 // cookieStore.remove("token");
//                 // cookieStore.remove("user_id");
//                 // const cookieStore =await cookies();
//                 // const response = new Response('تم حذف الكوكيز');
//                 // response.headers.set('Set-Cookie', [
//                 //     'token=; Path=/; HttpOnly; Max-Age=0',
//                 //     'user_id=; Path=/; HttpOnly; Max-Age=0',
//                 // ].join(', '));
//                 if (typeof window !== "undefined") {
//                     toast.error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
//                     setTimeout(() => {
//                         window.location.href = "/sign-in";
//                     }, 2000);
//                 }
//             }
//
//             const errorData = await response.json().catch(() => ({}));
//             const message = errorData.message || response.statusText || "حدث خطأ غير معروف";
//
//             console.error(`API Error: ${message}`);
//             return { error: true, message };
//         }
//
//         const dataResponse = await response.json();
//         return {
//             error: false,
//             data: Array.isArray(dataResponse?.data) ? dataResponse.data : []
//         };
//
//
//
//     } catch (error) {
//         console.error("Failed to fetch data:", error.message);
//         return { error: true, message: error.message || "حدث خطأ في الاتصال" };
//     }
// };

// const fetchAPI = async (endpoint, method = "GET", data = null, options = {}, config = { showError: true }) => {
//     const lang = 'ar';
//     const url = `${baseUrl}${endpoint}`;
//     const headers = new Headers({ "Accept-Language": lang });
//
//     let body;
//     if (data instanceof URLSearchParams) {
//         headers.set("Content-Type", "application/x-www-form-urlencoded");
//         body = data.toString();
//     } else if (data instanceof FormData) {
//         body = data;
//     } else if (data && typeof data === "object" && method !== "GET") {
//         headers.set("Content-Type", "application/json");
//         body = JSON.stringify(data);
//     }
//
//     const fetchOptions = {
//         method,
//         headers,
//         // credentials: "include",
//         // mode: 'no-cors',
//         // origin:true,
//         ...options,
//
//     };
//
//     if (method !== "GET" && method !== "HEAD") {
//         fetchOptions.body = body;
//     }
//
//     const startTime = Date.now();
//
//     try {
//         const timeout = body instanceof FormData ? 60000 : 30000;
//         const response = await timeoutFetch(fetch(url, fetchOptions), timeout);
//         const duration = Date.now() - startTime;
//         console.log(`⏱️ API [${endpoint}] استغرقت: ${duration} ms`);
//
//         if (!response.ok) {
//             if (response.status === 401 && typeof window !== "undefined") {
//                 if (config.showError) toast.error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
//                 setTimeout(() => {
//                     window.location.href = "/sign-in";
//                 }, 2000);
//             }
//
//             const errorData = await response.json().catch(() => ({}));
//             const message = errorData.message || response.statusText || "حدث خطأ غير معروف";
//             // if (config.showError) toast.error(message);
//             console.error(`API Error: ${message}`);
//             return { error: true, message };
//         }
//
//         const dataResponse = await response.json();
//         return {
//             error: false,
//             data: dataResponse?.data ?? dataResponse
//         };
//
//     } catch (error) {
//         // if (config.showError) toast.error(error.message || "حدث خطأ في الاتصال");
//         console.error("Failed to fetch data:", error.message);
//         return { error: true, message: error.message || "حدث خطأ في الاتصال" };
//     }
// };


const fetchAPI = async (
    endpoint,
    method = "GET",
    data = null,
    options = {},
    config = { showError: true },
    langParam=null
) => {
    // const lang = "ar";
    const url = `${baseUrl}${endpoint}`;
    const token = Cookies.get("token");
    const lang =langParam??( Cookies.get("NEXT_LOCALE")||"ar");
    // const lang=locale==="ar"?"en":"ar"
    const headers = new Headers({
        "Accept-Language": lang,
        ...(token && { Authorization: `Bearer ${token}` }),
    });

    let body;
    if (data instanceof URLSearchParams) {
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        body = data.toString();
    } else if (data instanceof FormData) {
        body = data;
    } else if (data && typeof data === "object" && method !== "GET") {
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(data);
    }

    const fetchOptions = {
        method,
        headers,
        ...options,
    };

    if (method !== "GET" && method !== "HEAD") {
        fetchOptions.body = body;
    }

    const startTime = Date.now();

    try {
        const timeout = body instanceof FormData ? 60000 : 30000;//30000
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
        clearTimeout(timeoutId);

        const duration = Date.now() - startTime;
        console.log(`⏱️ [${endpoint}] استغرقت ${duration}ms`);

        if (!response.ok) {
            // if (response.status === 401 && typeof window !== "undefined") {
            //     if (config.showError) toast.error("انتهت الجلسة، يرجى تسجيل الدخول من جديد");
            //     setTimeout(() => (window.location.href = "/sign-in"), 2000);
            // }

            const errorData = await response.json().catch(() => ({}));
            const message = errorData.message || response.statusText || "حدث خطأ غير معروف";
            if (config.showError) console.warn(message);
            return { error: true, message };
        }

        const responseData = await response.json();
        return {
            error: false,
            data: responseData?.data ?? responseData,
        };
    } catch (error) {
        if (config.showError) console.warn(error.message || "حدث خطأ في الاتصال");
        console.error(" fetchAPI error:", error.message);
        return { error: true, message: error.message || "حدث خطأ في الاتصال" };
    }
};


export { fetchAPI, checkServerStatus,fetchWithSenderAPI };

