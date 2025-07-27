"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '.././ProductCardSlider.module.css';

const ProductCardSkeleton = () => {
    return (
        <div className="p-2 pt-5">
            <div className={styles.card}>

                {/*<div className={`absolute top-2 left-0 `}>*/}
                {/*    <Skeleton width={60} height={24} />*/}
                {/*</div>*/}


                {/*<div className={`absolute top-2 right-0 `}>*/}
                {/*    <Skeleton width={60} height={24} />*/}
                {/*</div>*/}


                {/*<div className="absolute top-[-18px] left-1/2 -translate-x-1/2 z-50">*/}
                {/*    <div>*/}
                {/*        <Skeleton width={100} height={30} />*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="relative w-full  mt-3">
                    <div className={styles.productImgDiv}>
                        <Skeleton  height={320} width={250} />
                    </div>
                </div>


                <div className={styles.infoCard}>
                    <Skeleton width={80} height={16} className="mb-2" />
                    <Skeleton width="90%" height={18} />
                    <Skeleton width="60%" height={18} className="mt-2" />
                    <Skeleton width="50%" height={14} />

                    <div className="mt-3">
                        <Skeleton width="90%" height={16} />
                    </div>


                    <div className={styles.colorButtons}>
                        {Array(4).fill(0).map((_, i) => (
                            <Skeleton key={i} circle height={15} width={15} />
                        ))}
                    </div>


                    <div className="mt-3">
                        <Skeleton width="70%" height={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
