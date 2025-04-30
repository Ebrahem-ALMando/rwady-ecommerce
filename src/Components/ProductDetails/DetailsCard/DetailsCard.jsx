"use client"
import styles from './DetailsCard.module.css'
import Link from "next/link";
import Stars from "@/Components/Shared/Stars/Stars";
import { favourIcon, SectionIcon_1, SectionIcon_2, shareIcon, shoppeIcon } from "@/utils/Icons";
import { motion } from "framer-motion";
import useFavourites from "@/hooks/useFavourites";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/useCart";
import { checkAuthClient } from "@/utils/checkAuthClient";
import { useRouter } from "next/navigation";
import {sizes} from "@/Data/sizes";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import {getDiscountPercentage} from "@/utils/ProductsProc";


const DetailsCard = ({ product }) => {

    const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
    const [liked, setLiked] = useState(false);
    const [isAddToCart,setIsAddToCart] = useState(false);
    const router = useRouter();

    const { addItem,getItemQuantity,getIsItemExisting,removeItem ,updateQuantity,cart} = useCart();

    const initialQty = getItemQuantity(product.id) || 1;


    const [selectedQty, setSelectedQty] = useState(initialQty);


    useEffect(() => {
        const qty = getItemQuantity(product.id);

        setSelectedQty(qty > 0 ? qty : 1);


        setIsAddToCart(getIsItemExisting(product.id));

    }, [cart, product.id]);

    const handleQuantityChange = (newQty) => {
        const numericQty = Number(newQty);
        if (numericQty > 0 && numericQty <= product.quantity) {
            setSelectedQty(numericQty);
            if (getIsItemExisting(product.id)) {
                updateQuantity(product.id, numericQty);
            }
        }
    };

    useEffect(() => {
        if (selectedQty > 0&&cart.length>0) {
            updateQuantity(product.id, selectedQty);
        }
    }, [selectedQty, product.id]);

    useEffect(() => {
        setLiked(isFavourite(product.id));
    }, [favourites, product.id]);

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
        await toggle(product.id);
        await mutateFavourites();
    };


    const handleToggleCart = () => {
        if (isAddToCart) {
            removeItem(product.id);
            toast.custom(
                <CustomToast
                    type="delete"
                    title="تم الحذف من السلة"
                    message={`تم إزالة ${product.name} بنجاح`}
                />,
                {
                    position: 'bottom-left',
                    duration: 2500,
                }
            );
        } else {
            addItem({
                id: product.id,
                name: product.name,
                brand:product.brand,
                price: Number(product.price),
                finalPrice: Number(product.finalPrice),
                isDiscountVaild:product.isDiscountVaild,
                productQty:product.quantity,
                shipping_setting: product.shipping_setting,
                image: product.main_img,
            }, selectedQty);
            toast.custom(
                <CustomToast
                    type="success"
                    title="تمت الإضافة بنجاح"
                    message={`${product.name} الآن في سلة التسوق`}
                />,
                {
                    position: 'bottom-left',
                    duration: 2500,
                }
            );
        }
    }




    return (
        <div className={styles.detailsCard}>
            <button className={styles.brand} aria-label="اسم الماركة">
                {product.brand?.name || "ماركة غير معروفة"}
            </button>

            <h1 className={styles.title}>{product.name}</h1>

            <motion.div
                className={styles.price}
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.4, ease: "easeOut"}}
            >
                {product.price !== product.finalPrice && <del>{product.price} IQD</del>}
                <p>{product.finalPrice} IQD</p>
            </motion.div>

            {product.isDiscountVaild && (
                <motion.div
                    className={styles.discount}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    <p>وفرت {Number(product.price - product.finalPrice).toFixed(0)} IQD</p>
                    <p>خصم {getDiscountPercentage(product.price,product.finalPrice)}%</p>
                </motion.div>
            )}

            <p className={styles.textTitle}>وصف المنتج</p>
            <p className={styles.descriptionText} aria-label="وصف المنتج">
                {product.description || "لا يوجد وصف متاح لهذا المنتج."}
            </p>

            <Link href="#" aria-label="عرض المزيد من وصف المنتج">
                <p className={styles.more}>عرض المزيد</p>
            </Link>

            <p className={styles.textTitle}>الالوان</p>
            <div className={styles.color} role="group" aria-label="خيارات الألوان">
                {product.colors?.map((color) => (
                    <motion.button
                        key={color.id}
                        style={{backgroundColor: color.code}}
                        className={styles.colorButton}
                        title={color.name}
                        aria-label={`لون ${color.name}`}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                    />
                ))}
            </div>

            <p className={styles.textTitle}>المقاس</p>
            <div className={styles.size} role="group" aria-label="خيارات المقاسات">
                {sizes.map((item, index) => (
                    <button
                        key={index}
                        className={`${styles.sizeButton} ${item.isAvailable ? '' : styles.unavailable}`}
                        aria-disabled={!item.isAvailable}
                        aria-label={`المقاس ${item.title}${item.isAvailable ? '' : ' غير متاح'}`}
                    >
                        {item.isAvailable ? item.title : <del>{item.title}</del>}
                    </button>
                ))}
            </div>

            <div className={styles.countDetails}>
                <div className={styles.section} aria-label="الكمية المتبقية">
                    {SectionIcon_1}
                    <p>
                        <span>المتبقى</span>
                        <span>{product.quantity}</span>
                        <span>وحدة</span>
                    </p>
                </div>
                <div className={styles.section} aria-label="عدد المبيعات">
                    {SectionIcon_2}
                    <p>
                        <span>تم شراءه</span>
                        <span>{product.sales_num}</span>
                        <span>مرة</span>
                    </p>
                </div>
            </div>

            <div className={styles.actionDetails}>
                <div className={styles.actionChild} aria-label="تقييم المنتج">
                    <Stars rating={product.avgrate || 0}/>
                    <p>({product.avgrate || 0}) تقييمات</p>
                </div>
                <div className={styles.actionChild} aria-label="إضافة للمفضلة">
                    {favourIcon}
                    <p>أضف للمفضلة</p>
                </div>
                <div className={styles.actionChild} aria-label="مشاركة المنتج">
                    {shareIcon}
                    <p>مشاركة المنتج</p>
                </div>
            </div>

            <div className={styles.payment} aria-label="معلومات الدفع بالتقسيط">
                <span className={styles.availableIcon}>
                    <img src={'/img.png'} alt='أيقونة الدفع' loading="lazy"/>
                </span>
                <div>
                    <p>ادفع 6 اقساط شهرية</p>
                    <p>متاح قسط 500 /شهريا</p>
                </div>
            </div>

            <div className={styles.actionButton}>
                {product.quantity > 0 ? (
                    <select
                        aria-label="اختيار الكمية"
                        value={selectedQty}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                    >
                        {Array.from({length: Math.min(product.quantity, 5)}, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>

                ) : (
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className={styles.outOfStock}
                        role="alert"
                    >
                        المنتج غير متوفر حاليًا
                    </motion.p>
                )}

                <motion.button
                    disabled={product.quantity <= 0 || !product.quantity}
                    onClick={handleToggleCart}

                    className={`${product.quantity <= 0 ? styles.disabled : null} ${isAddToCart?styles.addToCart:null}`}
                    aria-label="أضف المنتج للسلة"
                >

                    <span>
                        {shoppeIcon}
                    </span>

                    {isAddToCart ? "حذف من السلة" : "أضف للسلة"}


                </motion.button>


                <motion.button
                    onClick={handleToggleFavourites}
                    className={`${styles.favBtn} ${liked ? styles.active : ""}`}
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
                        animate={
                            liked
                                ? {
                                    scale: [1, 1.2, 1],
                                }
                                : {
                                    scale: 1,
                                }
                        }
                        transition={
                            liked
                                ? {
                                    rotate: [0],
                                    duration: liked ? 0.6 : 0.2,
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
                    <span style={{marginRight: "0.5rem"}}>
                        {liked ? "في المفضلة" : "أضف للمفضلة"}
                    </span>
                </motion.button>

            </div>
            {isAddToCart&&
                <QuantityControl
                    productQTU={product.quantity}
                    quantity={selectedQty}
                    onIncrement={() => setSelectedQty(prev => prev + 1)}
                    onDecrement={() => setSelectedQty(prev => Math.max(1, prev - 1))}
                />}
        </div>
    );
};

export default DetailsCard;
