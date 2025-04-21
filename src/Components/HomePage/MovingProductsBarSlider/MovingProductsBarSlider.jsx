import React, { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import MovingProductsBar from "@/Components/HomePage/MovingProductsBar/MovingProductsBar";
import { getRecommendProducts } from "@/api/services/listRecommendProducts";

const MovingProductsBarSlider = () => {
    const productDataPromise = getRecommendProducts();

    return (
        <Suspense fallback={<Loading />}>
            <MovingProductData dataPromise={productDataPromise} />
        </Suspense>
    );
};

export default MovingProductsBarSlider;

export async function MovingProductData({ dataPromise }) {
    let initialData = [];
    let initialError = false;

    try {
        const data = await dataPromise;
        initialData = data || [];
    } catch (error) {
        console.error("Failed to fetch recommended products:", error.message);
        initialError = true;
    }

    return (
        <MovingProductsBar
            initialData={initialData}
            initialError={initialError}
            getData={getRecommendProducts}
            keyData="recommendProducts"
        />
    );
}
