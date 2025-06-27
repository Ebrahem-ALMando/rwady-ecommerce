"use client"
import styles from './ProductDetails.module.css'
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import React from "react";
import ProductImages from "@/Components/ProductDetails/ProductImages/ProductImages";
import DetailsCard from "@/Components/ProductDetails/DetailsCard/DetailsCard";
import { motion } from "framer-motion";
import {products} from "@/Data/products";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";

const ProductDetails = ({ id, initialData, initialError, keyData,lang }) => {

    if (initialError) return <ReloadWithError />;

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0.7, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.imaContainer}>
                {Array.isArray(initialData.media) && initialData.media.length > 0 && (
                    <ProductImages images={initialData.media} lang={lang} />
                )}
            </div>
            <div className={styles.detailsContainer}>
                <DetailsCard product={initialData} lang={lang} />
            </div>
        </motion.div>
    );
};

export default ProductDetails;
