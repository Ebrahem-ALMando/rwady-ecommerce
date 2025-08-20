"use client"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PromotionsSkeleton.module.css";

export default function PromotionsSkeleton() {
    return (
        <div className={styles.container}>
            {/* Hero Skeleton */}
            <div className={styles.heroSkeleton}>
                <div className={styles.heroContent}>
                    <Skeleton 
                        circle 
                        width={80} 
                        height={80} 
                        className={styles.heroIconSkeleton}
                    />
                    <Skeleton 
                        height={32} 
                        width="60%" 
                        className={styles.heroTitleSkeleton}
                    />
                    <Skeleton 
                        height={20} 
                        width="40%" 
                        className={styles.heroSubtitleSkeleton}
                    />
                </div>
            </div>

            {/* Stats Section Skeleton */}
            <div className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={styles.statCardSkeleton}>
                            <Skeleton 
                                circle 
                                width={48} 
                                height={48} 
                                className={styles.statIconSkeleton}
                            />
                            <div className={styles.statContentSkeleton}>
                                <Skeleton 
                                    height={24} 
                                    width="60%" 
                                    className={styles.statNumberSkeleton}
                                />
                                <Skeleton 
                                    height={16} 
                                    width="80%" 
                                    className={styles.statLabelSkeleton}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Header Skeleton */}
            <div className={styles.sectionHeader}>
                <Skeleton 
                    height={28} 
                    width="40%" 
                    className={styles.sectionTitleSkeleton}
                />
                <Skeleton 
                    height={18} 
                    width="60%" 
                    className={styles.sectionSubtitleSkeleton}
                />
            </div>

            {/* Promotions Grid Skeleton */}
            <div className={styles.promotionsGrid}>
                {[...Array(8)].map((_, index) => (
                    <div key={index} className={styles.promotionCardSkeleton}>
                        {/* Type Badge Skeleton */}
                        <Skeleton 
                            height={24} 
                            width={80} 
                            className={styles.typeBadgeSkeleton}
                        />

                        {/* Card Header Skeleton */}
                        <div className={styles.cardHeaderSkeleton}>
                            <Skeleton 
                                height={20} 
                                width="70%" 
                                className={styles.titleSkeleton}
                            />
                            <Skeleton 
                                height={16} 
                                width={60} 
                                className={styles.statusSkeleton}
                            />
                        </div>

                        {/* Card Content Skeleton */}
                        <div className={styles.cardContentSkeleton}>
                            <div className={styles.discountSkeleton}>
                                <Skeleton 
                                    circle 
                                    width={32} 
                                    height={32} 
                                    className={styles.discountIconSkeleton}
                                />
                                <div className={styles.discountDetailsSkeleton}>
                                    <Skeleton 
                                        height={20} 
                                        width="50%" 
                                        className={styles.discountValueSkeleton}
                                    />
                                    <Skeleton 
                                        height={14} 
                                        width="70%" 
                                        className={styles.discountLabelSkeleton}
                                    />
                                </div>
                            </div>
                            <Skeleton 
                                height={16} 
                                width="100%" 
                                className={styles.minCartSkeleton}
                            />
                        </div>

                        {/* Card Footer Skeleton */}
                        <div className={styles.cardFooterSkeleton}>
                            <div className={styles.footerContentSkeleton}>
                                <div className={styles.dateSectionSkeleton}>
                                    <Skeleton 
                                        height={14} 
                                        width="45%" 
                                        className={styles.dateItemSkeleton}
                                    />
                                    <Skeleton 
                                        height={14} 
                                        width="45%" 
                                        className={styles.dateItemSkeleton}
                                    />
                                </div>
                                <Skeleton 
                                    height={36} 
                                    width={100} 
                                    className={styles.detailsButtonSkeleton}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 