// 'use client';
//
// import styles from './ProductCollections.module.css';
// import React, {useEffect, useState} from 'react';
// import useSWR from 'swr';
// import Loading from '@/Components/Shared/Loading/Loading';
// import Error from '@/Components/Shared/Error/Error';
// import ProductCardSlider from '@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider';
// import PaginationWrapper from '@/Components/Shared/PaginationWrapper/PaginationWrapper';
// import {AnimatePresence,motion} from "framer-motion";
// import useFavourites from "@/hooks/useFavourites";
// import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
// import {getTokenWithClient} from "@/utils/getTokenWithClient";
// import {useRouter} from "next/navigation";
// import {useAuth} from "@/hooks/useAuth";
//
// const ProductCollections = ({ initialData, initialError, getData, keyData }) => {
//
//
//     // const router = useRouter();
//     // if(isFavouriteSection){
//     //     const token = getTokenWithClient()
//     //     useEffect(() => {
//     //         if (!token) {
//     //             router.push('/sign-in');
//     //         }
//     //     }, [token]);
//     // }
//
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8;
//
//
//     const { favourites, isLoading: favLoading } = useFavourites();
//
//     const isFavouriteSection = keyData === "favourites";
//
//     if (isFavouriteSection && favLoading) {
//         return (
//             <div className={styles.container}>
//                 <ProductCardSkeleton />
//                 <ProductCardSkeleton />
//                 <ProductCardSkeleton />
//             </div>
//         );
//     }
//
//
//
//     // const { data, error, isLoading, mutate } = useSWR(keyData, getData, {
//     //     fallbackData: initialData,
//     //     revalidateOnMount: false,
//     //     revalidateOnFocus: true,
//     //
//     // });
//
//     // if (isLoading && !data) return <Loading />;
//     // if (initialError || error)
//     //     return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;
//
//
//     let fullDataList = isFavouriteSection ? favourites : (
//         Array.isArray(initialData)
//             ? initialData
//             : Array.isArray(initialData?.data)
//                 ? initialData.data
//                 : []
//     );
//     console.log(fullDataList)
//     const totalItems = fullDataList?.length;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pagedData = fullDataList?.slice(startIndex, endIndex);
//
//     return (
//         <div className={styles.container}>
//
//
//             <div className={styles.products}>
//                 {pagedData.length === 0 ? (
//                     <EmptyState message="لا توجد منتجات لعرضها حالياً" />
//                 ) : (
//                     typeof window !== "undefined" && (
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         variants={{
//                             visible: {
//                                 transition: {
//                                     staggerChildren: 0.08,
//                                     delayChildren: 0.04,
//                                 },
//                             },
//                         }}
//                         className={styles.items}
//                     >
//                         {pagedData.map((item, index) => (
//                             <motion.div
//                                 key={item.id + '-' + index}
//                                 variants={{
//                                     hidden: {
//                                         opacity: 0,
//                                         y: 25,
//                                         scale: 0.95,
//                                         rotate: -2,
//                                         filter: "blur(6px)",
//                                     },
//                                     visible: {
//                                         opacity: 1,
//                                         y: 0,
//                                         scale: 1,
//                                         rotate: 0,
//                                         filter: "blur(0px)",
//                                         boxShadow: "0 0 20px rgba(0, 128, 255, 0.15)",
//                                     },
//                                     exit: {
//                                         opacity: 0,
//                                         y: -25,
//                                         scale: 0.95,
//                                         rotate: 2,
//                                         filter: "blur(6px)",
//                                     },
//                                 }}
//                                 transition={{
//                                     type: "spring",
//                                     stiffness: 120,
//                                     damping: 12,
//                                     duration: 0.5,
//                                 }}
//                             >
//                                 <ProductCardSlider
//                                     key={item.id + '-' + index}
//                                     product={item} />
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </AnimatePresence>
//                     ))
//                 }
//             </div>
//
//
//             <PaginationWrapper
//                 totalItems={totalItems}
//                 itemsPerPage={itemsPerPage}
//                 onPageChange={(page) => setCurrentPage(page)}
//             />
//         </div>
//     );
// };
//
// export default ProductCollections;
'use client';

import styles from './ProductCollections.module.css';
import React, {useEffect, useMemo, useState} from 'react';
import ProductCardSlider from '@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider';
import PaginationWrapper from '@/Components/Shared/PaginationWrapper/PaginationWrapper';
import {AnimatePresence,motion} from "framer-motion";
import useFavourites from "@/hooks/useFavourites";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import ProductCardSkeleton
    from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSkeleton/ProductCardSkeleton";
import {
    mainDivMotion,
    itemMotionVariants,
    itemTransition,
} from "./productCardAnimations";
import {useLocale, useTranslations} from "next-intl";

const ProductCollections = ({ initialData, initialError, getData, keyData }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const isFavouriteSection = keyData === "favourites";

    const { favourites, isLoading: favLoading } = useFavourites(isFavouriteSection);
    // const [isClient, setIsClient] = useState(false);
    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    const fullDataList = useMemo(() => {
        if (isFavouriteSection) return favourites;
        if (Array.isArray(initialData)) return initialData;
        if (Array.isArray(initialData?.data)) return initialData.data;
        return [];
    }, [isFavouriteSection, favourites, initialData]);
    const totalItems = fullDataList?.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedData = fullDataList?.slice(startIndex, endIndex);
    const t=useTranslations('productCollections')
    if (isFavouriteSection && favLoading) {
        return (
            <div className={styles.products}>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
            </div>
        );
    }
    const lang=useLocale()
    return (
        <div className={styles.container}>

            <div className={styles.products}>
                {pagedData.length === 0 ? (
                  <div className="flex justify-center items-center h-full w-[83%] mx-auto">  
                  <EmptyState message={t("empty_products")} />
                  </div>
                ) : (
                    // isClient && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            {...mainDivMotion}
                            className={styles.items}
                        >
                            {pagedData.map((item, index) => (
                                <motion.div
                                    key={item.id + '-' + index}
                                    variants={itemMotionVariants}
                                    transition={itemTransition}
                                >
                                    <ProductCardSlider
                                        key={item.id + '-' + index}
                                        product={item}
                                        lang={lang}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )
                    // )
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
