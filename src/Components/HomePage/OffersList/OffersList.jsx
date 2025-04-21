import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {getOffers} from "@/api/services/listOffers";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";


const OffersList = () => {
    return (
       <Suspense fallback={<Loading/>}>
           <HorizontalProductSection
            dataPromise={getOffers}
            keyData={"offersList"}
            initTitle={"عروض و تخفيضات"}
            initLink={"/collections/offers-list"}
           />
       </Suspense>
    );
};
export default OffersList;
