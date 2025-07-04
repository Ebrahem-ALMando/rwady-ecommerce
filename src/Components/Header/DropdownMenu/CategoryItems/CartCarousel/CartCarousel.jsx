"use client";
import React, { useState } from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";

import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import styles from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel.module.css";
import Link from "next/link";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {groupItems} from "@/utils/groupItems";
import {
    containerVariants,
    itemVariants
} from "@/Components/Header/DropdownMenu/CategoryItems/CartCarousel/motionSetting";
import CategoryCard from "@/Components/Header/DropdownMenu/CategoryItems/CategoryCard/CategoryCard";
import {sliderSetting} from "@/Components/Header/DropdownMenu/CategoryItems/CartCarousel/SliderSetting";

const CartCarousel = (props) => {
    const { data = [], filterKey = "category_ids", initialError=false,showName,lang,selectedChild,setSelectedChild,handleSetProduct } = props;
    const [activeArrow, setActiveArrow] = useState(null);


    const dataList =data || [];

    const groups = groupItems(dataList, 6);
    const hasData = groups.length > 0;
    const isSingleGroup = hasData && groups.length === 1 && groups[0].length <= 6;


    const settings = {
        ...sliderSetting,
        infinite: !isSingleGroup && dataList.length > 6,
        initialSlide: 0,
        arrows:true,
        slidesToShow: Math.min(6, dataList.length),
        prevArrow: (
            <CustomArrows type="prev" activeArrow={activeArrow} onArrowClick={setActiveArrow} />
        ),
        nextArrow: (
            <CustomArrows type="next" activeArrow={activeArrow} onArrowClick={setActiveArrow} />
        ),
    };

    if (initialError)
    {return <ReloadWithError/>}



    return (
        <div
            className={styles.main}
            style={{
                width: "92%",
                height: "auto",
                background:
                    props.bgColor ||
                    "",
                borderRadius: props.borderRadius || "16px",
                padding: props.isCategory ? 0 : "2rem 1rem",
            }}
        >
            <AnimatePresence>
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <div className={styles.mobileVersion}>
                        <Slider {...settings}>
                            {groups.map((group, groupIndex) => (
                                <div key={groupIndex} className={styles.mobileGrid}>
                                    {group.map((slide, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className={styles.circleItem}
                                        >
                                            <CategoryCard
                                                id={slide.id}
                                                logo={slide.image_url}
                                                title={slide.name?.[lang]}
                                                category={slide}
                                                setSelectedChild={setSelectedChild}
                                                selectedChild={selectedChild}
                                                handleSetProduct={handleSetProduct}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            ))
                            }
                        </Slider>
                    </div>

                    <div className={styles.desktopVersion}>
                        <Slider {...settings}>
                            {
                                dataList.map((slide, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className={styles.circleItem}
                                    >
                                        <CategoryCard
                                            id={slide.id}
                                            logo={slide.image_url}
                                            title={slide.name?.[lang]}
                                            category={slide}
                                            setSelectedChild={setSelectedChild}
                                            selectedChild={selectedChild}
                                            handleSetProduct={handleSetProduct}
                                        />
                                    </motion.div>
                                ))
                            }
                        </Slider>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CartCarousel;
