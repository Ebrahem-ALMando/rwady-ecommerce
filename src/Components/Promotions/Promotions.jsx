"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getPromotions } from "@/api/services/promotions";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
    Calendar, 
    Clock, 
    Tag, 
    ShoppingCart, 
    Percent, 
    DollarSign,
    Sparkles,
    TrendingUp,
    Gift,
    Star,
    ArrowRight,
    Eye,
    Target,
    Package,
    FolderOpen,
    CheckCircle
} from "lucide-react";
import Error from "@/Components/Shared/Error/Error";
import PromotionsSkeleton from "./PromotionsSkeleton";
import styles from "./Promotions.module.css";

export default function Promotions() {
    const { lang } = useParams();
    const t = useTranslations("promotions");
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPromotions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getPromotions();
            
            if (response?.data) {
                setPromotions(response.data);
            } else {
                setPromotions([]);
            }
        } catch (err) {
            setError(err.message || "حدث خطأ في تحميل الحملات الترويجية");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getDiscountIcon = (discountType) => {
        return discountType === "percentage" ? <Percent size={20} /> : <DollarSign size={20} />;
    };

    const getTypeIcon = (type) => {
        return type === "category" ? <Tag size={20} /> : <ShoppingCart size={20} />;
    };

    const getStatusColor = (status) => {
        return status === "active" ? "#10b981" : "#ef4444";
    };

    const isExpired = (endAt) => {
        if (!endAt) return false;
        return new Date(endAt) < new Date();
    };

    const isUpcoming = (startAt) => {
        if (!startAt) return false;
        return new Date(startAt) > new Date();
    };

    const handlePromotionDetails = (promotion) => {
        // يمكن إضافة منطق الانتقال لصفحة تفاصيل الحملة
        console.log("تفاصيل الحملة:", promotion);
        // router.push(`/${lang}/promotions/${promotion.id}`);
    };

    if (loading) {
        return <PromotionsSkeleton />;
    }

    if (error) {
        return (
            <Error 
                onRetry={fetchPromotions}
                message={error}
            />
        );
    }

    return (
        <div className={styles.container}>
            {/* Hero Section */}
            <motion.div 
                className={styles.hero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.heroContent}>
                    <div className={styles.heroIcon}>
                        <Sparkles size={64} />
                    </div>
                    <h1 className={styles.heroTitle}>
                        {t("heroTitle")}
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {t("heroSubtitle")}
                    </p>
                </div>
                <div className={styles.heroDecoration}>
                    <div className={styles.floatingElement}></div>
                    <div className={styles.floatingElement}></div>
                </div>
            </motion.div>
            <motion.div 
                className={styles.statsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div className={styles.statsGrid}>
                    <div className={styles.statCard} style={{ backgroundColor: "#ecfdf5" }}>
                        <Target size={40} className={styles.statIcon} style={{ color: "#059669" }} />
                        <div className={styles.statContent}>
                            <span className={styles.statNumber}>{promotions.length}</span>
                            <span className={styles.statLabel}>{t("totalPromotions")}</span>
                        </div>
                    </div>
                    <div className={styles.statCard} style={{ backgroundColor: "#eff6ff" }}>
                        <CheckCircle size={32} className={styles.statIcon} style={{ color: "#3b82f6" }} />
                        <div className={styles.statContent}>
                            <span className={styles.statNumber}>
                                {promotions.filter(p => p.status === "active").length}
                            </span>
                            <span className={styles.statLabel}>{t("activePromotions")}</span>
                        </div>
                    </div>
                    <div className={styles.statCard} style={{ backgroundColor: "#fffbeb" }}>
                        <FolderOpen size={32} className={styles.statIcon} style={{ color: "#d97706" }} />
                        <div className={styles.statContent}>
                            <span className={styles.statNumber}>
                                {promotions.filter(p => p.type === "category").length}
                            </span>
                            <span className={styles.statLabel}>{t("categoryPromotions")}</span>
                        </div>
                    </div>
                    <div className={styles.statCard} style={{ backgroundColor: "#f5f3ff" }}>
                        <Package size={32} className={styles.statIcon} style={{ color: "#7c3aed" }} />
                        <div className={styles.statContent}>
                            <span className={styles.statNumber}>
                                {promotions.filter(p => p.type === "product").length}
                            </span>
                            <span className={styles.statLabel}>{t("productPromotions")}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Promotions Grid */}
            <div className={styles.promotionsSection}>
                {promotions.length > 0 && (
                    <motion.div 
                        className={styles.sectionHeader}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className={styles.sectionTitle}>
                            {t("availablePromotions")}
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            {t("sectionSubtitle")}
                        </p>
                    </motion.div>
                )}

                {promotions.length === 0 ? (
                    <motion.div 
                        className={styles.emptyState}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Gift size={64} className={styles.emptyIcon} />
                        <h3 className={styles.emptyTitle}>
                            {t("noPromotions")}
                        </h3>
                        <p className={styles.emptySubtitle}>
                            {t("noPromotionsSubtitle")}
                        </p>
                    </motion.div>
                ) : (
                    <div className={styles.promotionsGrid}>
                        {promotions.map((promotion, index) => (
                            <motion.div
                                key={promotion.id}
                                className={`${styles.promotionCard} ${
                                    isExpired(promotion.end_at) ? styles.expired : ""
                                } ${
                                    isUpcoming(promotion.start_at) ? styles.upcoming : ""
                                }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: 0.1 * index 
                                }}
                                whileHover={{ 
                                    y: -3,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {/* Type Badge */}
                                <div className={styles.typeBadge}>
                                    {getTypeIcon(promotion.type)}
                                    <span>{promotion.type === "category" ? t("category") : t("product")}</span>
                                </div>

                                {/* Card Header */}
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.promotionTitle}>
                                        {promotion.title[lang] || promotion.title.en}
                                    </h3>
                                    <div 
                                        className={styles.statusBadge}
                                        style={{ backgroundColor: getStatusColor(promotion.status) }}
                                    >
                                        {promotion.status === "active" ? t("active") : t("inactive")}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className={styles.cardContent}>
                                    <div className={styles.discountInfo}>
                                        <div className={styles.discountIcon}>
                                            {getDiscountIcon(promotion.discount_type)}
                                        </div>
                                        <div className={styles.discountDetails}>
                                            <span className={styles.discountValue}>
                                                {promotion.discount_value}
                                                {promotion.discount_type === "percentage" ? "%" : " د.ع"}
                                            </span>
                                            <span className={styles.discountLabel}>
                                                {promotion.discount_type === "percentage" ? t("discount") : t("fixedDiscount")}
                                            </span>
                                        </div>
                                    </div>

                                    {promotion.min_cart_total > 0 && (
                                        <div className={styles.minCartInfo}>
                                            <ShoppingCart size={16} />
                                            <span>
                                                {t("minCartTotal")}: {promotion.min_cart_total} د.ع
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className={styles.cardFooter}>
                                    <div className={styles.footerContent}>
                                        <div className={styles.dateSection}>
                                            {promotion.start_at && promotion.end_at ? (
                                                <div className={styles.dateInfo}>
                                                    <div className={styles.dateItem}>
                                                        <Calendar size={14} />
                                                        <span>{formatDate(promotion.start_at)}</span>
                                                    </div>
                                                    <div className={styles.dateItem}>
                                                        <Clock size={14} />
                                                        <span>{formatDate(promotion.end_at)}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.noExpiry}>
                                                    <Star size={14} />
                                                    <span>{t("noExpiry")}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <button 
                                            className={styles.detailsButton}
                                            onClick={() => handlePromotionDetails(promotion)}
                                        >
                                            <Eye size={16} />
                                            <span>{t("viewDetails")}</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Special Badges */}
                                {isExpired(promotion.end_at) && (
                                    <div className={styles.expiredBadge}>
                                        {t("expired")}
                                    </div>
                                )}
                                {isUpcoming(promotion.start_at) && (
                                    <div className={styles.upcomingBadge}>
                                        {t("upcoming")}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Section */}
         
        </div>
    );
} 