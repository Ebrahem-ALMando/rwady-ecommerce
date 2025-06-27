import React, {Suspense} from "react";
import {getTopSlider} from "@/api/services/topSlider";
import Carousel from "@/Components/Shared/SliderComponents/Carousel/Carousel";
import CarouselSkeleton from "@/Components/Shared/SliderComponents/Carousel/CarouselSkeleton/CarouselSkeleton";

const HeroCarouselSection =({sectionResp,lang}) =>
{
    // const data= getTopSlider;
    const data=sectionResp?.data||[]
    return(
       <section>
           <Carousel
               dataList={data}
               lang={lang}
           />
       </section>
        // <Suspense fallback={<CarouselSkeleton />}>
        //     <Carousel
        //         sectionResp={sectionResp}
        //     />
        //     {/*<CarouselGetServerData*/}
        //     {/*    getData={data}*/}
        //     {/*/>*/}
        // </Suspense>
    )
}

export default HeroCarouselSection;



// async function CarouselGetServerData ({getData})
// {
//     const data=await getData();
//
//     return (
//         // <div style={{width: '93%', height: '500px', background: 'blue'}}>
//         //
//         //     Welcome
//         //
//         // </div>
//         <Carousel
//                 data={data}
//             />
//
//     )
// }