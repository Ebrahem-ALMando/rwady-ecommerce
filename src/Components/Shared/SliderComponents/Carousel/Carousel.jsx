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


    return (
        <AnimatePresence>
            <motion.div
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
                                <SafeImage
                                    src={slide.image_url}
                                    fallback="/Home/slider1.png"
                                    alt={slide.title?.[lang]}
                                    width={3000}
                                    height={3000}
                                    className="w-full object-cover rounded-lg max-h-[18rem] md:max-h-[22rem] lg:max-h-[27rem]"
                                    decoding="async"
                                    priority={true}
                                />

                                <div
                                    className="absolute inset-0 bg-opacity-50 flex flex-col items-end justify-center text-white text-right px-4 sm:px-8 pr-10 sm:pr-16 lg:mr-12 lg:gap-4"
                                    style={{zIndex: 10}}
                                >
                                    <h2 className="text-xl md:text-2xl md:text-3xl font-bold">{slide.title?.[lang]}</h2>
                                    <p className="text-base md:text-lg md:text-xl my-2">{slide.description?.[lang]}</p>

                                    <div className="relative w-full flex justify-end mt-4 mr-4 md:mr-10"
                                         style={{zIndex: 20}}>
                                        <Link href={slide.link || "#"}>
                                            <button
                                                className="bg-white text-blue-600 px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base hover:bg-gray-400 w-auto rounded-full lg:rounded-md"
                                                style={{position: "relative", zIndex: 30}}
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
