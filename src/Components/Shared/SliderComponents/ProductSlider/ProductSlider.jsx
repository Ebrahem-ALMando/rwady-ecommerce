"use client";

import ProductCardSlider from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
import React, {useEffect, useRef, useState} from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import { products } from "@/Data/products";
import { sliderSettings } from "@/Components/Shared/SliderComponents/ProductSlider/settings";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ProductSlider.module.css";
import {useLocale} from "next-intl";
import ProductSliderSkeleton
    from "@/Components/Shared/SliderComponents/ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton";

const groupItems = (items, size) => {
    const groups = [];
    for (let i = 0; i < items.length; i += size) {
        groups.push(items.slice(i, i + size));
    }
    return groups;
};

const ProductSlider = ({ initialData, initialError }) => {
    const [activeArrow, setActiveArrow] = useState(null);
    const lang=useLocale()
    const handleArrowClick = (type) => {
        setActiveArrow(type);
    };

    if (initialError) return <ReloadWithError />;

    const dataList = Array.isArray(initialData)
        ? initialData
        : Array.isArray(initialData?.data)
            ? initialData.data
            : [];

    const tempData = dataList.length > 0 ? dataList : products;
    const [isDraggingInsideCard, setIsDraggingInsideCard] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {

        setIsClient(true);
    }, []);
    const settings = {
        ...sliderSettings,
        arrows: true,
        infinite: false,
        swipe: !isDraggingInsideCard,
        draggable: !isDraggingInsideCard,
        prevArrow: (
            <CustomArrows
                type="prev"
                activeArrow={activeArrow}
                onArrowClick={setActiveArrow}
            />
        ),
        nextArrow: (
            <CustomArrows
                type="next"
                activeArrow={activeArrow}
                onArrowClick={setActiveArrow}
            />
        ),
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0,
                staggerChildren: 0.03,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0.6, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.15, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.1, ease: "easeIn" },
        },
    };


    return (
        <div style={{ margin: "auto auto 2rem auto", width: "96%", paddingTop: "20px" }}>
            <AnimatePresence>
                {isClient ?
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">

                        <div className={styles.desktopVersion}
                        >
                            <Slider
                                {...settings}>
                                {tempData
                                    .slice()
                                    .reverse()
                                    .slice(0, 16)
                                    .map((slide, index) => (
                                        <motion.div key={slide.id + "-" + index} variants={itemVariants}>
                                            <ProductCardSlider
                                            key={slide.id + "-" + index}
                                                product={slide}
                                                lang={lang}
                                                setIsDraggingInsideCard={setIsDraggingInsideCard}
                                            />


                                        </motion.div>
                                    ))}
                            </Slider>
                        </div>


                        {/*<div className={styles.mobileVersion}>*/}
                        {/*    <Slider {...settings}>*/}
                        {/*        {groupItems(tempData.slice()*/}
                        {/*            .reverse()*/}
                        {/*            .slice(0, 16), 4).map((group, groupIndex) => (*/}
                        {/*            <div key={"group-" + groupIndex} className={styles.mobileGrid}>*/}
                        {/*                {group.map((product, index) => (*/}
                        {/*                    <ProductCardSlider key={product.id + "-m-" + index} product={product} />*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </Slider>*/}
                        {/*</div>*/}
                    </motion.div>
                    :
                    <ProductSliderSkeleton/>
                }
            </AnimatePresence>
        </div>
    );
};

export default ProductSlider;
