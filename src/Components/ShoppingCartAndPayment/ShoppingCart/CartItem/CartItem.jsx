"use client";

import React, {useEffect, useState} from "react";
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

const CartItem = ({ item,cart, updateQuantity,getItemQuantity,removeItem }) => {
    const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    const initialQty = getItemQuantity(item.id) || 1;


    const [selectedQty, setSelectedQty] = useState(initialQty);
    useEffect(() => {

        setLiked(isFavourite(item.id));

    }, [favourites, item.id]);

    const checkIsLogin = () => {
        if (!checkAuthClient()) {
            toast.error("يرجى تسجيل الدخول لتنفيذ هذا الاجراء");
            router.push("/sign-in");
            return false;
        }
        return true;
    };

    const handleToggleFavourites = async () => {
        if (!checkIsLogin()) return;
        setLiked(prev => !prev);
        await toggle(item.id);
        await mutateFavourites();
    };

    const handleRemoveCartItem = () => {
        removeItem(item.id)
        toast.custom(
            <CustomToast
                type="error"
                title="تم الحذف من السلة"
                message={`تم إزالة ${item.name} بنجاح`}
            />,
            {
                position: 'bottom-left',
                duration: 2500,
            }
        );
    }

    useEffect(() => {
        const qty = getItemQuantity(item.id);

        setSelectedQty(qty > 0 ? qty : 1);

    }, [cart, item.id]);

    useEffect(() => {
        if (selectedQty > 0&&cart.length>0) {
            updateQuantity(item.id, selectedQty);
        }
    }, [selectedQty, item.id]);
    return (
        <div className={styles.productCard}>
            <div className={styles.productImg}>
                <SafeImage
                    fallback="/images/Shopping/img.png"
                    src={item.image}
                    alt={item.name || "منتج"}
                    width={100}
                    height={100}
                    loading="lazy"
                    decoding={"async"}
                    // quality={10}
                />

            </div>

            <div className={styles.productItem}>
                <h4 className={styles.title}>{item?.name}</h4>
                <p className={styles.brand}>{item.brand.name}</p>
                <div className={styles.actionButton}>
                    <DeleteButton icon={DeleteIcon} onClick={handleRemoveCartItem}/>
                    <motion.button
                        onClick={handleToggleFavourites}
                        className={`${styles.heart} ${liked ? styles.active : ""}`}
                        whileTap={{scale: 0.9}}
                        transition={{type: "spring", stiffness: 300}}
                        aria-pressed={liked}
                        aria-label={liked ? "إزالة من المفضلة" : "أضف للمفضلة"}
                    >
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={liked ? {scale: [1, 1.2, 1]} : {scale: 1}}
                            transition={
                                liked
                                    ? {
                                        rotate: [0],
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                    }
                                    : {duration: 0.2}
                            }
                        >
                            <motion.path
                                d="M16.44 3.1C14.63 3.1 13.01 3.98 12 5.33C10.99 3.98 9.37 3.1 7.56 3.1C4.49 3.1 2 5.6 2 8.69C2 9.88 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88 22 8.69C22 5.6 19.51 3.1 16.44 3.1Z"
                                fill={liked ? "#E41E1E" : "none"}
                                stroke={liked ? "#E41E1E" : "#0741AD"}
                                strokeWidth="1"
                            />
                        </motion.svg>
                    </motion.button>
                </div>
            </div>

            <div className={styles.productDetails}>
                <p className={styles.price}>{item.finalPrice} IQD</p>
                {item.isDiscountVaild &&
                    <>
                        <p className={styles.oldPrice}>
                            <span
                                className={styles.discount}> {" خصم "}{getDiscountPercentage(item.price, item.finalPrice)}%</span>
                            <del>{item.price} IQD</del>
                        </p>
                    </>
                }
                <p className={styles.freeDelivery}>
                    {deliveryIcon}
                    {item.deliveryType || "توصيل مجانى"}
                </p>
                <div className={styles.quenty}>
                    <label htmlFor={`quantity-${item.id}`}>الكمية</label>

                </div>
                <div className={styles.quantityControl}>
                    <QuantityControl
                        productQTU={item.productQty}
                        quantity={selectedQty}
                        onIncrement={() => setSelectedQty(prev => prev + 1)}
                        onDecrement={() => setSelectedQty(prev => Math.max(1, prev - 1))}
                    />
                </div>
            </div>

        </div>
    );
};

export default CartItem;
