"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.07,
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

const VerifySkeleton = () => {
    const baseColor = "#e6e6e6";
    const highlightColor = "#f5f5f5";

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
                <motion.div variants={skeletonItem}>
                    <Skeleton
                        height={30}
                        width={140}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        style={{ marginBottom: "1rem" }}
                    />
                </motion.div>

                <motion.div variants={skeletonItem}>
                    <Skeleton
                        height={24}
                        width={`80%`}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        style={{ marginBottom: "2rem" }}
                    />
                </motion.div>

                <motion.div
                    variants={skeletonItem}
                    className="flex justify-center gap-3 mb-8"
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            width={64}
                            height={64}
                            borderRadius={12}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    ))}
                </motion.div>

                <motion.div variants={skeletonItem}>
                    <Skeleton
                        height={20}
                        width={160}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        style={{ marginBottom: "1.5rem" }}
                    />
                </motion.div>

                <motion.div variants={skeletonItem}>
                    <Skeleton
                        height={48}
                        width={`100%`}
                        borderRadius={12}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default VerifySkeleton;
