"use client";

import useSWR from "swr";
import { getFavourites } from "@/api/services/favouritesList";
import { toggleFavourite } from "@/api/services/toggleFavourite";
import { getTokenWithClient } from "@/utils/getTokenWithClient";

const key = "favourites";

export default function useFavourites() {
    const token = getTokenWithClient();

    const shouldFetch = !!token;

    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch ? key : null,
        shouldFetch ? () => getFavourites() : null,
        {
            fallbackData: { error: false, data: [] },
            revalidateOnFocus: false,

        }
    );

    const favourites = data?.data ?? [];
    const favouriteProducts = favourites
        .map(item => item.product)
        .filter(p => p && p.id && p.name);

    const isFavourite = (productId) => {
        return favourites.some((item) => item.product_id === productId);
    };

    const handleToggleFavourite = async (productId) => {
        try {
            await toggleFavourite(productId);
        } catch (err) {
            console.error("Error toggling [Favourite]:", err.message);
        }
    };

    return {
        favourites,
        favouriteProducts,
        isLoading: shouldFetch ? isLoading : false,
        isError: shouldFetch ? !!error : false,
        isFavourite,
        toggle: handleToggleFavourite,
        mutateFavourites: mutate,
    };
}
