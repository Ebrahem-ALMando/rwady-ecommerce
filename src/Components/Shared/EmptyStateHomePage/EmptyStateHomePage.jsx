"use client";
import { useTranslations } from "next-intl";
import { FolderOpen, AlertCircle, RefreshCw, Package, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import styles from "./EmptyStateHomePage.module.css";

const EmptyStateHomePage = ({ 
    title = "لا توجد أقسام لعرضها",
    subtitle = "عذراً، لا توجد أقسام متاحة حالياً",
    actionText = "تحديث الصفحة",
    showAction = true,
    type = "sections", // sections, products, categories, search, etc.
    customIcon = null
}) => {

    const getIcon = () => {
        if (customIcon) return customIcon;
        
        switch (type) {
            case 'sections':
                return <FolderOpen size={64} className={styles.icon} />;
            case 'products':
                return <Package size={64} className={styles.icon} />;
            case 'categories':
                return <ShoppingBag size={64} className={styles.icon} />;
            case 'search':
                return <Search size={64} className={styles.icon} />;
            case 'error':
                return <AlertCircle size={64} className={styles.icon} />;
            default:
                return <FolderOpen size={64} className={styles.icon} />;
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Animated background elements */}
                <div className={styles.backgroundElements}>
                    <div className={styles.floatingCircle}></div>
                    <div className={styles.floatingCircle}></div>
                    <div className={styles.floatingCircle}></div>
                    <div className={styles.floatingSquare}></div>
                    <div className={styles.floatingSquare}></div>
                </div>

                {/* Main content */}
                <div className={styles.mainContent}>
                    <div className={styles.iconContainer}>
                        {getIcon()}
                        <div className={styles.iconGlow}></div>
                    </div>

                    <h2 className={styles.title}>
                        {title}
                    </h2>

                    <p className={styles.subtitle}>
                        {subtitle}
                    </p>

                    {showAction && (
                        <div className={styles.actions}>
                            <button 
                                onClick={handleRefresh}
                                className={styles.refreshButton}
                            >
                                <RefreshCw size={20} />
                                {actionText}
                            </button>

                            {/* <Link href="/" className={styles.homeButton}>
                                العودة للرئيسية
                            </Link> */}
                        </div>
                    )}
                </div>

                {/* Decorative elements */}
                <div className={styles.decorativeElements}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>
        </div>
    );
};

export default EmptyStateHomePage;