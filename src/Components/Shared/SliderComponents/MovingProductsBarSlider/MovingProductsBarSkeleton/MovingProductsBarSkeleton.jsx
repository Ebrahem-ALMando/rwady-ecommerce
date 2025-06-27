"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../ProductSlider/ProductSliderSkeleton/ProductSliderSkeleton.module.css";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.03,
        },
    },
};

const cardVariants = {
    // hidden: { opacity: 1, y: 0 },
    // visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const MovingProductSkeletonCard = () => (
    <motion.div
        variants={cardVariants}
        style={{ display: "flex", alignItems: "center" }}
    >
        <Skeleton height={160} width={160} style={{ borderRadius: "8px" }} />
        <div className="w-40 text-center mt-2 px-2">
            <Skeleton height={20} width={100} style={{ marginBottom: 10 }} />
            <Skeleton height={16} width={80} />
        </div>
    </motion.div>
);

const MovingProductsBarSkeleton = () => {
    return (
        <div style={{ margin: "auto auto 2rem auto", width: "95%", paddingTop: "20px" }}>
            {/*<AnimatePresence>*/}
            {/*    <motion.div variants={containerVariants} initial="hidden" animate="visible">*/}
                    <div className={styles.skeletonWrapper}>
                        <div className={`${styles.cardWrapper} ${styles.show4}`}>
                            <MovingProductSkeletonCard />
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show3}`}>
                            <MovingProductSkeletonCard />
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show2}`}>
                            <MovingProductSkeletonCard />
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show1}`}>
                            <MovingProductSkeletonCard />
                        </div>
                    </div>
            {/*    </motion.div>*/}
            {/*</AnimatePresence>*/}
        </div>
    );
};

export default MovingProductsBarSkeleton;
