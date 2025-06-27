"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import { sliderSettings } from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../CircleCartCarousel.module.css";




const CircleSkeletonLoader = ({ count = 6, showTitle = false }) => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        prevArrow: <CustomArrows type="prev" />,
        nextArrow: <CustomArrows type="next" />,
        ...sliderSettings,
    };

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
        hidden: { opacity: 0.6, y: 0 },
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
            style={{
                margin: "auto auto 2rem auto",
                width: "95%",
                height: "auto",
                background: "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
                borderRadius: "16px",
                padding: "2rem 1rem",
            }}
        >
            <AnimatePresence>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >

                    <div className={styles.mobileVersion}>
                        <div className={styles.mobileGrid}>
                            {Array(count)
                                .fill(0)
                                .map((_, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className={styles.circleItem}
                                    >
                                        <div className={`${styles.imageWrapper} ${styles.imageWrapperLoader}`}>
                                            <Skeleton
                                                circle={true}
                                                height="100%"
                                                width="100%"
                                            />
                                        </div>
                                        {showTitle && (
                                            <Skeleton
                                                className={styles.titleLoader}
                                                height={20}
                                                width={80}
                                                style={{ marginTop: "0.5rem" }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                        </div>
                    </div>


                    <div className={styles.desktopVersion}>
                        <Slider {...settings}>
                            {Array(Math.max(count, 10)).fill(0)
                                .map((_, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className={styles.circleItem}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <Skeleton
                                                circle={true}
                                                height="100%"
                                                width="100%"
                                            />
                                        </div>
                                        {showTitle && (
                                            <Skeleton
                                                height={25}
                                                width={150}
                                                style={{ marginTop: "1rem" }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                        </Slider>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CircleSkeletonLoader;
