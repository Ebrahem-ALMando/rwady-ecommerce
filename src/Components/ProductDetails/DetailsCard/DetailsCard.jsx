
"use client"
import styles from './DetailsCard.module.css'
import Link from "next/link";
import { favourIcon, SectionIcon_1, SectionIcon_2, shareIcon, shoppeIcon } from "@/utils/Icons";
import { motion } from "framer-motion";
import useFavourites from "@/hooks/useFavourites";
import React, {useEffect, useRef, useState} from "react";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/useCart";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import {getDiscountPercentage} from "@/utils/ProductsProc";
import {useTranslations} from "next-intl";
import ProductDescription from "@/Components/ProductDetails/ProductDescription/ProductDescription";
import { Flame, Sparkles  } from 'lucide-react'
import CartActionButton from "@/Components/Shared/Buttons/CartActionButton/CartActionButton";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";
import { useRouter } from "next/navigation";
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';
const DetailsCard = ({ product,lang }) => {
    const { toggle, isFavourite, favourites } = useFavourites(true);
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [isAddToCart,setIsAddToCart] = useState(false);
    const cartRef = useRef();
    const { getItemQuantity,addItem,removeItem,updateQuantity,getIsItemExisting,cart} = useCart();
    const t = useTranslations('ProductDetails');
    const isDiscountValid = product.price_after_discount < product.price;
    const initialQty = getItemQuantity(product.id) || 1;
    const [selectedQty, setSelectedQty] = useState(initialQty);

    const handleShareProduct=()=>{
        if (navigator.share) {
            navigator.share({
                title: product.name?.[lang],
                text: product.description?.[lang],
                url: window.location.href,
            }).catch((err) => console.error("Sharing failed", err));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.custom(() => (
                <CustomToast
                    title="تم نسخ رابط المنتج"
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        }
    }
    useEffect(() => {
        if (!product?.id || !Array.isArray(favourites)) return;
        const currentlyFav = isFavourite(product.id);
        setLiked(currentlyFav);
    }, [favourites, product.id]);

    const handleToggle = async () => {
        const res = await toggle(product.id);
        const isNowFav = res?.data?.is_favorite;
        setLiked(isNowFav);
    };
    const handleBuyDirectly = () => {
      const data ={
        product_id: product.id,
        quantity: 1,
        color: product.colors?.[0]?.color || null,
      }
      sessionStorage.setItem('buyDirectly', JSON.stringify(data));
      toast.custom(() => (
        <CustomToast
          title={t("buyDirectlySuccess")}
          type="success"
        />
      ) ,{
        duration: 3000,
        position: 'top-center',
      });
      router.push(`/${lang}/checkout?mode=direct_order`);
    }
    const finalPrice = (product.final_price_after_promotion < product.price_after_discount? product.final_price_after_promotion : product.price_after_discount) || product.price;
    return (
        <div className={styles.detailsCard}>

            {Array.isArray(product.brands) && product.brands.length > 0 ? (
                <div className={styles.brandsWrapper}>
                    {product.brands.map((brand, index) => (
                        <button
                            key={index}
                            className={styles.brand}
                            aria-label={brand.name?.[lang]}
                        >
                            {brand.name?.[lang] || "...."}
                        </button>
                    ))}
                </div>
            ) : (
                ''
            )}


            <h1 className={styles.title}>
                {product.name?.[lang] || "...."}
            </h1>

           
            {product.promotion && (
                <div
                    className={styles.promotion}
                >
                    <span
                        className={styles.promotionIcon}
                        aria-label="promotion"
                    >
                       <Sparkles size={20} />
                    </span>
                    <div className={styles.promotionContent}>
                        <div className={styles.promotionTitle}>
                            {product.promotion.title?.[lang] || product.promotion.title?.ar || product.promotion.title?.en}
                        </div>
                        <div className={styles.promotionDiscount}>
                            {product.promotion.discount_type === 'fixed' ? (
                                <>
                               
                                    {lang === 'ar' ? 'خصم مباشر بقيمة' : 'Direct discount of'}{' '}
                                    <span style={{fontWeight: 700}}>
                                        {product.promotion.discount_value.toLocaleString()} IQD
                                    </span>
                                </>
                            ) : product.promotion.discount_type === 'percentage' ? (
                                <>
                                    {lang === 'ar' ? 'خصم' : 'Discount'}{' '}
                                    <span style={{fontWeight: 700}}>
                                        {product.promotion.discount_value}%
                                    </span>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
            <motion.div
                className={styles.price}
                initial={{scale: 0.9, opacity: 0.7}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.4, ease: "easeInOut"}}
            >
                {product.price_after_discount !== product.price && (
                    <del>{product.price} IQD</del>
                )}
                <p>{finalPrice} IQD</p>
            </motion.div>


            {isDiscountValid && (
                <motion.div className={styles.discount} initial={{opacity: 0.7}} animate={{opacity: 1}}
                            transition={{delay: 0.2}}>
                    <p>{t("youSaved", {amount: Number(product.price - product.price_after_discount).toFixed(0)})}</p>
                    <p>{t("discountPercentage", {percent: getDiscountPercentage(product.price, product.price_after_discount)})}</p>
                </motion.div>
            )}

            {product.description?.[lang]?.length>0&&
                <ProductDescription description={product.description} lang={lang}/>
            }



            {product.colors.length>0&&
                <>
                    <p className={styles.textTitle}>{t('colors')}</p>
                    <div className={styles.color}>
                        {product.colors?.map((color) => (
                            <motion.button
                                key={color.id}
                                style={{backgroundColor: color.color}}
                                className={styles.colorButton}
                                aria-label={`${t('color')} ${color.color}`}
                            />
                        ))}
                    </div>
                </>
            }

            <div className={styles.countDetails}>
                <div className={styles.section} aria-label={t('remaining')}>
                    {SectionIcon_1}
                    {product.availability ? (
                        <p>
                            <span>{t('remaining')}</span>
                            <span>{product.stock}</span>
                            <span>{t('unit')}</span>
                        </p>
                    ) : (
                        <p className={styles.notAvailable}>{t('notAvailable')}</p>
                    )}
                </div>

                <div className={styles.section} aria-label={t('sold')}>
                    {SectionIcon_2}
                    <p>
                        <span>{t('sold')}</span>
                        <span>{product.total_orders}</span>
                        <span>{t('times')}</span>
                    </p>
                </div>
            </div>

            <div className={styles.actionDetails}>

                <div
                    className={styles.actionChild}
                    aria-label={t('shareProduct')}
                    role="button"
                    onClick={handleShareProduct}
                >
                    {shareIcon}
                    <p>{t('shareProduct')}</p>
                </div>
            </div>

            <div className={styles.payment} aria-label={t('installmentInfo')}>
              <span className={styles.availableIcon}>
                <img src={'/aksat.png'} alt={t('installmentInfo')} loading="lazy"/>
              </span>
                <div>
                    <p>{t('installmentPlan')}</p>
                    {/* <p>{t('installmentMonthly')}</p> */}
                    <p>{t("pay_monthly", { price: Math.round((finalPrice) / 10) })}</p>
                </div>
            </div>

            <div className={styles.actionButton}>
                <CartActionButton

                    icon={shoppeIcon}
                    styles={styles}
                    product={product}
                    setAddToCart={setIsAddToCart}
                    isAddToCart={isAddToCart}
                    selectedQty={selectedQty}
                    setSelectedQty={setSelectedQty}
                    ref={cartRef}
                    lang={lang}
                    addItem={addItem}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                    getItemQuantity={getItemQuantity}
                    getIsItemExisting={getIsItemExisting}
                    cart={cart}
                />
                <FavouriteToggleButton
                   className={`${styles.favBtn} ${liked ? styles.active : ""}`}
                   divClassName={styles.favBtnDiv}
                                liked={liked}
                                onToggle={handleToggle}
                                showcount={false}
                                showtext={true}
                                t={t}
                            />
                <motion.button

                    disabled={(product.stock <= 0  && !product.stock_unlimited ) || (!product.stock && !product.stock_unlimited)}
                    onClick={handleBuyDirectly}
                    className={`${styles.addToCart} ${product.stock <= 0 && !product.stock_unlimited ? styles.disabled : ""} ${styles.shop}`}
                    aria-label={t('buyDirectly')}
                >
                    <span><Flame  size={20} /></span>

                    {t('buyDirectly')}
                </motion.button>
            </div>
            {isAddToCart &&
                <QuantityControl
                    stockUnlimited={product.stock_unlimited}
                    max={!product.stock_unlimited?product.stock:999}
                    productQTU={product.stock}
                    quantity={selectedQty}
                    onIncrement={() => cartRef.current?.increment()}
                    onDecrement={() => cartRef.current?.decrement()}
                />}
        </div>
    );
};

export default DetailsCard;
