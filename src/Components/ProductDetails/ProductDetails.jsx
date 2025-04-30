"use client"
import styles from './ProductDetails.module.css'
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import React from "react";
import useSWR from "swr";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import ProductImages from "@/Components/ProductDetails/ProductImages/ProductImages";
import DetailsCard from "@/Components/ProductDetails/DetailsCard/DetailsCard";
import { motion } from "framer-motion";
import {products} from "@/Data/products";

const ProductDetails = ({ id, initialData, initialError, getData, keyData }) => {
    const { data, error, isLoading, mutate } =
        useSWR(keyData, () => getData(id), {
            fallbackData: initialData,
            revalidateOnMount: false,
            revalidateOnFocus: true,
        });

    if (isLoading && !data) return <Loading />;
    if (initialError || error) return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;

    const product = data

    if (!product || !product.id) return <EmptyState message="لم يتم العثور على المنتج" />;

    console.log(product)
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.imaContainer}>
                <ProductImages images={products[0].photos} />
            </div>
            <div className={styles.detailsContainer}>
                <DetailsCard product={product} />
            </div>
        </motion.div>
    );
};

export default ProductDetails;
