"use client";
import React, {useEffect, useState} from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import { sliderSettings } from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import styles from "./CircleCartCarousel.module.css";
import Link from "next/link";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {groupFixedItems, groupItems} from "@/utils/groupItems";
import {
    containerVariants,
    itemVariants
} from "@/Components/Header/DropdownMenu/CategoryItems/CartCarousel/motionSetting";
import CircleSkeletonLoader
    from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleSkeletonLoader/CircleSkeletonLoader";

const CircleCartCarousel = (props) => {
    const { data = [], filterKey = "category_ids", initialError=false,showName,lang } = props;
    const [activeArrow, setActiveArrow] = useState(null);

    const dataList =data || [];

    const groups = groupFixedItems(dataList, 6);
    const hasData = groups.length > 0;
    const isSingleGroup = hasData && groups.length === 1 && groups[0].length <= 6;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {

        setIsClient(true);
    }, []);


     const settings = {
        ...sliderSettings,
        infinite: !isSingleGroup && dataList.length > 6 ,
        initialSlide: 0,
        arrows:true,

        // slidesToShow: Math.min(6, dataList.length),
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
                margin: "auto auto 2rem auto",
                width: "95%",
                height: "auto",
                // background:
                //     props.bgColor ||
                //     "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
                background:
                    props.bgColor ||
                    "",
                borderRadius: props.borderRadius || "16px",
                padding: props.isCategory ? 0 : "2rem 1rem",
            }}
        >
            <AnimatePresence>
                {hasData && isClient?
                    (
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
                                                    <div className={styles.imageWrapper}>
                                                        <Link href={`/${lang}/products?${filterKey}=${slide.id}`}
                                                              prefetch={true}>
                                                            <SafeImage
                                                                fallback="/images/fallbackCircle.png"
                                                                decoding="async"
                                                                width={200}
                                                                height={200}
                                                                src={slide?.image_url}
                                                                offOnerror={true}
                                                                alt={`${slide?.title?.[lang] || slide?.name?.[lang]} صورة`}
                                                                className={styles.image}
                                                            />
                                                        </Link>
                                                    </div>
                                                    {showName &&
                                                        <h3 className={styles.title}>{slide.title?.[lang] || slide.name?.[lang]}</h3>}
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
                                                <div className={styles.imageWrapper}>
                                                    <Link href={`/${lang}/products?${filterKey}=${slide.id}`}
                                                          prefetch={true}>
                                                        <SafeImage
                                                            fallback="/images/fallbackCircle.png"
                                                            decoding="async"
                                                            width={200}
                                                            height={200}
                                                            src={slide?.image_url}
                                                            offOnerror={true}
                                                            alt={`${slide?.title?.[lang] || slide?.name?.[lang]} صورة`}
                                                            className={styles.image}
                                                        />
                                                    </Link>
                                                </div>
                                                {showName &&
                                                    <h3 className={styles.title}>{slide.title?.[lang] || slide.name?.[lang]}</h3>}
                                            </motion.div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </motion.div>
                    )
                    :
                    <CircleSkeletonLoader/>
                    }
                    </AnimatePresence>
                    </div>
                    );
                };

export default CircleCartCarousel;
