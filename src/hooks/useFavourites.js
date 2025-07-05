// "use client";
//
// import useSWR from "swr";
// import { getFavourites } from "@/api/services/favouritesList";
// import { toggleFavourite } from "@/api/services/toggleFavourite";
// import { getTokenWithClient } from "@/utils/getTokenWithClient";
// import {useAuth} from "@/hooks/useAuth";
//
// const key = "favourites";
//
// export default function useFavourites() {
//
//     const {isAuthenticated}=useAuth()
//     const shouldFetch = isAuthenticated;
//
//     const { data, error, isLoading, mutate } = useSWR(
//         shouldFetch ? key : null,
//         shouldFetch ? () => getFavourites() : null,
//         {
//             fallbackData: { error: false, data: [] },
//             revalidateOnFocus: false,
//
//         }
//     );
//
//     const favourites = data?.data ?? [];
//     const favouriteProducts = favourites
//         .map(item => item.product)
//         .filter(p => p && p.id && p.name);
//
//     const isFavourite = (productId) => {
//         return favourites.some((item) => item.product_id === productId);
//     };
//
//     const handleToggleFavourite = async (productId) => {
//         try {
//             await toggleFavourite(productId);
//         } catch (err) {
//             console.error("Error toggling [Favourite]:", err.message);
//         }
//     };
//
//     return {
//         favourites,
//         favouriteProducts,
//         isLoading: shouldFetch ? isLoading : false,
//         isError: shouldFetch ? !!error : false,
//         isFavourite,
//         toggle: handleToggleFavourite,
//         mutateFavourites: mutate,
//     };
// }
// "use client";
//
// import useSWR from "swr";
// import { getFavourites } from "@/api/services/favouritesList";
// import { toggleFavourite } from "@/api/services/toggleFavourite";
// import { useAuth } from "@/hooks/useAuth";
//
// const key = "favourites";
//
// export default function useFavourites() {
//     const { isAuthenticated } = useAuth();
//     if(!isAuthenticated) return ;
//     const shouldFetch = isAuthenticated;
//     const { data, error, isLoading, mutate } = useSWR(
//         shouldFetch ? key : null,
//         getFavourites,
//         {
//             revalidateOnFocus: false,
//         }
//     );
//
//     console.log("data",data)
//     const favourites = Array.isArray(data) ? data : [];
//
//     const isFavourite = (productId) => {
//         return favourites.some((product) => product.id === productId);
//     };
//
//     const handleToggleFavourite = async (productId) => {
//         try {
//             await toggleFavourite(productId);
//             mutate();
//         } catch (err) {
//             console.error("Error toggling favourite:", err.message);
//         }
//     };
//
//     return {
//         favourites,
//         isFavourite,
//         toggle: handleToggleFavourite,
//         isLoading: shouldFetch ? isLoading : false,
//         isError: shouldFetch ? !!error : false,
//         mutateFavourites: mutate,
//     };
// }
"use client";

import useSWR from "swr";
import { getFavourites } from "@/api/services/Favourites/favouritesList";
import { toggleFavourite } from "@/api/services/Favourites/toggleFavourite";
import { useAuth } from "@/hooks/useAuth";

const key = "favourites";

export default function useFavourites(isEnabled = true) {
    const { isAuthenticated } = useAuth();

    const { data, error, isLoading, mutate } = useSWR(
        isEnabled && isAuthenticated ? key : null,
        isEnabled && isAuthenticated ? getFavourites : null,
        {
            revalidateOnFocus: false,
        }
    );

    const favourites = data?.data || [];

    const isFavourite = (productId) => {
        return favourites.some((product) => product.id === productId);
    };

    // const handleToggleFavourite = async (productId) => {
    //     try {
    //         await toggleFavourite(productId);
    //         mutate();
    //     } catch (err) {
    //         console.error("Error toggling favourite:", err.message);
    //     }
    // };
    const handleToggleFavourite = async (productId) => {
        try {
           const res= await toggleFavourite(productId);
            console.log(res)
            mutate(undefined,{revalidate:true})
            // mutate((prev) => {
            //     const exists = prev?.data?.some(p => p.id === productId);
            //     return {
            //         ...prev,
            //         data: exists
            //             ? prev.data.filter(p => p.id !== productId)
            //             : [...(prev?.data || []), { id: productId }],
            //     };
            // }, false);
        } catch (error) {
            console.error("Toggle Favourite err :", error);
        }
    };


    return {
        favourites,
        isFavourite,
        toggle: handleToggleFavourite,
        isLoading: isEnabled && isAuthenticated ? isLoading : false,
        isError: isEnabled && isAuthenticated ? !!error : false,
        mutateFavourites: mutate,
    };
}
