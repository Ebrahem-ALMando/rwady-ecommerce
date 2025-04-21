"use client";

import useSWR from "swr";
import { getFavourites } from "@/api/services/favouritesList";
import { toggleFavourite } from "@/api/services/toggleFavourite";

const key = "favourites";

export default function useFavourites() {

    const { data, error, isLoading, mutate } = useSWR(key, getFavourites, {
        fallbackData: [],
        revalidateOnFocus: true,
        revalidateOnMount:true,
        revalidateIfStale:true
    });

    const favourites = data?.data ?? [];
    const rawFavourites = favourites ?? [];
    const favouriteProducts = rawFavourites
        .map(item => item.product)
        .filter(p => p && p.id && p.name);

    const isFavourite = (productId) => {

        return favourites.some((item) => item.product_id === productId);
    };

    const handleToggleFavourite = async (productId) => {
        try {
            // const newFavourites = isFavourite(productId)
            //     ? favourites.filter((item) => item.id !== productId)
            //     : [...favourites, { id: productId }];

            // mutate(newFavourites, false);
            await toggleFavourite(productId);

            // await mutate(undefined, { revalidate: true });
        } catch (err) {
            console.error(" Error toggling [Favourite]:", err.message);
        }
    };


    return {
        favourites,
        favouriteProducts,
        isLoading,
        isError: !!error,
        isFavourite,
        toggle: handleToggleFavourite,
        mutateFavourites: mutate,
    };
}
