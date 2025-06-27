"use client";
import React, { useState } from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import { sliderSettings } from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import styles from "./CircleCartCarousel.module.css";
import Link from "next/link";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";

const CircleCartCarousel = (props) => {
    const { data = [], filterKey = "category_ids", initialError=false,showName,lang } = props;
    const [activeArrow, setActiveArrow] = useState(null);

    const groupItems = (items, size) => {
        const groups = [];
        for (let i = 0; i < items.length; i += size) {
            groups.push(items.slice(i, i + size));
        }
        return groups;
    };


    const dataList =data || [];

    const groups = groupItems(dataList, 6);
    const hasData = groups.length > 0;
    const isSingleGroup = hasData && groups.length === 1 && groups[0].length <= 6;


     const settings = {
        ...sliderSettings,
        infinite: !isSingleGroup && dataList.length > 6 ,
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


    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0,
                staggerChildren: 0.06,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0.6, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.15, ease: "easeIn" },
        },
    };



    return (
        <div
            className={styles.main}
            style={{
                margin: "auto auto 2rem auto",
                width: "95%",
                height: "auto",
                background:
                    props.bgColor ||
                    "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
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
                                           <div className={styles.imageWrapper}>
                                               <Link href={`/products?${filterKey}=${slide.id}`} prefetch={false}>
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
                                                <Link href={`/products?${filterKey}=${slide.id}`} prefetch={false}>
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
            </AnimatePresence>
        </div>
    );
};

export default CircleCartCarousel;
