import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {Suspense} from "react";
import {getRecentAddedProducts} from "@/api/services/listRecentAddedProducts";
import ProductSliderSkeleton
    from "@/Components/Shared/SliderComponents/ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton";


const RecentlyAddedProductsSection = () => {
    return (
        <Suspense fallback={<ProductSliderSkeleton/>}>
            <HorizontalProductSection
                dataPromise={getRecentAddedProducts}
                keyData={"RecentlyAddedProductsList"}
                initTitle={"المضافة حديثاً"}
                initLink={"/collections/recently-added"}
            />
        </Suspense>
    );
};
export default RecentlyAddedProductsSection;
