"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import {getTopSlider} from "@/api/services/topSlider";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Link from "next/link";
import {customNextArrowIcon, customPrevArrowIcon, sliderArrowShape} from "@/utils/Icons";
import { sliderSettings, styleAppendDots} from "@/Components/Shared/SliderComponents/Carousel/config";
import {staticSlides} from "@/Data/topSlides";
import React from "react";
const Slider = dynamic(() => import("react-slick"), { ssr: false });


const CustomPrevArrow = ({ currentSlide,slideCount, ...props }) => (
    <button {...props}
            className={`
            ${styles.prevArrow} ${styles.arrow}`}>
        {customPrevArrowIcon}
    </button>
);

const CustomNextArrow = ({currentSlide, slideCount, ...props}) => (
    <button {...props}
            className={`
            ${styles.nextArrow} ${styles.arrow}`}>
        {customNextArrowIcon}
    </button>
);



const Carousel = () => {
    const settings = {
         ...sliderSettings,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>,

        appendDots: dots => (
            <div
                style={
                    styleAppendDots
                }
            >
                <ul className={
                    styles.slickDots
                }>
                    {sliderArrowShape}
                    <span className={styles.appendDotSpan}>
                       {dots.map((dot, index) => {
                           const isActive = dot.props.className.includes("slick-active");
                           return React.cloneElement(dot, {
                               key: index,
                               className: `${dot.props.className} ${styles.slickDot} ${isActive ? styles.slickActive : ""}`
                           });

                       })}
                    </span>
                </ul>
            </div>
        ),
        customPaging: i => (
            <div
                className={
                    styles.slickBtn
                }
            >
            </div>
        )
    };

    const { data, error, isLoading, mutate } = useSWR(
        "top-slider",
        getTopSlider,
        {
            revalidateIfStale:false
        }
    );

    const hasError = error;

    if (isLoading) return <Loading />;
    if (hasError)
        return (
            <Error
                onRetry={() =>
                    mutate(undefined, {
                        revalidate: true,
                    })
                }
            />
        );

    const Data = data?.data || [];
    const dataTemp=Data.length>0?Data:staticSlides

    
    return (
        <div
         className={`${styles.container}  mx-auto mt-4 rtl`}>
            <Slider {...settings}>
                {dataTemp?.map((slide) => (
                    <div key={slide.id} className="relative">
                        <SafeImage
                            src={slide.img}
                            fallback="/Home/slider1.png"
                            alt={slide.title}
                            width={2000}
                            height={2000}
                            className="w-full min-h-96 object-cover rounded-lg"
                            decoding="async"
                        />
                        <div
                            className={` absolute inset-0 bg-opacity-50 flex flex-col items-end justify-center text-white text-right p-8 ${styles.text}`}>
                            <h2 className="text-3xl font-bold">{slide.title}</h2>
                            <p className={`blur-1 text-4xl my-2  ${styles.description}`}>{slide.description}</p>
                            <div className="w-full flex justify-end mr-20">
                                <Link href={slide.link||"#"} >
                                    <button
                                        className=" mt-4 mr-5  bg-white text-blue-600 px-6 py-2 rounded-lg  hover:bg-gray-400 w-auto ">
                                        أبدأ تسوق الان
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;