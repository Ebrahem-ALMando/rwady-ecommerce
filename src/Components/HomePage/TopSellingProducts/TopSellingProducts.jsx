import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {getTopSellingProducts} from "@/api/services/listTopSellingProducts";


const RecentlyAddedProducts = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <HorizontalProductSection
                dataPromise={getTopSellingProducts}
                keyData={"topSellingProducts"}
                initTitle={"الأكثر مبيعاً"}
                initLink={"/collections/top-selling"}
            />
        </Suspense>
    );
};
export default RecentlyAddedProducts;
