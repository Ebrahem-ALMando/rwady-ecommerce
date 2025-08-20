"use client"
import { motion } from "framer-motion";
import { 
    Gift, 
    Sparkles, 
    Calendar, 
    TrendingUp,
    ShoppingBag,
    Star,
    Heart,
    Zap
} from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./PromotionsEmptyState.module.css";

export default function PromotionsEmptyState() {
    const t = useTranslations("promotions");

    const floatingIcons = [
        { icon: <Gift size={24} />, delay: 0 },
        { icon: <Sparkles size={20} />, delay: 0.5 },
        { icon: <Star size={18} />, delay: 1 },
        { icon: <Heart size={22} />, delay: 1.5 },
        { icon: <Zap size={20} />, delay: 2 },
        { icon: <TrendingUp size={24} />, delay: 2.5 },
    ];

    return (
        <div className={styles.container}>
            {/* Background Animation */}
            <div className={styles.backgroundAnimation}>
                {floatingIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        className={styles.floatingIcon}
                        initial={{ 
                            opacity: 0, 
                            y: 20,
                            x: Math.random() * 100 - 50
                        }}
                        animate={{ 
                            opacity: [0, 1, 0], 
                            y: [-20, -100],
                            x: Math.random() * 200 - 100
                        }}
                        transition={{
                            duration: 3,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                        }}
                    >
                        {item.icon}
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <motion.div 
                className={styles.content}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Icon Container */}
                <motion.div 
                    className={styles.iconContainer}
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <div className={styles.mainIcon}>
                        <Gift size={80} />
                    </div>
                    <div className={styles.iconGlow}></div>
                </motion.div>

                {/* Text Content */}
                <motion.div 
                    className={styles.textContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className={styles.title}>
                        {t("noPromotions")}
                    </h2>
                    <p className={styles.subtitle}>
                        {t("noPromotionsSubtitle")}
                    </p>
                </motion.div>

                {/* Features List */}
                <motion.div 
                    className={styles.features}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className={styles.featureItem}>
                        <motion.div 
                            className={styles.featureIcon}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Calendar size={20} />
                        </motion.div>
                        <span>{t("feature1")}</span>
                    </div>
                    <div className={styles.featureItem}>
                        <motion.div 
                            className={styles.featureIcon}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ShoppingBag size={20} />
                        </motion.div>
                        <span>{t("feature2")}</span>
                    </div>
                    <div className={styles.featureItem}>
                        <motion.div 
                            className={styles.featureIcon}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <TrendingUp size={20} />
                        </motion.div>
                        <span>{t("feature3")}</span>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    <motion.button 
                        className={styles.ctaButton}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sparkles size={20} />
                        <span>{t("exploreProducts")}</span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className={styles.decorativeElements}>
                <motion.div 
                    className={styles.decorativeCircle}
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className={styles.decorativeCircle}
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.6, 0.3, 0.6]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: 2,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
}
