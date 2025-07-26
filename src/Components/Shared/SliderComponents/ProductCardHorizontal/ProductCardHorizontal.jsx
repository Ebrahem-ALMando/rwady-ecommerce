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
import { Flame  } from 'lucide-react'
import {useLocale, useTranslations} from "next-intl";
import {slugify} from "@/utils/slugify";
import CartActionButton from "@/Components/Shared/Buttons/CartActionButton/CartActionButton";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";
import useFavourites from "@/hooks/useFavourites";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Slider from 'react-slick';
import { sliderSetting } from "@/Components/Shared/SliderComponents/ProductCardSlider/config";

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
    const [isAddToCart,setIsAddToCart] = useState(false);
    const cartRef = useRef();
    const { getItemQuantity} = useCart();
    const initialQty = getItemQuantity(product?.id) || 1;
    const [selectedQty, setSelectedQty] = useState(initialQty);

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
            setActiveImages(firstThree);
        }
    };

    const discountValue = getDiscount(product.price, product.price_after_discount);
    const isDiscountValid = product.price_after_discount < product.price;

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

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                {/* Discount Badge */}
                {product.discount_percentage_text?.[lang] && isDiscountValid && (
                    <div className={styles.saveSeller}>
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
                        {product.ribbon_text[lang]}
                    </div>
                )}

                {/* Timer */}
                {discountValue > 0 && isDiscountValid && time!=="NaNH : NaN M : NaN S"&&(
                    <div className={styles.timeBox}>
                        <div className={styles.time}>
                            <p className={styles.timeText}>
                                <span className={styles.timeIcon}>
                                    <Image width={16} height={16} src={'/images/img_8.png'} alt={'time'} />
                                </span>
                                {time}
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
                                        src={image.url}
                                        alt={product.name?.[lang] ? `${product.name[lang]} - ${index + 1}` : `Product Image ${index + 1}`}
                                        loading="lazy"
                                        className={styles.productImg}
                                        draggable={false}
                                        width={200}
                                        height={200}
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
                            width={200}
                            height={200}
                        />
                    )}

                    {/* Action Icons */}
                    <div className={styles.actionIcons}>
                        <div className={styles.iconContainer}>
                            <FavouriteToggleButton
                                liked={liked}
                                likedCount={likedCount}
                                onToggle={handleToggle}
                            />
                        </div>
                        <div className={styles.iconContainer}>
                            <p>{product.total_orders || 0}</p>
                            {salesNumIcon}
                        </div>
                    </div>
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
                                {ctr.name?.[lang]}
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
                            {product.price_after_discount || product.price} - IQD
                        </p>
                        {product.price_after_discount && (
                            <del className={styles.oldPrice}>{product.price} - IQD</del>
                        )}
                    </div>

                    {/* Installment Info */}
                    <p className={styles.installment}>
                        <span className={styles.installmentIcon}>
                            <img src={'/images/img_6.png'} alt="installment"/>
                        </span>
                        {t("pay_monthly", { price: Math.round((product.price_after_discount || product.price) / 10) })}
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
                        <CartActionButton
                            icon={shoppeIcon}
                            styles={styles}
                            btnClassName={styles.addToCart}
                            product={product}
                            setAddToCart={setIsAddToCart}
                            isAddToCart={isAddToCart}
                            selectedQty={selectedQty}
                            setSelectedQty={setSelectedQty}
                            ref={cartRef}
                            lang={lang}
                        />
                        {isAddToCart && (
                            <QuantityControl
                                className={styles.quantity}
                                stockUnlimited={product.stock_unlimited}
                                max={!product.stock_unlimited ? product.stock : 999}
                                productQTU={product.stock}
                                quantity={selectedQty}
                                onIncrement={() => cartRef.current?.increment()}
                                onDecrement={() => cartRef.current?.decrement()}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardHorizontal; 