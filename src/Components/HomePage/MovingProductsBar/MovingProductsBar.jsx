"use client";
import dynamic from "next/dynamic";
import React from "react";
import styles from "./MovingProductsBar.module.css";
import { sliderSettings } from "@/Components/HomePage/MovingProductsBar/settings";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { movingProducts } from "@/Data/movingProducts";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function MovingProductsBar({ keyData, getData, initialData, initialError }) {
    const { data, error, isLoading, mutate } = useSWR(keyData, getData, {
        fallbackData: initialData,
        revalidateOnMount: false,
        revalidateOnFocus: true,
        revalidateIfStale: true,
    });

    if (isLoading && !data) return <Loading />;
    if (initialError || error) return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;

    const dataList = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    const productsToShow = dataList.length > 0 ? dataList : movingProducts;

    return (
        <div className={styles.mainDiv} aria-label="شريط المنتجات المقترحة" role="region">
            <Slider {...sliderSettings} aria-roledescription="قائمة شرائح المنتجات">
                {productsToShow.map((product, index) => (
                    <div key={index}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                alignItems: "center",
                            }}
                            role="group"
                            aria-label={`منتج: ${product.name}`}
                        >
                            <SafeImage
                                fallback="/images/Products/p1.jpeg"
                                loading="lazy"
                                src={product.main_img}
                                alt={`صورة ${product.name}`}
                                width={160}
                                height={160}
                                className="w-40 h-40 object-cover rounded-md shadow-md"
                                decoding="async"
                            />

                            <p className="w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
                                {product.name}
                                <span className="block mr-5 text-blue-800 text-end font-bold mt-3">
                  {product.finalPrice} - IQD
                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}