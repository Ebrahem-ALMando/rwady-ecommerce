"use client";
import { useEffect, useRef, useState } from "react";
import styles from '../DetailsCard/DetailsCard.module.css';
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const ProductDescription = ({ description, lang }) => {
    const t = useTranslations('ProductDetails');
    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const descriptionRef = useRef(null);
    const COLLAPSED_HEIGHT = 60;

    useEffect(() => {
        if (descriptionRef.current) {
            const el = descriptionRef.current;
            const scrollHeight = el.scrollHeight;
            setContentHeight(scrollHeight);
            setShowToggle(scrollHeight > COLLAPSED_HEIGHT -5);
        }
    }, [description]);

    return (
        <>
            <p className={styles.textTitle}>{t("descriptionTitle")}</p>

            <motion.div
                className={styles.descriptionWrapper}
                animate={{ height: expanded ? contentHeight : COLLAPSED_HEIGHT }}
                initial={false}
                transition={{ duration: 0.4 }}
            >
                <div
                    ref={descriptionRef}
                    className={styles.descriptionText}
                    dangerouslySetInnerHTML={{
                        __html: description?.[lang] || `<p>${t("noDescription")}</p>`,
                    }}
                />
            </motion.div>

            {showToggle && (
                <button
                    type="button"
                    onClick={() => setExpanded(prev => !prev)}
                    className={styles.toggleButton}
                    aria-expanded={expanded}
                >
                    {expanded ? t("showLess") : t("showMore")}
                </button>
            )}
        </>
    );
};

export default ProductDescription;
