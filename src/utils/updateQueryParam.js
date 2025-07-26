"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const useQueryFilterUpdater = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const toggleQueryParam = (key, value, lang) => {
        // Convert key to array format (e.g., category_id -> category_ids[])
        const arrayKey = key.replace('_id', '_ids') + '[]';
        
        const current = searchParams.getAll(arrayKey);
        const updated = new Set(current);

        if (updated.has(value.toString())) {
            updated.delete(value.toString());
        } else {
            updated.add(value.toString());
        }

        const params = new URLSearchParams(searchParams.toString());
        params.delete(arrayKey);
        updated.forEach(v => params.append(arrayKey, v));

        if (params.toString() === searchParams.toString()) return;

        router.push(`/${lang}/products?${params.toString()}`);
    };

    const setPriceRange = (min, max, lang) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (min > 0) {
            params.set('price_min', min.toString());
        } else {
            params.delete('price_min');
        }
        
        if (max < 100000) {
            params.set('price_max', max.toString());
        } else {
            params.delete('price_max');
        }

        if (params.toString() === searchParams.toString()) return;

        router.push(`/${lang}/products?${params.toString()}`);
    };

    const clearQueryParam = (key) => {
        const arrayKey = key.replace('_id', '_ids') + '[]';
        const params = new URLSearchParams(searchParams.toString());
        params.delete(arrayKey);

        if (params.toString() === searchParams.toString()) return;

        router.push(`/products?${params.toString()}`);
    };

    const resetAllQueryParams = () => {
        router.push(`/products`);
    };

    return {
        toggleQueryParam,
        setPriceRange,
        clearQueryParam,
        resetAllQueryParams
    };
};
