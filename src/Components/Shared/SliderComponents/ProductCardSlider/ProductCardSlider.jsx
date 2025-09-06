"use client";
import styles from './ProductCardSlider.module.css';
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import { sliderSetting } from "@/Components/Shared/SliderComponents/ProductCardSlider/config";
import { formatDuration } from "@/utils/formatDuration";
import Image from "next/image";
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import {getDiscount} from "@/utils/ProductsProc";
import {useRouter} from "next/navigation";
import {salesNumIcon, shoppeIcon    } from "@/utils/Icons";
import useCart from "@/hooks/useCart";
import {useTranslations} from "next-intl";
import {slugify} from "@/utils/slugify";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";
import useFavourites from "@/hooks/useFavourites";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import { Sparkles } from 'lucide-react';
import CompactCartButton from "@/Components/Shared/Buttons/CompactCartButton/CompactCartButton";
import { getFinalPrice, getIsShowPrice } from "@/utils/priceCul";
const settings = {
    ...sliderSetting,
    infinite: false,
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


const ProductCardSlider = ({ product, lang, setIsDraggingInsideCard }) => {

    const [activeImages, setActiveImages] = useState( []);
    const [time, setTime] = useState(formatDuration(product?.price_discount_start, product?.price_discount_end)||0);


    const { toggle, isFavourite, favourites } = useFavourites(true);

    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(product.fav_num || 0);
    const t=useTranslations('productCard')



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



    const cartRef = useRef();
    const { getItemQuantity, addItem, removeItem, updateQuantity, getIsItemExisting, cart, isSyncing } = useCart();

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
        const isDiscountValid = finalPrice < product.price    ; 

return (
        <div className={`p-2 pt-5 ${styles.cardDiv}`}>
            <div className={styles.card}>
                {product.discount_percentage_text?.[lang] && isDiscountValid && finalPrice < product.price && (
                    <div className={`absolute top-2 left-0 text-white font-bold ${styles.saveSeller}`}>
                        {product.discount_percentage_text[lang]}
                    </div>
                )}


                {product.ribbon_text?.[lang] && (
                    <div
                        className={`absolute top-2 right-0 text-white font-bold ${styles.bestSeller}`}
                        style={{
                            background: product.ribbon_color?.length > 0 ? product.ribbon_color : undefined,
                        }}
                    >
                        {product.ribbon_text[lang]}
                    </div>
                )}

                {/* Promotion Badge */}
                {product.promotion && product.promotion.status === "active" && (
                    <div className={`absolute ${product.discount_percentage_text?.[lang] && isDiscountValid && time!=="NaNH : NaN M : NaN S" ? "top-[55px]" : "top-3.5"} left-0 text-white font-bold ${styles.promotionBadge}`}>
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


                {discountValue > 0 && isDiscountValid && finalPrice < product.price && time!=="NaNH : NaN M : NaN S"&& product.price_discount_start!==null && product.price_discount_end!==null && (
                    <div className={`absolute top-[-17px] left-1/2 -translate-x-1/2 z-50 ${styles.timeBox}`}>
                        <div className={styles.time}>
                            <p className={styles.timeText}>
                                <span className={styles.timeIcon}>
                                    <Image width={25} height={25} src={'/images/img_8.png'} alt={'time'} />
                                </span>
                                {time}  
                            </p>
                        </div>
                    </div>
                )}


                <div
                    onMouseEnter={handleDisableDrag}
                    onMouseLeave={handleEnableDrag}
                    onTouchStart={handleDisableDrag}
                    onTouchEnd={handleEnableDrag}
                    className={`relative w-full h-[300px] mt-3 ${styles.imgCont}`}>
                    <Slider

                        {...settings}
                        // onMouseEnter={handleDisableDrag}
                        // onMouseLeave={handleEnableDrag}
                        // onTouchStart={handleDisableDrag}
                        // onTouchEnd={handleEnableDrag}
                    >
                        {activeImages?.length > 0 ? (

                            activeImages?.map((image, index) => (
                                <div key={index}
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
                                     onTouchStart={() => {
                                         isDraggingNowRef.current = false;
                                     }}
                                     onTouchMove={() => {
                                         isDraggingNowRef.current = true;
                                     }}

                                >
                                    <motion.div
                                        className={styles.productImgDiv}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <SafeImage 
                                            fallback="/FallbackProductImage.png"
                                            src={image.url || "/FallbackProductImage.png"}
                                            alt={product.name?.[lang] ? `${product.name[lang]} - ${index + 1}` : `Product Image ${index + 1}`}
                                            loading="lazy"
                                            className={styles.productImg}
                                            draggable={false}
                                            width={300}
                                            height={300}
                                            unoptimized={true}
                                        
                                          
                                        />  
                                    </motion.div>
                                </div>
                            ))
                        ) : (

                            <div>
                                <motion.div
                                    className={styles.productImgDiv}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SafeImage
                                        fallback="/FallbackProductImage.png"
                                        src="/FallbackProductImage.png"
                                        alt="Product Image"
                                        loading="lazy"
                                        className={styles.productImg}
                                        draggable={false}
                                        width={300}
                                        height={300}
                                        unoptimized={true}                                      
                                    />
                                </motion.div>
                            </div>
                        )}


                    </Slider>

                    <div className={`absolute flex flex-col gap-2 ${styles.icons}`}
                         style={{bottom: '-20px', left: '10px'}}>
                        <div className={styles.iconImage}>
                            <FavouriteToggleButton
                                liked={liked}
                                likedCount={likedCount}
                                onToggle={handleToggle}
                                showcount={true}
                                showtext={false}
                                t={t}
                            />
                        </div>
                        <div className={styles.iconImage}>
                            <p>
                                ({product.total_orders || 0})
                            </p>
                            {salesNumIcon}
                        </div>
                    </div>
                </div>

                <Link prefetch={true} href={`/${lang}/products/${product.id}/${slugify(product.name?.[lang] || "")}`}>
                    <div className={styles.infoCard}>
                        <div className={`flex flex-wrap gap-2 mt-3 mb-1 max-w-[100%]`}>
                            {product.categories?.slice(0, 2).map((ctr, idx) => (
                                <span
                                    key={idx}
                                    className={`bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full whitespace-nowrap ${styles.categ}`}
                                    title={ctr.name?.[lang]}
                                >
                          {ctr.name?.[lang]?.length > 20
                            ? ctr.name?.[lang].slice(0,20) + "..."
                            : ctr.name?.[lang]}
                        </span> 
                            ))}
                        </div>
                        {/*{product.brand?.name && (*/}
                        {/*    <div className="mb-2">*/}
                        {/*        <span className={styles.brand}>{product.brand.name}</span>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        <h3
                            className={styles.title}
                            title={product.name?.[lang]}
                        >
                            {product.name?.[lang]}
                        </h3>

                        <p className={styles.price}>
                            {finalPrice} - IQD
                            <span className={styles.priceText}>&nbsp;</span>
                            {isShowPrice && (
                                <del className={styles.oldPrice}>{product.price} - IQD</del>
                            )}
                        </p>

                        {/* Waite Implement Aksat Service */}
                        {/* {product.stock > 0 || product.stock_unlimited && ( */}
                            <p className={styles.available}>
                              <span className={styles.availableIcon}>
                                <img src={'/images/img_6.png'} alt="available"/>
                              </span>
                                {t("pay_monthly", { price: Math.round((finalPrice) / 10) })
                            }
                            </p>
                        {/* )} */}
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
                        {product.availability ? (
                            <div className={styles.outherDetails}>
                                <p className={styles.remaining}>
                                  <span className={styles.remainingIcon}>
                                    <img src={'/images/img_7.png'} alt="remaining"/>
                                  </span>
                                    {product.stock_unlimited
                                        ? t('stock_unlimited')
                                        : t('stock_limited', { count: product.stock })}
                                </p>
                            </div>
                        ) : (
                            <></>
                            // <div className={styles.outherDetails}>
                            //     <p className={`${styles.remaining}`}>
                            //   <span className={styles.remainingIcon}>
                            //     <img src={'/images/img_7.png'} alt="remaining"/>
                            //   </span>
                            //         غير متوفر حالياً
                            //     </p>
                            // </div>
                        )}


                    </div>
                </Link>
              
                <div className={styles.cartButtonWrapper}>
                    <div className={styles.desktopCartButton}>
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
                        className={styles.compactCartBtn}
                    />
                    </div>
                     <div className={styles.mobileCartButton}>
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
                        variant="minimal"
                        size="small"
                        showQuantityControls={true}
                        className={styles.compactCartBtn}
                    />
                  
                     </div>
                </div>
                {/*    <CartActionButton*/}
                {/*        icon={shoppeIcon}*/}
                {/*        styles={styles}*/}
                {/*        btnClassName={styles.addToCart}*/}
                {/*        product={product}*/}
                {/*        setAddToCart={setIsAddToCart}*/}
                {/*        isAddToCart={isAddToCart}*/}
                {/*        selectedQty={selectedQty}*/}
                {/*        setSelectedQty={setSelectedQty}*/}
                {/*        ref={cartRef}*/}
                {/*        lang={lang}*/}
                {/*    />*/}
                {/*    /!*<motion.button*!/*/}
                {/*    /!*    disabled={product.stock <= 0 || !product.stock}*!/*/}
                {/*    /!*    onClick={handleToggleToCart}*!/*/}
                {/*    /!*    className={`${styles.addToCart} ${product.quantity <= 0 ? styles.disabled : ""}`}*!/*/}
                {/*    /!*    aria-label="أضف المنتج للسلة"*!/*/}
                {/*    /!*>*!/*/}
                {/*    /!*    <span>{shoppeIcon}</span>*!/*/}
                {/*    /!*    {isAddToCart ? "حذف" : "أضف للسلة"}*!/*/}
                {/*    /!*</motion.button>*!/*/}
                {/*    {isAddToCart &&*/}
                {/*        <QuantityControl*/}
                {/*            className={styles.quantity}*/}
                {/*            productQTU={product.stock}*/}
                {/*            max={product.stock}*/}
                {/*            quantity={selectedQty}*/}
                {/*            onIncrement={() => cartRef.current?.increment()}*/}
                {/*            onDecrement={() => cartRef.current?.decrement()}*/}
                {/*        />}*/}
                {/*    /!*{isAddToCart &&*!/*/}
                {/*    /!*    <QuantityControl*!/*/}
                {/*    /!*        className={styles.quantity}*!/*/}
                {/*    /!*        productQTU={product.stock}*!/*/}
                {/*    /!*        max={product.stock}*!/*/}
                {/*    /!*        quantity={selectedQty}*!/*/}
                {/*    /!*        onIncrement={() => cartRef.current?.increment()}*!/*/}
                {/*    /!*        onDecrement={() => cartRef.current?.decrement()}*!/*/}

                
                {/*</div> */}
            </div>
        </div>
    );
};

export default ProductCardSlider;
