import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {getOffers} from "@/api/services/listOffers";
import {Suspense} from "react";

import ProductSliderSkeleton
    from "@/Components/Shared/SliderComponents/ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton";


const OffersListSection = () => {
    return (
       <Suspense fallback={<ProductSliderSkeleton/>}>
           <HorizontalProductSection
            dataPromise={getOffers}
            keyData={"offersList"}
            initTitle={"عروض و تخفيضات"}
            initLink={"/collections/offers-list"}
           />
       </Suspense>
    );
};
export default OffersListSection;
