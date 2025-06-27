// import React, { Suspense } from "react";
// import Loading from "@/Components/Shared/Loading/Loading";
import MovingProductsBarSlider from "@/Components/Shared/SliderComponents/MovingProductsBarSlider/MovingProductsBarSlider";
// import { getRecommendProducts } from "@/api/services/listRecommendProducts";
// import MovingProductsBarSkeleton
//     from "@/Components/Shared/SliderComponents/MovingProductsBarSlider/MovingProductsBarSkeleton/MovingProductsBarSkeleton";

const MovingProductsBarSection = ({sectionResp,lang}) => {

    const productsData=sectionResp?.data||[]
    return (
        <section>
            <MovingProductsBarSlider
                productsData={productsData}
                lang={lang}
            />
        </section>
        // <Suspense fallback={<MovingProductsBarSkeleton />}>
        //     <MovingProductData  />
        // </Suspense>
    );
};

export default MovingProductsBarSection;

// async function MovingProductData() {
//
//     let productsData = [];
//     let initialError = false;
//
//     const products = await getRecommendProducts();
//     productsData = products || [];
//
//     if(productsData.error)
//     {initialError=true}
//
//     return (
//        <section>
//            <MovingProductsBarSlider
//                initialData={productsData}
//                initialError={initialError}
//            />
//        </section>
//     );
// }
