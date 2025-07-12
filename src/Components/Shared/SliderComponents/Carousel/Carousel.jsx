"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Link from "next/link";
import {
    customNextArrowIcon,
    customPrevArrowIcon,
} from "@/utils/Icons";
import {
    sliderSettings,
} from "@/Components/Shared/SliderComponents/Carousel/config";
import { staticSlides } from "@/Data/topSlides";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Slider from "react-slick";


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

const Carousel = ({ dataList = [],lang }) => {

    const rawData = dataList.length > 0 ? dataList : staticSlides;
    const isSingleSlide = rawData.length === 1;
    const dataTemp = isSingleSlide ? [...rawData, ...rawData] : rawData;

    const settings = {
        ...sliderSettings,
        infinite: !isSingleSlide,
        arrows: !isSingleSlide,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        appendDots: (dots) =>
            !isSingleSlide ? (
                    <ul className={styles.slickDots}>
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

            ) : (
                <ul style={{ display: "none" }} />
            ),
        customPaging: (i) => <div className={styles.slickBtn} />,
    };
    const isRtl = lang === "ar";


    return (
        <AnimatePresence>
            <motion.div
                dir={lang === "ar" ? "rtl" : "ltr"}
                initial={{ opacity: 0.8, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className={`${styles.container} mx-auto mt-4 mb-[-50px]`}
            >
                <div>
                    <Slider {...settings}>
                        {dataTemp.map((slide, index) => (
                            <div key={index} className={styles.banner}>
                                <div className="relative w-full h-full">
                                    <SafeImage
                                        src={slide.image_url}
                                        fallback="/Home/slider1.png"
                                        alt={slide.title?.[lang]}
                                        width={3000}
                                        height={3000}
                                        decoding="async"
                                        priority={true}
                                        // className={`w-full h-full object-cover rounded-lg ${lang === 'en' ? 'scale-x-[-1]' : ''}`}
                                    />
                                </div>

                                <div
                                    className={`absolute inset-0 bg-opacity-50 flex flex-col justify-center text-white
                  ${isRtl ? 'items-end text-right pr-10 sm:pr-16 lg:mr-12' : 'items-start text-left pl-10 sm:pl-16 lg:ml-12'}
                  px-4 sm:px-8 lg:gap-4`}
                                    style={{ zIndex: 10 }}
                                >
                                    <h2 className={`text-xl md:text-2xl md:text-3xl font-bold ${styles.title}`}>
                                        {slide.title?.[lang]}
                                    </h2>

                                    <p className={`text-base md:text-lg md:text-xl my-2 ${styles.text}`}>
                                        {slide.description?.[lang]}
                                    </p>

                                    <div
                                        className={`relative w-full flex mt-4
                    ${isRtl ? 'justify-end mr-4 md:mr-10' : 'justify-start ml-4 md:ml-10'}
                    ${styles.btn}`}
                                        style={{ zIndex: 20 }}
                                    >
                                        <Link href={slide.link || "#"}>
                                            <button
                                                className="bg-white text-blue-600 px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base w-auto
                       rounded-full lg:rounded-md transition-all duration-300 ease-in-out min-w-[100px]
                       hover:bg-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-[2px]"
                                                style={{ position: "relative", zIndex: 30 }}
                                            >
                                                {slide.button_text?.[lang]}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Carousel;
