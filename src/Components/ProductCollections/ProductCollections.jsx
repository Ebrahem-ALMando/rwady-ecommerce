'use client';

import styles from './ProductCollections.module.css';
import React, {useEffect, useState} from 'react';
import useSWR from 'swr';
import Loading from '@/Components/Shared/Loading/Loading';
import Error from '@/Components/Shared/Error/Error';
import ProductCardSlider from '@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider';
import PaginationWrapper from '@/Components/Shared/PaginationWrapper/PaginationWrapper';
import {AnimatePresence,motion} from "framer-motion";
import useFavourites from "@/hooks/useFavourites";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import {getTokenWithClient} from "@/utils/getTokenWithClient";
import {useRouter} from "next/navigation";

const ProductCollections = ({ initialData, initialError, getData, keyData }) => {

    const isFavouriteSection = keyData === "favourites";
    const router = useRouter();
    if(isFavouriteSection){
        const token = getTokenWithClient()
        useEffect(() => {
            if (!token) {
                router.push('/sign-in');
            }
        }, [token]);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const {favouriteProducts }=useFavourites()

    const { data, error, isLoading, mutate } = useSWR(keyData, getData, {
        fallbackData: initialData,
        revalidateOnMount: false,
        revalidateOnFocus: true,

    });

    if (isLoading && !data) return <Loading />;
    if (initialError || error)
        return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;


    let fullDataList = isFavouriteSection ? favouriteProducts : (
        Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
                ? data.data
                : []
    );

    const totalItems = fullDataList.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedData = fullDataList.slice(startIndex, endIndex);

    return (
        <div className={styles.container}>


            <div className={styles.products}>
                {pagedData.length === 0 ? (
                    <EmptyState message="لا توجد منتجات لعرضها حالياً" />
                ) : (
                    typeof window !== "undefined" && (
                <AnimatePresence mode="wait">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.04,
                                },
                            },
                        }}
                        className={styles.items}
                    >
                        {pagedData.map((item, index) => (
                            <motion.div
                                key={item.id + '-' + index}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 25,
                                        scale: 0.95,
                                        rotate: -2,
                                        filter: "blur(6px)",
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        rotate: 0,
                                        filter: "blur(0px)",
                                        boxShadow: "0 0 20px rgba(0, 128, 255, 0.15)",
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -25,
                                        scale: 0.95,
                                        rotate: 2,
                                        filter: "blur(6px)",
                                    },
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 12,
                                    duration: 0.5,
                                }}
                            >
                                <ProductCardSlider
                                    key={item.id + '-' + index}
                                    product={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
                    ))
                }
            </div>


            <PaginationWrapper
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ProductCollections;
