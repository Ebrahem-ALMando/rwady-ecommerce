"use client"
import React from "react";
import { motion } from "framer-motion";
import { Tag, Package2, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./CategoriesSection.module.css";

const CategoriesSection = ({ sectionResp, lang }) => {
    const t = useTranslations("promotions");
    const { data = [] } = sectionResp;

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.categoriesGrid}>
                {data.map((category, index) => (
                    <motion.div
                        key={category.id}
                        className={styles.categoryCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
                        }}
                    >
                        <div className={styles.categoryImage}>
                            <img 
                                src={category.image_url || "/images/Products/p1.jpeg"} 
                                alt={category.name?.[lang] || category.name?.en || "Category"}
                                onError={(e) => {
                                    e.target.src = "/images/Products/p1.jpeg";
                                }}
                            />
                            <div className={styles.categoryOverlay}>
                                <Tag size={24} />
                            </div>
                        </div>

                        <div className={styles.categoryContent}>
                            <h3 className={styles.categoryName}>
                                {category.name?.[lang] || category.name?.en || t("untitled")}
                            </h3>
                            
                            <div className={styles.categoryStats}>
                                <div className={styles.statItem}>
                                    <Package2 size={16} />
                                    <span>{category.products_count || 0} {t("product")}</span>
                                </div>
                                
                                <div className={styles.statItem}>
                                    <TrendingUp size={16} />
                                    <span>{category.orders || 0} {t("orders")}</span>
                                </div>
                            </div>

                            {category.promotion && (
                                <div className={styles.promotionInfo}>
                                    <div className={styles.discountBadge}>
                                        {category.promotion.discount_type === "fixed" ? (
                                            <>
                                                <span className={styles.discountValue}>
                                                    {category.promotion.discount_value}
                                                </span>
                                                <span className={styles.discountLabel}>
                                                    {t("fixed")}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className={styles.discountValue}>
                                                    {category.promotion.discount_value}%
                                                </span>
                                                <span className={styles.discountLabel}>
                                                    {t("percentage")}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesSection;
