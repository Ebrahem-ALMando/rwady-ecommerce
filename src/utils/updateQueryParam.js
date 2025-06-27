"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryFilterUpdater = () => {
    const router = useRouter();
    const searchParams = useSearchParams();


    const toggleQueryParam = (key, value) => {
        const current = searchParams.getAll(key);
        const updated = new Set(current);

        if (updated.has(value.toString())) {
            updated.delete(value.toString());
        } else {
            updated.add(value.toString());
        }

        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);
        updated.forEach(v => params.append(key, v));

        if (params.toString() === searchParams.toString()) return;

        router.push(`/products?${params.toString()}`);
    };


    const clearQueryParam = (key) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(key);

        if (params.toString() === searchParams.toString()) return;

        router.push(`/products?${params.toString()}`);
    };


    const resetAllQueryParams = () => {
        router.push(`/products`);
    };

    return {
        toggleQueryParam,
        clearQueryParam,
        resetAllQueryParams
    };
};
