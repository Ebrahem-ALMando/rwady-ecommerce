"use client";

import React, {useEffect, useState, useRef      } from "react";
import Image from "next/image";
import Select from "react-select";
import styles from '../ShoppingCart.module.css';
import { DeleteIcon, dropdownArrowIcon, deliveryIcon } from "@/utils/Icons";
import DeleteButton from "@/Components/Shared/Buttons/DeleteButton/DeleteButton";
import {motion} from "framer-motion";
import {getDiscountPercentage} from "@/utils/ProductsProc";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import {checkAuthClient} from "@/utils/checkAuthClient";
import {toast} from "react-hot-toast";
import useFavourites from "@/hooks/useFavourites";
import {useRouter} from "next/navigation";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import {useTranslations} from "next-intl";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";

const CartItem = ({ item,cart, updateQuantity,getItemQuantity,removeItem,lang,t }) => {
    const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    const initialQty = getItemQuantity(item.id) || 1;
    const tCart = useTranslations("Cart");
    const tFav=useTranslations('productCard')
    const [selectedQty, setSelectedQty] = useState(initialQty);
    useEffect(() => {
        if (!item?.id || !Array.isArray(favourites)) return;

      
        const currentlyFav = isFavourite(item.id);

        setLiked(currentlyFav);


    }, [favourites, item.id]);


    const handleToggle = async () => {
        const res = await toggle(item.id);
        const isNowFav = res?.data?.is_favorite;
        setLiked(isNowFav);
    };

    const handleRemoveCartItem = () => {
        const removeMessage = tCart("removeSuccessMessage", { name: item?.name?.[lang] });
        removeItem(item.id)
        toast.custom(
            <CustomToast
                type="error"
                title={tCart("removeSuccessTitle")}
                message={removeMessage}

            />,
            {
                position: 'top-left',
                duration: 2500,
            }
        );
    }

    useEffect(() => {
        const qty = getItemQuantity(item?.id);
        setSelectedQty(qty > 0 ? qty : 1);
    }, [cart, item.id]);

  
    const quantityTimeoutRef = useRef();

    useEffect(() => {   
        if (selectedQty > 0 && cart.length > 0) {
            if (quantityTimeoutRef.current) {
                clearTimeout(quantityTimeoutRef.current);
            }
            quantityTimeoutRef.current = setTimeout(() => {
                updateQuantity(item.id, selectedQty);
            }, 700);
        }
      
        return () => {
            if (quantityTimeoutRef.current) {
                clearTimeout(quantityTimeoutRef.current);
            }
        };
    }, [selectedQty, item.id, cart.length]);

    return (
        <div className={styles.productCard}>
            <div className={styles.productImg}>
                <SafeImage
                    fallback="/images/Shopping/img.png"
                    src={item.image_url}
                    alt={item?.name?.[lang] || "منتج"}
                    width={100}
                    height={100}
                    loading="lazy"
                    decoding={"async"}
                    // quality={10}
                />
            </div>

            <div className={styles.productItem}>
                <h4 className={styles.title}>{item?.name?.[lang]}</h4>
                <p className={styles.brand}>
                    {item.brands?.map(b => b.name?.[lang]).join(" / ")}
                </p>

                <div className={styles.actionButton}>
                    <DeleteButton icon={DeleteIcon} onClick={handleRemoveCartItem}/>
                    <FavouriteToggleButton
                                liked={liked}
                                likedCount={item.fav_num || 0}
                                onToggle={handleToggle}
                                showcount={false}
                                showtext={false}
                                t={tFav}
                                isShoppingCart={true}
                                className={styles.heart}
                                divClassName={styles.heartDiv}
                                svgStyle={styles.heartSVG}
                            />
                </div>
            </div>

            <div className={styles.productDetails}>
                <p className={styles.price}>
                    {item.price_after_discount} IQD
                </p>

                {item.price > item.price_after_discount && (
                    <p className={styles.oldPrice}>
                          <span className={styles.discount}>
                            {item.discount_percentage_text?.[lang] || t("discount", {
                                    percentage: getDiscountPercentage(item.price, item.final_price_after_promotion||item.price_after_discount)
                            })}
                          </span>
                        <del>{item.price} IQD</del>
                    </p>
                )}
                <p className={styles.freeDelivery}>
                    {deliveryIcon}
                    {item.shipping_type === "free_shipping"
                        ? t("freeDelivery")
                        : item.shipping_rate_single
                            ? t("shippingCost", {cost: item.shipping_rate_single})
                            : t("shippingUnknown")
                    }
                </p>

                <div className={styles.quenty}>
                    <label htmlFor={`quantity-${item.id}`}>{t("quantity")}</label>
                </div>
                <div className={styles.quantityControl}>
                {item.stock_unlimited &&
                <QuantityControl
                    stockUnlimited={item.stock_unlimited}
                    max={!item.stock_unlimited?item.stock:999}
                    productQTU={item.stock}
                    quantity={selectedQty}
                    onIncrement={() => setSelectedQty(prev => Math.min(prev + 1, item.maximum_purchase?item.maximum_purchase:item.stock_unlimited?999:item.stock))}
                    onDecrement={() => setSelectedQty(prev => Math.max(item.minimum_purchase ||1, prev - 1 ))}

                />}

                </div>
            </div>

        </div>
    );
};

export default CartItem;
