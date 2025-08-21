"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    Tag, 
    Package2, 
    Truck, 
    ShoppingCart,
    Calendar,
    Clock,
    Percent,
    DollarSign,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import styles from "./PromotionDetails.module.css";

const PromotionDetails = ({ id, lang, initialData, initialError, keyData }) => {
    const t = useTranslations("promotions");
    const locale = useLocale();
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(initialError);

    // Get type icon
    const getTypeIcon = (type) => {
        switch (type) {
            case "category":
                return <Tag size={24} />;
            case "product":
                return <Package2 size={24} />;
            case "shipping":
                return <Truck size={24} />;
            case "cart_total":
                return <ShoppingCart size={24} />;
            default:
                return <Tag size={24} />;
        }
    };

    // Get discount display
    const getDiscountDisplay = (discountType, discountValue) => {
        if (discountType === "fixed") {
            return (
                <div className={styles.discountValue}>
                    <DollarSign size={20} />
                    <span>{discountValue} IQD</span>
                </div>
            );
        } else if (discountType === "percentage") {
            return (
                <div className={styles.discountValue}>
                    <Percent size={20} />
                    <span>{discountValue}%</span>
                </div>
            );
        }
        return null;
    };

    // Get status display
    const getStatusDisplay = (status) => {
        if (status === "active") {
            return (
                <div className={styles.statusActive}>
                    <CheckCircle size={16} />
                    <span>{t("active")}</span>
                </div>
            );
        } else {
            return (
                <div className={styles.statusInactive}>
                    <AlertCircle size={16} />
                    <span>{t("inactive")}</span>
                </div>
            );
        }
    };

   
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <AlertCircle size={48} />
                <h2>{t("errorLoading")}</h2>
                <p>{t("errorMessage")}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>{t("loading")}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Hero Banner */}
            <motion.div 
                className={styles.hero}
                initial={{ opacity: 0.8, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className={styles.heroContent}>
                    {/* Desktop Layout */}
                    <div className={styles.heroLeft}>
                        <div className={styles.detailsColumn}>
                            <div className={styles.typeBadge}>
                                {getTypeIcon(data.type)}
                                <span>{t(data.type)}</span>
                            </div>
                            
                            <div className={styles.discountInfo}>
                                {getDiscountDisplay(data.discount_type, data.discount_value)}
                            </div>
                            
                            {data.min_cart_total > 0 && (
                                <div className={styles.minCartInfo}>
                                    <span className={styles.typeBadge}>{t("minCartTotal")}:
                                        
                                    <strong>
                                         {data.min_cart_total} IQD
                                    </strong>
                                         </span>
                                </div>
                            )}
                            
                            <div className={styles.statusInfo}>
                                {getStatusDisplay(data.status)}
                            </div>
                        </div>
                    </div>

                    {/* Center - Title and Icon */}
                    <div className={styles.heroCenter}>
                        <div className={styles.heroIcon}>
                            {getTypeIcon(data.type)}
                        </div>
                        <h1 className={styles.heroTitle}>
                            {data.title?.[lang] || data.title?.en || t("untitled")}
                        </h1>
                        <p className={styles.heroSubtitle}>
                            {data.discount_type === "percentage" 
                                ? `${t("discount")} ${data.discount_value}% ${t("available")}`
                                : `${t("fixedDiscount")} ${data.discount_value} ${t("available")}`
                            }
                        </p>
                    </div>

                    {/* Right Side - Duration */}
                    <div className={styles.heroRight}>
                        <div className={styles.durationInfo}>
                            <div className={styles.durationCard}>
                                <Calendar size={24} />
                                <div>
                                    <span className={styles.durationLabel}>{t("startDate")}</span>
                                    <span className={styles.durationValue}>
                                        {new Date(data.start_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                            
                            <div className={styles.durationCard}>
                                <Clock size={24} />
                                <div>
                                    <span className={styles.durationLabel}>{t("endDate")}</span>
                                    <span className={styles.durationValue}>
                                        {new Date(data.end_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                
                <div className={styles.heroDecoration}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
            </motion.div>

        
          
        </div>
    );
};

export default PromotionDetails;
