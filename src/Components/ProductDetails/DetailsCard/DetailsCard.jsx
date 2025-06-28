// "use client"
// import styles from './DetailsCard.module.css'
// import Link from "next/link";
// import Stars from "@/Components/Shared/Stars/Stars";
// import { favourIcon, SectionIcon_1, SectionIcon_2, shareIcon, shoppeIcon } from "@/utils/Icons";
// import { motion } from "framer-motion";
// import useFavourites from "@/hooks/useFavourites";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import useCart from "@/hooks/useCart";
// import { checkAuthClient } from "@/utils/checkAuthClient";
// import { useRouter } from "next/navigation";
// import {sizes} from "@/Data/sizes";
// import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
// import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
// import {getDiscountPercentage} from "@/utils/ProductsProc";
// import {handleToggleCart} from "@/utils/handleToggleCart";
//
//
// const DetailsCard = ({ product }) => {
//
//     const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
//     const [liked, setLiked] = useState(false);
//     const [isAddToCart,setIsAddToCart] = useState(false);
//     const router = useRouter();
//
//     const { addItem,getItemQuantity,getIsItemExisting,removeItem ,updateQuantity,cart} = useCart();
//
//     const initialQty = getItemQuantity(product.id) || 1;
//
//
//     const [selectedQty, setSelectedQty] = useState(initialQty);
//
//
//     useEffect(() => {
//         const qty = getItemQuantity(product.id);
//
//         setSelectedQty(qty > 0 ? qty : 1);
//
//
//         setIsAddToCart(getIsItemExisting(product.id));
//
//     }, [cart, product.id]);
//
//     const handleQuantityChange = (newQty) => {
//         const numericQty = Number(newQty);
//         if (numericQty > 0 && numericQty <= product.quantity) {
//             setSelectedQty(numericQty);
//             if (getIsItemExisting(product.id)) {
//                 updateQuantity(product.id, numericQty);
//             }
//         }
//     };
//
//     useEffect(() => {
//         if (selectedQty > 0&&cart.length>0) {
//             updateQuantity(product.id, selectedQty);
//         }
//     }, [selectedQty, product.id]);
//
//     useEffect(() => {
//         setLiked(isFavourite(product.id));
//     }, [favourites, product.id]);
//
//     const checkIsLogin = () => {
//         if (!checkAuthClient()) {
//             toast.custom(
//                 <CustomToast
//                     type="error"
//                     title="يجب تسجيل الدخول"
//                     message={
//                         <>
//                             لا يمكنك إضافة المنتج للمفضلة بدون
//                             <br/>
//                             <Link href="/sign-in" className="text-blue-600 underline font-semibold">
//                                 تسجيل الدخول
//                             </Link>
//                             .
//                         </>
//                     }
//                 />,
//                 {
//                     position: "top-center",
//                     duration: 3000,
//                 }
//             );
//             return false;
//         }
//         return true;
//     };
//     const handleToggleToCart = () => {
//         handleToggleCart(isAddToCart,removeItem,product,addItem,selectedQty)
//     }
//     const handleToggleFavourites = async () => {
//         if (!checkIsLogin()) return;
//         setLiked(prev => !prev);
//         await toggle(product.id);
//         await mutateFavourites();
//     };
//
//
//     return (
//         <div className={styles.detailsCard}>
//             <button className={styles.brand} aria-label="اسم الماركة">
//                 {product.brand?.name || "ماركة غير معروفة"}
//             </button>
//
//             <h1 className={styles.title}>{product.name}</h1>
//
//             <motion.div
//                 className={styles.price}
//                 initial={{scale: 0.9, opacity: 0}}
//                 animate={{scale: 1, opacity: 1}}
//                 transition={{duration: 0.4, ease: "easeOut"}}
//             >
//                 {product.price !== product.finalPrice && <del>{product.price} IQD</del>}
//                 <p>{product.finalPrice} IQD</p>
//             </motion.div>
//
//             {product.isDiscountVaild && (
//                 <motion.div
//                     className={styles.discount}
//                     initial={{opacity: 0}}
//                     animate={{opacity: 1}}
//                     transition={{delay: 0.2}}
//                 >
//                     <p>وفرت {Number(product.price - product.finalPrice).toFixed(0)} IQD</p>
//                     <p>خصم {getDiscountPercentage(product.price,product.finalPrice)}%</p>
//                 </motion.div>
//             )}
//
//             <p className={styles.textTitle}>وصف المنتج</p>
//             <p className={styles.descriptionText} aria-label="وصف المنتج">
//                 {product.description || "لا يوجد وصف متاح لهذا المنتج."}
//             </p>
//
//             <Link href="#" aria-label="عرض المزيد من وصف المنتج">
//                 <p className={styles.more}>عرض المزيد</p>
//             </Link>
//
//             <p className={styles.textTitle}>الالوان</p>
//             <div className={styles.color} role="group" aria-label="خيارات الألوان">
//                 {product.colors?.map((color) => (
//                     <motion.button
//                         key={color.id}
//                         style={{backgroundColor: color.code}}
//                         className={styles.colorButton}
//                         title={color.name}
//                         aria-label={`لون ${color.name}`}
//                         whileHover={{scale: 1.1}}
//                         whileTap={{scale: 0.95}}
//                     />
//                 ))}
//             </div>
//
//             {/*<p className={styles.textTitle}>المقاس</p>*/}
//             {/*<div className={styles.size} role="group" aria-label="خيارات المقاسات">*/}
//             {/*    {sizes.map((item, index) => (*/}
//             {/*        <button*/}
//             {/*            key={index}*/}
//             {/*            className={`${styles.sizeButton} ${item.isAvailable ? '' : styles.unavailable}`}*/}
//             {/*            aria-disabled={!item.isAvailable}*/}
//             {/*            aria-label={`المقاس ${item.title}${item.isAvailable ? '' : ' غير متاح'}`}*/}
//             {/*        >*/}
//             {/*            {item.isAvailable ? item.title : <del>{item.title}</del>}*/}
//             {/*        </button>*/}
//             {/*    ))}*/}
//             {/*</div>*/}
//
//             <div className={styles.countDetails}>
//                 <div className={styles.section} aria-label="الكمية المتبقية">
//                     {SectionIcon_1}
//                     <p>
//                         <span>المتبقى</span>
//                         <span>{product.quantity}</span>
//                         <span>وحدة</span>
//                     </p>
//                 </div>
//                 <div className={styles.section} aria-label="عدد المبيعات">
//                     {SectionIcon_2}
//                     <p>
//                         <span>تم شراءه</span>
//                         <span>{product.sales_num}</span>
//                         <span>مرة</span>
//                     </p>
//                 </div>
//             </div>
//
//             <div className={styles.actionDetails}>
//                 <div className={styles.actionChild} aria-label="تقييم المنتج">
//                     <Stars rating={product.avgrate || 0}/>
//                     <p>({product.avgrate || 0}) تقييمات</p>
//                 </div>
//                 <div className={styles.actionChild} aria-label="إضافة للمفضلة">
//                     {favourIcon}
//                     <p>أضف للمفضلة</p>
//                 </div>
//                 <div className={styles.actionChild} aria-label="مشاركة المنتج">
//                     {shareIcon}
//                     <p>مشاركة المنتج</p>
//                 </div>
//             </div>
//
//             <div className={styles.payment} aria-label="معلومات الدفع بالتقسيط">
//                 <span className={styles.availableIcon}>
//                     <img src={'/blur-placeholder.png'} alt='أيقونة الدفع' loading="lazy"/>
//                 </span>
//                 <div>
//                     <p>ادفع 6 اقساط شهرية</p>
//                     <p>متاح قسط 500 /شهريا</p>
//                 </div>
//             </div>
//
//             <div className={styles.actionButton}>
//                 {product.quantity > 0 ? (
//                     <select
//                         aria-label="اختيار الكمية"
//                         value={selectedQty}
//                         onChange={(e) => handleQuantityChange(e.target.value)}
//                     >
//                         {Array.from({length: Math.min(product.quantity, 5)}, (_, i) => (
//                             <option key={i + 1} value={i + 1}>
//                                 {i + 1}
//                             </option>
//                         ))}
//                     </select>
//
//                 ) : (
//                     <motion.p
//                         initial={{opacity: 0}}
//                         animate={{opacity: 1}}
//                         className={styles.outOfStock}
//                         role="alert"
//                     >
//                         المنتج غير متوفر حاليًا
//                     </motion.p>
//                 )}
//
//                 <motion.button
//                     disabled={product.quantity <= 0 || !product.quantity}
//                     onClick={handleToggleToCart}
//
//                     className={`${product.quantity <= 0 ? styles.disabled : null} ${isAddToCart?styles.addToCart:null}`}
//                     aria-label="أضف المنتج للسلة"
//                 >
//
//                     <span>
//                         {shoppeIcon}
//                     </span>
//
//                     {isAddToCart ? "حذف من السلة" : "أضف للسلة"}
//
//
//                 </motion.button>
//
//
//                 <motion.button
//                     onClick={handleToggleFavourites}
//                     className={`${styles.favBtn} ${liked ? styles.active : ""}`}
//                     whileTap={{scale: 0.9}}
//                     transition={{type: "spring", stiffness: 300}}
//                     aria-pressed={liked}
//                     aria-label={liked ? "إزالة من المفضلة" : "أضف للمفضلة"}
//                 >
//                     <motion.svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         animate={
//                             liked
//                                 ? {
//                                     scale: [1, 1.2, 1],
//                                 }
//                                 : {
//                                     scale: 1,
//                                 }
//                         }
//                         transition={
//                             liked
//                                 ? {
//                                     rotate: [0],
//                                     duration: liked ? 0.6 : 0.2,
//                                     repeat: Infinity,
//                                     repeatType: "loop",
//                                     ease: "easeInOut",
//                                 }
//                                 : {duration: 0.2}
//                         }
//                     >
//                         <motion.path
//                             d="M16.44 3.1C14.63 3.1 13.01 3.98 12 5.33C10.99 3.98 9.37 3.1 7.56 3.1C4.49 3.1 2 5.6 2 8.69C2 9.88 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88 22 8.69C22 5.6 19.51 3.1 16.44 3.1Z"
//                             fill={liked ? "#E41E1E" : "none"}
//                             stroke={liked ? "#E41E1E" : "#0741AD"}
//                             strokeWidth="1"
//                         />
//                     </motion.svg>
//                     <span style={{marginRight: "0.5rem"}}>
//                         {liked ? "في المفضلة" : "أضف للمفضلة"}
//                     </span>
//                 </motion.button>
//
//             </div>
//             {isAddToCart&&
//                 <QuantityControl
//                     productQTU={product.quantity}
//                     quantity={selectedQty}
//                     onIncrement={() => setSelectedQty(prev => prev + 1)}
//                     onDecrement={() => setSelectedQty(prev => Math.max(1, prev - 1))}
//                 />}
//         </div>
//     );
// };
//
// export default DetailsCard;
//
//
// "use client"
// import styles from './DetailsCard.module.css'
// import Link from "next/link";
// import Stars from "@/Components/Shared/Stars/Stars";
// import { favourIcon, SectionIcon_1, SectionIcon_2, shareIcon, shoppeIcon } from "@/utils/Icons";
// import { motion } from "framer-motion";
// import useFavourites from "@/hooks/useFavourites";
// import React, {useEffect, useRef, useState} from "react";
// import { toast } from "react-hot-toast";
// import useCart from "@/hooks/useCart";
// import { checkAuthClient } from "@/utils/checkAuthClient";
// import { useRouter } from "next/navigation";
// import {sizes} from "@/Data/sizes";
// import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
// import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
// import {getDiscountPercentage} from "@/utils/ProductsProc";
// import {handleToggleCart} from "@/utils/handleToggleCart";
// import {useTranslations} from "next-intl";
// import ProductDescription from "@/Components/ProductDetails/ProductDescription/ProductDescription";
// import { Flame  } from 'lucide-react'
// import CartActionButton from "@/Components/Shared/Buttons/CartActionButton/CartActionButton";
//
// const DetailsCard = ({ product,lang }) => {
//
//     const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
//     const [liked, setLiked] = useState(false);
//     const [isAddToCart,setIsAddToCart] = useState(false);
//     const router = useRouter();
//
//     const { addItem,getItemQuantity,getIsItemExisting,removeItem ,updateQuantity,cart} = useCart();
//
//     const initialQty = getItemQuantity(product.id) || 1;
//
//
//     const [selectedQty, setSelectedQty] = useState(initialQty);
//
//
//     // useEffect(() => {
//     //     const qty = getItemQuantity(product.id);
//     //
//     //     setSelectedQty(qty > 0 ? qty : 1);
//     //
//     //
//     //     setIsAddToCart(getIsItemExisting(product.id));
//     //
//     // }, [cart, product.id]);
//
//     // const handleQuantityChange = (newQty) => {
//     //     const numericQty = Number(newQty);
//     //     if (numericQty > 0 && numericQty <= product.quantity) {
//     //         setSelectedQty(numericQty);
//     //         if (getIsItemExisting(product.id)) {
//     //             updateQuantity(product.id, numericQty);
//     //         }
//     //     }
//     // };
//
//     // useEffect(() => {
//     //     if (selectedQty > 0&&cart.length>0) {
//     //         updateQuantity(product.id, selectedQty);
//     //     }
//     // }, [selectedQty, product.id]);
//
//     useEffect(() => {
//         setLiked(isFavourite(product.id));
//     }, [favourites, product.id]);
//
//     const checkIsLogin = () => {
//         if (!checkAuthClient()) {
//             toast.custom(
//                 <CustomToast
//                     type="error"
//                     title="يجب تسجيل الدخول"
//                     message={
//                         <>
//                             لا يمكنك إضافة المنتج للمفضلة بدون
//                             <br/>
//                             <Link href="/sign-in" className="text-blue-600 underline font-semibold">
//                                 تسجيل الدخول
//                             </Link>
//                             .
//                         </>
//                     }
//                 />,
//                 {
//                     position: "top-center",
//                     duration: 3000,
//                 }
//             );
//             return false;
//         }
//         return true;
//     };
//     // const handleToggleToCart = () => {
//     //     handleToggleCart(isAddToCart,removeItem,product,addItem,selectedQty)
//     // }
//     const handleToggleFavourites = async () => {
//         if (!checkIsLogin()) return;
//         setLiked(prev => !prev);
//         await toggle(product.id);
//         await mutateFavourites();
//     };
//     const t = useTranslations('ProductDetails');
//     const isDiscountValid = product.price_after_discount < product.price;
//
//     const cartRef = useRef();
//
//     return (
//         <div className={styles.detailsCard}>
//             {Array.isArray(product.brands) && product.brands.length > 0 ? (
//                 <div className={styles.brandsWrapper}>
//                     {product.brands.map((brand, index) => (
//                         <button
//                             key={index}
//                             className={styles.brand}
//                             aria-label={brand.name?.[lang]}
//                         >
//                             {brand.name?.[lang] || "ماركة غير معروفة"}
//                         </button>
//                     ))}
//                 </div>
//             ) : (
//                 <span className={styles.brand}>ماركة غير متوفرة</span>
//             )}
//
//
//             <h1 className={styles.title}>
//                 {product.name?.[lang] || "منتج بدون اسم"}
//             </h1>
//
//             <motion.div
//                 className={styles.price}
//                 initial={{scale: 0.9, opacity: 0.7}}
//                 animate={{scale: 1, opacity: 1}}
//                 transition={{duration: 0.4, ease: "easeInOut"}}
//             >
//                 {product.price_after_discount !== product.price && (
//                     <del>{product.price} IQD</del>
//                 )}
//                 <p>{product.price_after_discount || product.price} IQD</p>
//             </motion.div>
//
//
//             {isDiscountValid && (
//                 <motion.div className={styles.discount} initial={{opacity: 0.7}} animate={{opacity: 1}}
//                             transition={{delay: 0.2}}>
//                     <p>{t("youSaved", {amount: Number(product.price - product.price_after_discount).toFixed(0)})}</p>
//                     <p>{t("discountPercentage", {percent: getDiscountPercentage(product.price, product.price_after_discount)})}</p>
//                 </motion.div>
//             )}
//
//             <ProductDescription description={product.description} lang={lang}/>
//
//
//             <p className={styles.textTitle}>{t('colors')}</p>
//             <div className={styles.color}>
//                 {product.colors?.map((color) => (
//                     <motion.button
//                         key={color.id}
//                         style={{backgroundColor: color.color}}
//                         className={styles.colorButton}
//                         aria-label={`${t('color')} ${color.color}`}
//                     />
//                 ))}
//             </div>
//
//             <div className={styles.countDetails}>
//                 <div className={styles.section} aria-label={t('remaining')}>
//                     {SectionIcon_1}
//                     {product.availability ? (
//                         <p>
//                             <span>{t('remaining')}</span>
//                             <span>{product.stock}</span>
//                             <span>{t('unit')}</span>
//                         </p>
//                     ) : (
//                         <p className={styles.notAvailable}>{t('notAvailable')}</p>
//                     )}
//                 </div>
//
//                 <div className={styles.section} aria-label={t('sold')}>
//                     {SectionIcon_2}
//                     <p>
//                         <span>{t('sold')}</span>
//                         <span>{product.total_orders}</span>
//                         <span>{t('times')}</span>
//                     </p>
//                 </div>
//             </div>
//
//             <div className={styles.actionDetails}>
//
//                 {/*<div className={styles.actionChild} aria-label={t('rating')}>*/}
//                 {/*    <Stars rating={product.avgrate || 0}/>*/}
//                 {/*    <p>({product.avgrate || 0}) {t('reviews')}</p>*/}
//                 {/*</div>*/}
//                 {/*<div className={styles.actionChild} aria-label={t('addToFavourites')}>*/}
//                 {/*    {favourIcon}*/}
//                 {/*    <p>{t('addToFavourites')}</p>*/}
//                 {/*</div>*/}
//
//                 <div
//                     className={styles.actionChild}
//                     aria-label={t('shareProduct')}
//                     role="button"
//                     onClick={() => {
//                         if (navigator.share) {
//                             navigator.share({
//                                 title: product.name?.[lang],
//                                 text: product.description?.[lang],
//                                 url: window.location.href,
//                             }).catch((err) => console.error("Sharing failed", err));
//                         } else {
//                             navigator.clipboard.writeText(window.location.href);
//                             alert("تم نسخ رابط المنتج");
//                         }
//                     }}
//                 >
//                     {shareIcon}
//                     <p>{t('shareProduct')}</p>
//                 </div>
//             </div>
//
//             <div className={styles.payment} aria-label={t('installmentInfo')}>
//               <span className={styles.availableIcon}>
//                 <img src={'/aksat.png'} alt={t('installmentInfo')} loading="lazy"/>
//               </span>
//                 <div>
//                     <p>{t('installmentPlan')}</p>
//                     <p>{t('installmentMonthly')}</p>
//                 </div>
//             </div>
//
//             <div className={styles.actionButton}>
//                 {/*<motion.p*/}
//                 {/*    initial={{opacity: 0}}*/}
//                 {/*    animate={{opacity: 1}}*/}
//                 {/*    className={styles.outOfStock}*/}
//                 {/*    role="alert"*/}
//                 {/*>*/}
//                 {/*    المنتج غير متوفر حاليًا*/}
//                 {/*</motion.p>*/}
//
// {/*                <motion.button*/}
// {/*                    disabled={product.stock <= 0 || !product.stock}*/}
// {/*                    onClick={handleToggleToCart}*/}
//
// {/*                    className={`${product.stock <= 0 ? styles.disabled : null} ${isAddToCart ? styles.addToCart : null}`}*/}
// {/*                    aria-label="أضف المنتج للسلة"*/}
// {/*                >*/}
//
// {/*                    <span>*/}
// {/*                        {shoppeIcon}*/}
// {/*                    </span>*/}
// {/*                    /!*افحص*/}
// {/*availability*/}
// {/*:*/}
// {/*false*!/*/}
// {/*                    {isAddToCart ? "حذف من السلة" : "أضف للسلة"}*/}
//
//
// {/*                </motion.button>*/}
//
//                 <CartActionButton
//                     icon={shoppeIcon}
//                     styles={styles} product={product}
//                     setAddToCart={setIsAddToCart}
//                     selectedQty={selectedQty}
//                     setSelectedQty={setSelectedQty}
//                     ref={cartRef}
//                 />
//                 <motion.button
//                     onClick={handleToggleFavourites}
//                     className={`${styles.favBtn} ${liked ? styles.active : ""}`}
//                     whileTap={{scale: 0.9}}
//                     transition={{type: "spring", stiffness: 300}}
//                     aria-pressed={liked}
//                     aria-label={liked ? "إزالة من المفضلة" : "أضف للمفضلة"}
//                 >
//                     <motion.svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         animate={
//                             liked
//                                 ? {
//                                     scale: [1, 1.2, 1],
//                                 }
//                                 : {
//                                     scale: 1,
//                                 }
//                         }
//                         transition={
//                             liked
//                                 ? {
//                                     rotate: [0],
//                                     duration: liked ? 0.6 : 0.2,
//                                     repeat: Infinity,
//                                     repeatType: "loop",
//                                     ease: "easeInOut",
//                                 }
//                                 : {duration: 0.2}
//                         }
//                     >
//                         <motion.path
//                             d="M16.44 3.1C14.63 3.1 13.01 3.98 12 5.33C10.99 3.98 9.37 3.1 7.56 3.1C4.49 3.1 2 5.6 2 8.69C2 9.88 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88 22 8.69C22 5.6 19.51 3.1 16.44 3.1Z"
//                             fill={liked ? "#E41E1E" : "none"}
//                             stroke={liked ? "#E41E1E" : "#0741AD"}
//                             strokeWidth="1"
//                         />
//                     </motion.svg>
//                     <span style={{marginRight: "0.5rem"}}>
//
//                         {liked ? "في المفضلة" : t('addToFavourites')}
//                     </span>
//                 </motion.button>
//                       <motion.button
//
//                      disabled={product.stock <= 0 || !product.stock}
//
//                   className={`${styles.addToCart} ${product.stock <= 0 ? styles.disabled : ""} ${styles.shop}`}
//                     aria-label="شراء المنتج"
//                      >
//                      <span><Flame  size={20} /></span>
//
//                    شراء مباشر
//              </motion.button>
//             </div>
//             {isAddToCart &&
//                 <QuantityControl
//                     productQTU={product.stock}
//                     max={product.stock}
//                     quantity={selectedQty}
//                     onIncrement={() => cartRef.current?.increment()}
//                     onDecrement={() => cartRef.current?.decrement()}
//
//                 />}
//         </div>
//     );
// };
//
// export default DetailsCard;
// تنظيف الكود اضافة زر السلة


