
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
// import {getBrands} from "@/api/services/listBrands";
import React, {Suspense} from "react";
// import CircleSkeletonLoader
//     from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleSkeletonLoader/CircleSkeletonLoader";
// import {getDataWithServer} from "@/utils/getDataWithServer";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import {getOrderData} from "@/utils/getOrderData";
// import CategoriesCarousel from "@/Components/HomePage/CategoriesSection/CategoriesCarousel/CategoriesCarousel";


// const  BrandsSection  = () => {
//
//     return (
//         <Suspense fallback={<CircleSkeletonLoader count={6} />} >
//             <BrandsDada />
//         </Suspense>
//     );
// };
//
// export default BrandsSection;
// async function BrandsDada()
// {
//     const {dataList,initialError}=await getDataWithServer(getBrands())
//     return(
//      <section>
//          <TitleSection initTitle="الماركات" />
//          <CircleCartCarousel
//              borderRadius={'10px'}
//              bgColor={"#0741ad"}
//              data={dataList}
//              initialError={initialError}
//              filterKey={"brand_ids"}
//          />
//      </section>
//     )
// }
const  BrandsSection  = ({sectionResp,lang}) => {
    const { title,show_title, data, show_more_path,can_show_more } = sectionResp;
    const orderData = getOrderData(sectionResp)

    return (
        <section>
            <TitleSection
                initTitle={"الماركات"}
                initLink={"/section/brands"}
                can_show_more={can_show_more}
                show_more={`/section/${show_more_path}`}
                show_title={show_title}
                title={title?.[lang]}
                lang={lang}
            />
            <CircleCartCarousel
                             borderRadius={'10px'}
                             bgColor={"#0741ad"}
                             data={orderData||[]}
                             lang={lang}
                             // initialError={initialError}
                             filterKey={"brand_ids[]"}
             />
        </section>
        );
    }
export default BrandsSection;