"use client";

import styles from './ProductCardHorizontal.module.css';
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import { formatDuration } from "@/utils/formatDuration";
import Image from "next/image";
import { motion } from 'framer-motion';
import {getDiscount} from "@/utils/ProductsProc";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import {salesNumIcon, shoppeIcon} from "@/utils/Icons";
import useCart from "@/hooks/useCart";
import {checkAuthClient} from "@/utils/checkAuthClient";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import { Sparkles } from 'lucide-react'
import {useLocale, useTranslations} from "next-intl";
import {slugify} from "@/utils/slugify";
import CompactCartButton from "@/Components/Shared/Buttons/CompactCartButton/CompactCartButton";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";
import useFavourites from "@/hooks/useFavourites";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Slider from 'react-slick';
import { sliderSetting } from "@/Components/Shared/SliderComponents/ProductCardSlider/config";
import { getFinalPrice, getIsShowPrice } from "@/utils/priceCul";

const settings = {
    ...sliderSetting,
    infinite: false,
    dots: true,
    arrows: false,
    appendDots: dots => (
        <ul className={styles.slickDots}>
            {dots.map((dot, index) => (
                React.cloneElement(dot, {
                    key: index,
                    className: `${dot.props.className} ${
                        dot.props.className.includes("slick-active") ? styles.slickActive : styles.slickDot
                    }`
                })
            ))}
        </ul>
    )
};