"use client"
import styles from './DetailsCard.module.css'
import Link from "next/link";
import { favourIcon, SectionIcon_1, SectionIcon_2, shareIcon, shoppeIcon } from "@/utils/Icons";
import { motion } from "framer-motion";
import useFavourites from "@/hooks/useFavourites";
import React, {useEffect, useRef, useState} from "react";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/useCart";
import { checkAuthClient } from "@/utils/checkAuthClient";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import {getDiscountPercentage} from "@/utils/ProductsProc";
import {useTranslations} from "next-intl";
import ProductDescription from "@/Components/ProductDetails/ProductDescription/ProductDescription";
import { Flame  } from 'lucide-react'
import CartActionButton from "@/Components/Shared/Buttons/CartActionButton/CartActionButton";
const DetailsCard = ({ product,lang }) => {
    const [liked, setLiked] = useState(false);
    const [isAddToCart,setIsAddToCart] = useState(false);
    const cartRef = useRef();
    const { getItemQuantity} = useCart();
    const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
    const t = useTranslations('ProductDetails');
    const isDiscountValid = product.price_after_discount < product.price;
    const initialQty = getItemQuantity(product.id) || 1;
    const [selectedQty, setSelectedQty] = useState(initialQty);

    useEffect(() => {
        setLiked(isFavourite(product.id));
    }, [favourites, product.id]);

    const checkIsLogin = () => {
        if (!checkAuthClient()) {
            toast.custom(
                <CustomToast
                    type="error"
                    title="يجب تسجيل الدخول"
                    message={
                        <>
                            لا يمكنك إضافة المنتج للمفضلة بدون
                            <br/>
                            <Link href="/sign-in" className="text-blue-600 underline font-semibold">
                                تسجيل الدخول
                            </Link>
                            .
                        </>
                    }
                />,
                {
                    position: "top-center",
                    duration: 3000,
                }
            );
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
    const handleShareProduct=()=>{
        if (navigator.share) {
            navigator.share({
                title: product.name?.[lang],
                text: product.description?.[lang],
                url: window.location.href,
            }).catch((err) => console.error("Sharing failed", err));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("تم نسخ رابط المنتج");
        }
    }

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
                            {brand.name?.[lang] || "ماركة غير متاحة"}
                        </button>
                    ))}
                </div>
            ) : (
                <span className={styles.brand}>ماركة غير متوفرة</span>
            )}


            <h1 className={styles.title}>
                {product.name?.[lang] || "منتج بدون اسم"}
            </h1>

            <motion.div
                className={styles.price}
                initial={{scale: 0.9, opacity: 0.7}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.4, ease: "easeInOut"}}
            >
                {product.price_after_discount !== product.price && (
                    <del>{product.price} IQD</del>
                )}
                <p>{product.price_after_discount || product.price} IQD</p>
            </motion.div>


            {isDiscountValid && (
                <motion.div className={styles.discount} initial={{opacity: 0.7}} animate={{opacity: 1}}
                            transition={{delay: 0.2}}>
                    <p>{t("youSaved", {amount: Number(product.price - product.price_after_discount).toFixed(0)})}</p>
                    <p>{t("discountPercentage", {percent: getDiscountPercentage(product.price, product.price_after_discount)})}</p>
                </motion.div>
            )}

            <ProductDescription description={product.description} lang={lang}/>


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
                    <p>{t('installmentMonthly')}</p>
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
                />
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

                        {liked ? "في المفضلة" : t('addToFavourites')}
                    </span>
                </motion.button>
                <motion.button

                    disabled={product.stock <= 0 || !product.stock}

                    className={`${styles.addToCart} ${product.stock <= 0 ? styles.disabled : ""} ${styles.shop}`}
                    aria-label="شراء المنتج"
                >
                    <span><Flame  size={20} /></span>

                    شراء مباشر
                </motion.button>
            </div>
            {isAddToCart &&
                <QuantityControl
                    productQTU={product.stock}
                    max={product.stock}
                    quantity={selectedQty}
                    onIncrement={() => cartRef.current?.increment()}
                    onDecrement={() => cartRef.current?.decrement()}
                />}
        </div>
    );
};

export default DetailsCard;
