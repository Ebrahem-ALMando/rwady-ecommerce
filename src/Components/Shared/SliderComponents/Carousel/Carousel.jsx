"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { getTopSlider } from "@/api/services/topSlider";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Link from "next/link";
import {
    customNextArrowIcon,
    customPrevArrowIcon,
    sliderArrowShape,
} from "@/utils/Icons";
import {
    sliderSettings,
    styleAppendDots,
} from "@/Components/Shared/SliderComponents/Carousel/config";
import { staticSlides } from "@/Data/topSlides";
import React from "react";
import Cookies from "js-cookie";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const CustomPrevArrow = (props) => (
    <button {...props} className={`${styles.prevArrow} ${styles.arrow}`}>
        {customPrevArrowIcon}
    </button>
);

const CustomNextArrow = (props) => (
    <button {...props} className={`${styles.nextArrow} ${styles.arrow}`}>
        {customNextArrowIcon}
    </button>
);

const Carousel = () => {
    const lang = Cookies.get('language') || 'ar';
    const { data, error, isLoading, mutate } = useSWR(["top-slider",lang], getTopSlider, {
        revalidateIfStale: false,
    });

    if (isLoading) return <Loading />;
    if (error)
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
    const rawData = Data.length > 0 ? Data : staticSlides;
    const isSingleSlide = rawData.length === 1;
    const dataTemp = isSingleSlide ? [...rawData, ...rawData] : rawData;

    const settings = {
        ...sliderSettings,
        infinite: !isSingleSlide,
        arrows: !isSingleSlide,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        appendDots: (dots) => (
            !isSingleSlide ? (
                <div style={styleAppendDots}>
                    <ul className={styles.slickDots}>
                        {sliderArrowShape}
                        <span className={styles.appendDotSpan}>
          {dots.map((dot, index) => {
              const isActive = dot.props.className.includes("slick-active");
              return React.cloneElement(dot, {
                  key: index,
                  className: `${dot.props.className} ${styles.slickDot} ${
                      isActive ? styles.slickActive : ""
                  }`,
              });
          })}
        </span>
                    </ul>
                </div>
            ) :  <ul style={{ display: "none" }} />
        ),

        customPaging: (i) => <div className={styles.slickBtn} />,
    };

    return (
        <div className={`${styles.container} mx-auto mt-4 rtl`}>
            <Slider {...settings}>
                {dataTemp.map((slide, index) => (
                    <div key={index} className="relative">
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
                            className={`absolute inset-0 bg-opacity-50 flex flex-col items-end justify-center text-white text-right p-8 ${styles.text}`}
                        >
                            <h2 className="text-3xl font-bold">{slide.title}</h2>
                            <p className={`blur-1 text-4xl my-2 ${styles.description}`}>
                                {slide.description}
                            </p>
                            <div className="w-full flex justify-end mr-20">
                                <Link href={slide.link || "#"}>
                                    <button className="mt-4 mr-5 bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-400 w-auto">
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
