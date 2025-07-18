"use client";
import React from "react";
import styles from "./MovingProductsBarSlider.module.css";
import { sliderSettings } from "@/Components/Shared/SliderComponents/MovingProductsBarSlider/settings";
import { movingProducts } from "@/Data/movingProducts";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Slider from 'react-slick'
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {slugify} from "@/utils/slugify";
import Link from "next/link";
export default function MovingProductsBarSlider({ productsData, initialError = false, lang }) {
    if (initialError) {
        return <ReloadWithError />;
    }

    // const productsToShow = productsData.length > 0 ? productsData : movingProducts;
    const rawData = productsData.length > 0 ? productsData : movingProducts;
    const isSingleSlide = rawData.length === 1;
    const dataTemp = isSingleSlide ? [...rawData, ...rawData] : rawData;
    const finalSliderSettings = {
        ...sliderSettings,
        infinite: !isSingleSlide,
        arrows: false,
      };
    return (
        <div className={styles.mainDiv} aria-label="شريط المنتجات المقترحة" role="region">
            <Slider {...finalSliderSettings

            } aria-roledescription="قائمة شرائح المنتجات">
                {dataTemp.map((product) => {
                    const mainImageObj = product.media?.find((m) => m.type === 'image');
                    const mainImgSrc = mainImageObj?.url || '/FallbackProductImage.png';
                    const productName = product.name?.[lang] || "منتج";
                    return (

                                <div
                                    key={product.id}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: lang==='ar'?"row-reverse":"row",
                                            alignItems: "center",
                                        }}
                                        role="group"
                                        aria-label={`منتج: ${productName}`}
                                    >
                                        <Link
                                            prefetch={true}
                                            href={`${lang}/products/${product.id}/${slugify(product.name?.[lang] || "")}`}>
                                        <SafeImage
                                            fallback="/FallbackProductImage.png"
                                            loading="lazy"
                                            src={mainImgSrc}
                                            alt={`صورة ${productName}`}
                                            width={160}
                                            height={160}
                                            className="w-40 h-40 object-cover rounded-md "
                                            decoding="async"
                                        />
                                        </Link>
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
