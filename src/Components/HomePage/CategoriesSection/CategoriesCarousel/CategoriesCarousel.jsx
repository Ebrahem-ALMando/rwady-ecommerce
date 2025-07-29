// import {getCategories} from "@/api/services/listCategories";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
// import React, {Suspense} from "react";
// import CircleSkeletonLoader
//     from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleSkeletonLoader/CircleSkeletonLoader";

const  CategoriesCarousel  = ({data,lang}) => {
    return (
        // <Suspense fallback={<CircleSkeletonLoader showTitle={true} count={6} />} >
            <CircleCartCarousel
                data={data}
                lang={lang}
                // initialError={initialError}
                isCategory={true}
                showName
                filterKey={"category_ids[]"}
            />
        // </Suspense>
    );
};

export default CategoriesCarousel