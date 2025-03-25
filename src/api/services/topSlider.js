import {fetchAPI} from "@/api/api";

export const getTopSlider=async ()=>{
    return await fetchAPI("top-sliders")
}
// export async function getProducts(options = {}) {
//     const res = await fetchAPI("/products", "GET", null, {
//         ...options,
//         next: { revalidate: 60, tags: ["products"] },
//     });
//
//     if (!res.ok) throw new Error("Failed to fetch products");
//
//     return res.json();
// }
