import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {Suspense} from "react";
import {getTopSellingProducts} from "@/api/services/listTopSellingProducts";
import ProductSliderSkeleton
    from "@/Components/Shared/SliderComponents/ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton";


const TopSellingProductsSection = () => {
    return (
        <Suspense fallback={<ProductSliderSkeleton/>}>
            <HorizontalProductSection
                dataPromise={getTopSellingProducts}
                keyData={"topSellingProducts"}
                initTitle={"الأكثر مبيعاً"}
                initLink={"/collections/top-selling"}
            />
        </Suspense>
    );
};
export default TopSellingProductsSection ;
