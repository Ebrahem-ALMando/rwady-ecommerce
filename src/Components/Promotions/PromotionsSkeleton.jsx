import { motion } from "framer-motion";
import styles from "./PromotionsSkeleton.module.css";

export default function PromotionsSkeleton() {
    return (
        <div className={styles.container}>
            {/* Hero Skeleton */}
            <motion.div 
                className={styles.heroSkeleton}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className={styles.heroContent}>
                    <div className={styles.heroIconSkeleton}></div>
                    <div className={styles.heroTitleSkeleton}></div>
                    <div className={styles.heroSubtitleSkeleton}></div>
                </div>
            </motion.div>

            {/* Section Header Skeleton */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleSkeleton}></div>
                <div className={styles.sectionSubtitleSkeleton}></div>
            </div>

            {/* Promotions Grid Skeleton */}
            <div className={styles.promotionsGrid}>
                {[...Array(6)].map((_, index) => (
                    <motion.div
                        key={index}
                        className={styles.promotionCardSkeleton}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: index * 0.1 
                        }}
                    >
                        {/* Type Badge Skeleton */}
                        <div className={styles.typeBadgeSkeleton}></div>

                        {/* Card Header Skeleton */}
                        <div className={styles.cardHeaderSkeleton}>
                            <div className={styles.titleSkeleton}></div>
                            <div className={styles.statusSkeleton}></div>
                        </div>

                        {/* Card Content Skeleton */}
                        <div className={styles.cardContentSkeleton}>
                            <div className={styles.discountSkeleton}>
                                <div className={styles.discountIconSkeleton}></div>
                                <div className={styles.discountDetailsSkeleton}>
                                    <div className={styles.discountValueSkeleton}></div>
                                    <div className={styles.discountLabelSkeleton}></div>
                                </div>
                            </div>
                            <div className={styles.minCartSkeleton}></div>
                        </div>

                        {/* Card Footer Skeleton */}
                        <div className={styles.cardFooterSkeleton}>
                            <div className={styles.footerContentSkeleton}>
                                <div className={styles.dateSectionSkeleton}>
                                    <div className={styles.dateItemSkeleton}></div>
                                    <div className={styles.dateItemSkeleton}></div>
                                </div>
                                <div className={styles.detailsButtonSkeleton}></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stats Skeleton */}
            <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {[...Array(4)].map((_, index) => (
                        <motion.div
                            key={index}
                            className={styles.statCardSkeleton}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: index * 0.2 
                            }}
                        >
                            <div className={styles.statIconSkeleton}></div>
                            <div className={styles.statContentSkeleton}>
                                <div className={styles.statNumberSkeleton}></div>
                                <div className={styles.statLabelSkeleton}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 