"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import styles from "../VideoSection.module.css";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.06,
        },
    },
};

const skeletonItem = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const VideoSkeleton = () => {
    const baseColor = "#e0e0e0";
    const highlightColor = "#f1f0f0";
    return (
        <motion.div
            className={styles.videoBox}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={skeletonItem}>
                <Skeleton baseColor={baseColor} highlightColor={highlightColor} height="400px" width="100%" borderRadius="0.75rem" />
            </motion.div>
        </motion.div>
    );
};

export default VideoSkeleton;
