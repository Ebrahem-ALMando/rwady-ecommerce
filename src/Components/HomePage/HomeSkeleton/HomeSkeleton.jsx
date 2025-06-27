import CarouselSkeleton from "@/Components/Shared/SliderComponents/Carousel/CarouselSkeleton/CarouselSkeleton";
import React from "react";
import CircleSkeletonLoader
    from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleSkeletonLoader/CircleSkeletonLoader";
import VideoSkeleton from "@/Components/HomePage/PromoSection/VideoSection/VideoSkeleton/VideoSkeleton";
import MovingProductsBarSkeleton
    from "@/Components/Shared/SliderComponents/MovingProductsBarSlider/MovingProductsBarSkeleton/MovingProductsBarSkeleton";
import DownSliderSkeleton
    from "@/Components/HomePage/DownSliderSection/DownSlider/DownSliderSkeleton/DownSliderSkeleton";

const HomeSkeleton = () => {
    return(
        <section>
            <CarouselSkeleton />
            <CircleSkeletonLoader showTitle={true} count={6} />
            <VideoSkeleton/>
            <MovingProductsBarSkeleton />
            <DownSliderSkeleton/>
        </section>
    )
}
export default HomeSkeleton;