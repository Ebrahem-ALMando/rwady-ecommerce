import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {getOffers} from "@/api/services/listOffers";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {getRecentAddedProducts} from "@/api/services/listRecentAddedProducts";


const RecentlyAddedProducts = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <HorizontalProductSection
                dataPromise={getRecentAddedProducts}
                keyData={"RecentlyAddedProductsList"}
                initTitle={"المضافة حديثاً"}
                initLink={"/collections/recently-added"}
            />
        </Suspense>
    );
};
export default RecentlyAddedProducts;
