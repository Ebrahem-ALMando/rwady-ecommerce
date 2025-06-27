"use client";
import React from "react";
import styles from "./MovingProductsBarSlider.module.css";
import { sliderSettings } from "@/Components/Shared/SliderComponents/MovingProductsBarSlider/settings";
import { movingProducts } from "@/Data/movingProducts";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Slider from 'react-slick'
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";

export default function MovingProductsBarSlider({ productsData, initialError = false, lang }) {
    if (initialError) {
        return <ReloadWithError />;
    }

    const productsToShow = productsData.length > 0 ? productsData : movingProducts;

    return (
        <div className={styles.mainDiv} aria-label="شريط المنتجات المقترحة" role="region">
            <Slider {...sliderSettings} aria-roledescription="قائمة شرائح المنتجات">
                {productsToShow.map((product) => {
                    const mainImageObj = product.media?.find((m) => m.type === 'image');
                    const mainImgSrc = mainImageObj?.url || '/FallbackProductImage.png';
                    const productName = product.name?.[lang] || "منتج";
                    return (
                                <div key={product.id}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: lang==='ar'?"row-reverse":"row",
                                            alignItems: "center",
                                        }}
                                        role="group"
                                        aria-label={`منتج: ${productName}`}
                                    >
                                        <SafeImage
                                            fallback="/FallbackProductImage.png"
                                            loading="lazy"
                                            src={mainImgSrc}
                                            alt={`صورة ${productName}`}
                                            width={160}
                                            height={160}
                                            className="w-40 h-40 object-cover rounded-md shadow-md"
                                            decoding="async"
                                        />

                                        <p className="w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
                                            {productName}
                                            <span className="block mr-5 text-blue-800 text-end font-bold mt-3">
                                        {product.price_after_discount || product.price} - IQD
                                    </span>
                                        </p>
                                    </div>
                                </div>
                    );
                })}
            </Slider>
        </div>
    );
}