const ProductCardHorizontal = ({ product, lang, setIsDraggingInsideCard }) => {

    const [activeImages, setActiveImages] = useState([]);
    const [time, setTime] = useState(formatDuration(product?.price_discount_start, product?.price_discount_end)||0);
    const { toggle, isFavourite, favourites } = useFavourites(true);
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(product.fav_num || 0);
    const t=useTranslations('productCard')
    const cartRef = useRef();
    const { getItemQuantity, addItem, removeItem, updateQuantity, getIsItemExisting, cart, isSyncing } = useCart();

  

    useEffect(() => {
        if (!product?.id || !Array.isArray(favourites)) return;

        const baseCount = product.fav_num || 0;
        const currentlyFav = isFavourite(product.id);

        setLiked(currentlyFav);
        setLikedCount(currentlyFav?1:0);

    }, [favourites, product.id]);


    const handleToggle = async () => {
        const res = await toggle(product.id);
        const isNowFav = res?.data?.is_favorite;
        setLiked(isNowFav);

        setLikedCount(isNowFav?1:0);
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(formatDuration(product.price_discount_start, product.price_discount_end));
        }, 1000);
        return () => clearInterval(timerId);
    }, [product.price_discount_start, product.price_discount_end]);

    const handleColorClick = (color) => {
        const colorImages = product.media?.filter(m => m.type === "image" && m.product_color_id === color.id) || [];
        const firstThree = colorImages.slice(0, 3);
        const currentUrls = activeImages.map(img => img.url);
        const newUrls = firstThree.map(img => img.url);

        if (JSON.stringify(currentUrls) !== JSON.stringify(newUrls)) {
            if (firstThree.length > 0) {
                setActiveImages(firstThree);
            }
        }
    };



    useEffect(() => {
        const images = product.media?.filter(m => m.type === "image").slice(0, 3) || [];
        setActiveImages(images);
    }, [product.media]);

    const dragTimerRef = useRef(null);
    const handleDisableDrag = () => {
        clearTimeout(dragTimerRef.current);
        dragTimerRef.current = setTimeout(() => {
            if (setIsDraggingInsideCard) setIsDraggingInsideCard(true);
        }, 250);
    };

    const handleEnableDrag = () => {
        clearTimeout(dragTimerRef.current);
        dragTimerRef.current = setTimeout(() => {
            if (setIsDraggingInsideCard) {
                setIsDraggingInsideCard(false);
            }
        }, 250);
    };
    const isDraggingNowRef = useRef(false);
    const router = useRouter();
    const finalPrice = getFinalPrice(product);
    const isShowPrice = getIsShowPrice(product);
    const discountValue = getDiscount(product.price, finalPrice);
    const isDiscountValid = finalPrice < product.price;
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                {/* Discount Badge */}
                {product.discount_percentage_text?.[lang] && isDiscountValid && finalPrice < product.price && (
                    <div className={styles.saveSeller}>
                        {/* <span className={styles.badgeIcon}>🔥</span> */}
                        {product.discount_percentage_text[lang]}
                    </div>
                )}

                {/* Ribbon Badge */}
                {product.ribbon_text?.[lang] && (
                    <div
                        className={styles.bestSeller}
                        style={{
                            background: product.ribbon_color?.length > 0 ? product.ribbon_color : undefined,
                        }}
                    >
                        {/* <span className={styles.badgeIcon}>⭐</span> */}
                        {product.ribbon_text[lang]}
                    </div>
                )}

                {/* Promotion Badge */}
                {product.promotion && product.promotion.status === "active" && (
                    <div className={`absolute ${product.ribbon_text?.[lang] ? "top-[35px]" : "top-3.5"} right-0 text-white font-bold ${styles.promotionBadge}`}>
                        <span className={styles.promotionIcon}>
                            <Sparkles size={16} />
                        </span>
                        <span className={styles.promotionText}>
                            {product.promotion.discount_type === "percentage" 
                                ? `${product.promotion.discount_value}%`
                                : `${product.promotion.discount_value} IQD`
                            }
                        </span>
                    </div>
                )}
                {/* Timer */}
                {discountValue > 0 && isDiscountValid && finalPrice < product.price && time!=="NaNH : NaN M : NaN S"&& product.price_discount_start!==null && product.price_discount_end!==null &&(
                    <div className={styles.timeBox}>
                        <div className={styles.time}>
                            <p className={styles.timeText}>
                                <span className={styles.timeIcon}>
                                    <Image width={16} height={16} src={'/images/img_8.png'} alt={'time'} />
                                </span>
                                {time}
                                <span className={styles.soonBadge}>SOON</span>
                            </p>
                        </div>
                    </div>
                )}

                {/* Product Image */}
                <div
                    onMouseEnter={handleDisableDrag}
                    onMouseLeave={handleEnableDrag}
                    onTouchStart={handleDisableDrag}
                    onTouchEnd={handleEnableDrag}
                    className={styles.imageContainer}
                    onClick={() => {
                        if (!isDraggingNowRef.current) {
                            router.push(`/${lang}/products/${product.id}/${slugify(product.name?.[lang] || "")}`);
                        }
                    }}
                    onMouseDown={() => {
                        isDraggingNowRef.current = false;
                    }}
                    onMouseMove={() => {
                        isDraggingNowRef.current = true;
                    }}
                    onTouchMove={() => {
                        isDraggingNowRef.current = true;
                    }}
                >
                    {activeImages?.length > 0 ? (
                        <Slider {...settings}>
                            {activeImages.map((image, index) => (
                                <div key={index}>
                                      <SafeImage
                                        fallback="/FallbackProductImage.png"
                                        src={image.url || "/FallbackProductImage.png"}
                                        alt={product.name?.[lang] ? `${product.name[lang]} - ${index + 1}` : `Product Image ${index + 1}`}
                                        loading="lazy"
                                        className={styles.productImg}
                                        draggable={false}
                                        width={280}
                                        height={240}
                                        // unoptimized={true}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <SafeImage
                            fallback="/FallbackProductImage.png"
                            src="/FallbackProductImage.png"
                            alt="Product Image"
                            loading="lazy"
                            className={styles.productImg}
                            draggable={false}
                            width={280}
                            height={240}
                            // unoptimized={true}
                        />
                    )}

                    {/* Action Icons */}
                    <div className={styles.actionIcons}>
                        <div 
                            className={styles.iconContainer}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleToggle();
                            }}
                        >
                           <FavouriteToggleButton
                                liked={liked}
                                likedCount={likedCount}
                                onToggle={handleToggle}
                                showcount={true}
                                showtext={false}
                                t={t}
                            />
                        </div>
                        <div className={styles.iconContainer}>
                            <p>({product.total_orders || 0})</p>
                            &nbsp;
                            {salesNumIcon}
                        </div>
                    </div>

                    {/* Image Overlay Gradient */}
                    <div className={styles.imageOverlay}></div>
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                    {/* Categories */}
                    <div className={styles.categories}>
                        {product.categories?.slice(0, 2).map((ctr, idx) => (
                            <span
                                key={idx}
                                className={styles.category}
                                title={ctr.name?.[lang]}
                            >
                                   {ctr.name?.[lang]?.length > 20
                            ? ctr.name?.[lang].slice(0,20) + "..."
                            : ctr.name?.[lang]}
                            </span>
                        ))}
                    </div>

                    {/* Product Title */}
                    <h3 className={styles.title} title={product.name?.[lang]}>
                        {product.name?.[lang]}
                    </h3>

                    {/* Price */}
                    <div className={styles.priceContainer}>
                        <p className={styles.price}>
                            {finalPrice} - IQD
                        </p>
                        {isShowPrice && (
                            <del className={styles.oldPrice}>{product.price} - IQD</del>
                        )}
                    </div>

                    {/* Installment Info */}
                    <p className={styles.installment}>
                        <span className={styles.installmentIcon}>
                            <img src={'/images/img_6.png'} alt="installment"/>
                        </span>
                        {t("pay_monthly", { price: Math.round((finalPrice) / 10) })}
                        {/* <span className={styles.starIcon}>*</span> */}
                    </p>

                    {/* Colors */}
                    {Array.isArray(product.colors) && product.colors.length > 0 && (
                        <div className={styles.colorButtons}>
                            {product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    style={{background: color.color}}
                                    className={styles.colorButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleColorClick(color);
                                    }}
                                    aria-label={`لون`}
                                    title={`لون ${color.name || 'متاح'}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Stock Info */}
                    {product.availability && (
                        <div className={styles.stockInfo}>
                            <span className={styles.stockIcon}>
                                <img src={'/images/img_7.png'} alt="stock"/>
                            </span>
                            {product.stock_unlimited
                                ? t('stock_unlimited')
                                : t('stock_limited', { count: product.stock })}
                        </div>
                    )}

                    {/* Cart Actions */}
                    <div className={styles.cartActions}>
                        <CompactCartButton
                            ref={cartRef}
                            product={product}
                            lang={lang}
                            addItem={addItem}
                            removeItem={removeItem}
                            updateQuantity={updateQuantity}
                            getItemQuantity={getItemQuantity}
                            getIsItemExisting={getIsItemExisting}
                            cart={cart}
                            isSyncing={isSyncing}
                            variant="compact"
                            size="medium"
                            showQuantityControls={true}
                            className={styles.horizontalCartBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardHorizontal; 