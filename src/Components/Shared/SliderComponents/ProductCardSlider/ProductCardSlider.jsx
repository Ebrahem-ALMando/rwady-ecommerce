// "use client";
//
// import styles from './ProductCardSlider.module.css';
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { sliderSetting } from "@/Components/Shared/SliderComponents/ProductCardSlider/config";
// import { formatDuration } from "@/utils/formatDuration";
// import Image from "next/image";
// import { motion } from 'framer-motion';
// import useFavourites from "@/hooks/useFavourites";
// import Slider from 'react-slick';
//
// import {getTokenWithClient} from "@/utils/getTokenWithClient";
// import {getDiscount} from "@/utils/ProductsProc";
//
// import {useRouter} from "next/navigation";
// import {toast} from "react-hot-toast";
// import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
// import {shoppeIcon} from "@/utils/Icons";
// import useCart from "@/hooks/useCart";
// import {checkAuthClient} from "@/utils/checkAuthClient";
// import {handleToggleCart} from "@/utils/handleToggleCart";
// import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
// import { Flame  } from 'lucide-react'
//
// const settings = {
//
//     ...sliderSetting,
//     infinite: false,
//     appendDots: dots => (
//         <ul className={styles.slickDots}>
//             {dots.map((dot, index) => (
//                 React.cloneElement(dot, {
//                     key: index,
//                     className: `${dot.props.className} ${
//                         dot.props.className.includes("slick-active") ? styles.slickActive : styles.slickDot
//                     }`
//                 })
//             ))}
//         </ul>
//     )
// };
//
//
// const ProductCardSlider = ({ product }) => {
//     const [activeImages, setActiveImages] = useState(product.photos || []);
//     const [time, setTime] = useState(formatDuration(product.discount_start, product.discount_end)||0);
//     const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();
//     const [liked, setLiked] = useState(false);
//     const [likedCount, setLikedCount] = useState(product.fav_num||0);
//     const router=useRouter()
//     useEffect(() => {
//         const timerId = setInterval(() => {
//             setTime(formatDuration(product.discount_start, product.discount_end));
//         }, 1000);
//         return () => clearInterval(timerId);
//     }, [product.discount_start, product.discount_end]);
//
//     useEffect(() => {
//         if (getTokenWithClient()) {
//             setLiked(isFavourite(product.id));
//         }
//     }, [favourites, product.id]);
//
//     const [isAddToCart,setIsAddToCart] = useState(false);
//
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
//     const handleToggleToCart = () => {
//         handleToggleCart(isAddToCart,removeItem,product,addItem,selectedQty)
//     }
//
//
//     const handleToggle = async () => {
//         if (!getTokenWithClient()) {
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
//             return;
//         }
//         setLiked(prev => !prev);
//         setLikedCount(prev=>liked?prev-1:prev+1)
//         await toggle(product.id);
//         await mutateFavourites();
//     };
//
//     const handleColorClick = (color) => {
//         if (color.photos && color.photos.length > 0) {
//             const imageList = color.photos.map(p => p.photo).filter(Boolean);
//             if (imageList.length > 0) setActiveImages(imageList);
//         }
//     };
//
//     const discountValue = product.price && product.finalPrice
//         ? getDiscount(product.price , product.finalPrice)
//         : 0;
//
//     return (
//         <div className={`p-2 pt-5 ${styles.cardDiv}`}>
//             <div className={styles.card}>
//                 {discountValue > 0 && product.isDiscountVaild&& (
//                     <div className={`absolute top-2 left-0 text-white font-bold ${styles.saveSeller}`}>
//                         {" وفر "}
//                            {discountValue}
//                         {" IQD"}
//                     </div>
//                 )}
//
//                 {product.isBestSelling && (
//                     <div className={`absolute top-2 right-0 text-white font-bold ${styles.bestSeller}`}>
//                         الأكثر مبيعًا
//                     </div>
//                 )}
//
//                 {discountValue > 0 && product.isDiscountVaild&& (
//                     <div className="absolute top-[-17px] left-1/2 -translate-x-1/2 z-50">
//                         <div className={styles.time}>
//                             <p className={styles.timeText}>
//               <span className={styles.timeIcon}>
//                 <Image
//                     width={25}
//                     height={25}
//                     src={'/images/img_8.png'}
//                     alt={'time'}
//                 />
//               </span>
//                                 {time}
//                             </p>
//                         </div>
//                     </div>
//                 )}
//
//
//                 <div className="relative w-full h-[300px] mt-3">
//                     <Slider {...settings}>
//                         {activeImages.map((image, index) => (
//                             <div key={index}>
//                                 <motion.div
//                                     className={styles.productImgDiv}
//                                     initial={{opacity: 0}}
//                                     animate={{opacity: 1}}
//                                     transition={{duration: 0.3}}
//                                 >
//                                 <img src={image.url} alt={`Product Image ${index + 1}`} loading1='lazy' className={styles.productImg} />
//                                 </motion.div>
//                             </div>
//                         ))}
//                     </Slider>
//
//                     <div className="absolute flex flex-col gap-2" style={{bottom: '-20px', left: '10px'}}>
//                         <div className={styles.iconImage}>
//                             <p>({likedCount})</p>
//                             <motion.button onClick={handleToggle} whileTap={{scale: 1.2}}
//                                            transition={{type: "spring", stiffness: 300}}>
//                                 <motion.svg
//                                     width="24" height="24" viewBox="0 0 24 24" fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     animate={liked ? {scale: [1, 1.2, 1]} : {scale: 1}}
//                                     transition={liked ? {
//                                         duration: 1,
//                                         repeat: Infinity,
//                                         repeatType: "loop",
//                                         ease: "easeInOut"
//                                     } : {duration: 0.2}}
//                                 >
//                                     <motion.path
//                                         d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"
//                                         fill={liked ? "#E41E1E" : "none"}
//                                         stroke={liked ? "#E41E1E" : "#0741AD"}
//                                         strokeWidth="1"
//                                     />
//                                 </motion.svg>
//                             </motion.button>
//                         </div>
//                         <div className={styles.iconImage}>
//                             <p>
//                                 {product.sales_num}
//                             </p>
//                             {/*<button className="">*/}
//                             {/*style={{cursor:'pointer'}}*/}
//                                 <svg  width="24" height="24" viewBox="0 0 24 24" fill="none"
//                                      xmlns="http://www.w3.org/2000/svg">
//                                     <path fillRule="evenodd" clipRule="evenodd"
//                                           d="M14.4279 2.10575C14.9218 1.85876 15.5225 2.05899 15.7695 2.55296L18.118 7.24996L20.0947 7.24996C20.3867 7.24995 20.6428 7.24994 20.8534 7.26431C21.0734 7.27932 21.3088 7.31293 21.5393 7.41455C21.927 7.58549 22.2236 7.84734 22.4088 8.19161C22.5869 8.52276 22.6298 8.87024 22.6244 9.16751C22.6191 9.46283 22.565 9.75159 22.5111 9.99258C22.4806 10.1287 22.3769 10.5616 22.3617 10.6252L22.3601 10.6317L22.358 10.6412C22.275 11.0224 22.0164 11.3301 21.678 11.4908C21.3085 11.6661 21.0677 11.9888 21.0055 12.3431L20.9861 12.4555C20.9231 12.8215 20.8916 13.0045 20.8269 13.0195C20.7622 13.0345 20.6421 12.8685 20.4019 12.5364C19.9477 11.9085 19.209 11.5 18.3748 11.5C16.9941 11.5 15.8748 12.6192 15.8748 14L15.8748 14.4C15.8748 14.6828 15.8748 14.8242 15.787 14.9121C15.6991 15 15.5577 15 15.2748 15L14.8748 15C13.4941 15 12.3748 16.1192 12.3748 17.5C12.3748 18.8807 13.4941 20 14.8748 20L15.2748 20C15.5577 20 15.6991 20 15.787 20.0878C15.8748 20.1757 15.8748 20.3171 15.8748 20.6L15.8748 21C15.8748 21.3444 15.8748 21.5167 15.8066 21.5997C15.7955 21.6132 15.7881 21.6209 15.7751 21.6326C15.695 21.7043 15.5576 21.7102 15.2827 21.7219C14.6236 21.75 13.864 21.75 12.99 21.75L10.7597 21.75C9.42472 21.75 8.35653 21.75 7.50563 21.6498C6.627 21.5465 5.88894 21.3281 5.25939 20.827L5.25652 20.8247C4.41846 20.151 4.01686 19.17 3.78442 18.2651C3.62767 17.6548 3.52845 16.9807 3.4438 16.4056L2.74422 12.3431C2.682 11.9888 2.44123 11.6661 2.07173 11.4908C1.73327 11.3301 1.47472 11.0224 1.39165 10.6412L1.38957 10.6317L1.38802 10.6252C1.37278 10.5616 1.26905 10.1287 1.23861 9.99258C1.1847 9.75159 1.1306 9.46283 1.12528 9.16751C1.11992 8.87024 1.16276 8.52276 1.3409 8.1916C1.52609 7.84734 1.82266 7.5855 2.21039 7.41455C2.44087 7.31293 2.67631 7.27932 2.89633 7.26431C3.10688 7.24994 3.363 7.24995 3.65498 7.24996L6.92432 7.24996L8.95894 2.59939C9.18031 2.09341 9.76994 1.86269 10.2759 2.08405C10.7819 2.30542 11.0126 2.89505 10.7913 3.40103L9.10735 7.24996L15.8819 7.24996L13.9806 3.44739C13.7336 2.95341 13.9339 2.35274 14.4279 2.10575ZM9.12484 12C9.12484 11.5857 9.46063 11.25 9.87484 11.25L13.8748 11.25C14.2891 11.25 14.6248 11.5857 14.6248 12C14.6248 12.4142 14.2891 12.75 13.8748 12.75L9.87484 12.75C9.46063 12.75 9.12484 12.4142 9.12484 12Z"
//                                           fill="#0741AD"/>
//                                     <path
//                                         d="M19.3748 14C19.3748 13.4477 18.9271 13 18.3748 13C17.8226 13 17.3748 13.4477 17.3748 14L17.3748 16.5L14.8748 16.5C14.3226 16.5 13.8748 16.9477 13.8748 17.5C13.8748 18.0522 14.3226 18.5 14.8748 18.5L17.3748 18.5L17.3748 21C17.3748 21.5522 17.8226 22 18.3748 22C18.9271 22 19.3748 21.5522 19.3748 21L19.3748 18.5L21.8748 18.5C22.4271 18.5 22.8748 18.0522 22.8748 17.5C22.8748 16.9477 22.4271 16.5 21.8748 16.5L19.3748 16.5L19.3748 14Z"
//                                         fill="#0741AD"/>
//                                 </svg>
//                             {/*</button>*/}
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className={styles.infoCard}>
//                     {product.brand?.name && (
//                         <div className="mb-2">
//                             <span className={styles.brand}>{product.brand.name}</span>
//                         </div>
//                     )}
//
//                     <h3 className={styles.title}>{product.name}</h3>
//
//                     <p className={styles.price}>
//                         {product.finalPrice} - IQD
//                         {product.price && (
//                             <del className={styles.oldPrice}>{product.price} - IQD</del>
//                         )}
//                     </p>
//
//
//                     {/* Waite Implement Aksat Service */}
//
//                     {product.quantity > 0 && (
//                         <p className={styles.available}>
//                   <span className={styles.availableIcon}>
//                     <img src={'/images/img_6.png'} alt="available"/>
//                   </span>
//                             {/*اشتري بالاقساط 5000 د.ع / شهر لمدة 10 اشهر*/}
//                             اشتري بالاقساط . . . (قريباًْ)
//                         </p>
//                     )}
//
//                     {Array.isArray(product.colors) && product.colors.length > 0 && (
//                         <div className={styles.colorButtons}>
//                             {product.colors.map((color, index) => (
//                                 color.photos?.length > 0 && color.photos[0]?.photo?.url && (
//                                     <button
//                                         key={index}
//                                         style={{background: color.code}}
//                                         className={styles.colorButton}
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             e.preventDefault();
//                                             handleColorClick(color);
//                                         }}
//                                         aria-label={`لون ${color.name}`}
//                                     />
//                                 )
//                             ))}
//                         </div>
//                     )}
//
//                     {product.quantity >= 0 &&
//                         <div className={styles.outherDetails}>
//                             <p className={styles.remaining}>
//                               <span className={styles.remainingIcon}>
//                                 <img src={'/images/img_7.png'} alt="remaining"/>
//                               </span>
//                                 مُتبقي: {product.quantity}&nbsp;عناصر
//                             </p>
//                         </div>
//                     }
//
//
//                 </div>
//                 <div className="flex mb-1 mr-1">
//                     <motion.button
//                         disabled={product.quantity <= 0 || !product.quantity}
//                         onClick={handleToggleToCart}
//                         className={`${styles.addToCart} ${product.quantity <= 0 ? styles.disabled : ""}`}
//                         aria-label="أضف المنتج للسلة"
//                     >
//                         <span>{shoppeIcon}</span>
//                         {isAddToCart ? "حذف" : "أضف للسلة"}
//                     </motion.button>
//                     {isAddToCart &&
//                         <QuantityControl
//                             className={styles.quantity}
//                             productQTU={product.quantity}
//                             quantity={selectedQty}
//                             onIncrement={() => setSelectedQty(prev => prev + 1)}
//                             onDecrement={() => setSelectedQty(prev => Math.max(1, prev - 1))}
//                         />}
//                 {/*    {!isAddToCart &&*/}
//                 {/*      <motion.button*/}
//                 {/*        disabled={product.quantity <= 0 || !product.quantity}*/}
//                 {/*        // onClick={handleToggleToCart}*/}
//                 {/*        className={`${styles.addToCart} ${product.quantity <= 0 ? styles.disabled : ""} ${styles.shop}`}*/}
//                 {/*        aria-label="شراء المنتج"*/}
//                 {/*        >*/}
//                 {/*        <span><Flame  size={20} /></span>*/}
//
//                 {/*  شراء مباشر*/}
//                 {/*</motion.button>*/}
//                 {/*        }*/}
//                 </div>
//
//
//
//             </div>
//         </div>
//     );
// };
//
// export default ProductCardSlider;




"use client";

import styles from './ProductCardSlider.module.css';
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import { sliderSetting } from "@/Components/Shared/SliderComponents/ProductCardSlider/config";
import { formatDuration } from "@/utils/formatDuration";
import Image from "next/image";
import { motion } from 'framer-motion';
// import useFavourites from "@/hooks/useFavourites";
import Slider from 'react-slick';

// import {getTokenWithClient} from "@/utils/getTokenWithClient";
import {getDiscount} from "@/utils/ProductsProc";

import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import {salesNumIcon, shoppeIcon} from "@/utils/Icons";
import useCart from "@/hooks/useCart";
import {checkAuthClient} from "@/utils/checkAuthClient";

import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import { Flame  } from 'lucide-react'
import {useLocale} from "next-intl";
import {slugify} from "@/utils/slugify";
import CartActionButton from "@/Components/Shared/Buttons/CartActionButton/CartActionButton";
import FavouriteToggleButton from "@/Components/Shared/Buttons/FavouriteToggleButton/FavouriteToggleButton";
import useFavourites from "@/hooks/useFavourites";

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
    // const { favourites, toggle, isFavourite, mutateFavourites } = useFavourites();

    const { toggle, isFavourite, favourites } = useFavourites(true);

    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(product.fav_num || 0);


    // useEffect(() => {
    //     if (!product?.id || !Array.isArray(favourites)) return;
    //
    //     const currentlyFav = isFavourite(product.id);
    //     setLiked(currentlyFav);
    //     setLikedCount(product.fav_num || 0);
    // }, [favourites, product.id]);


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



    const [isAddToCart,setIsAddToCart] = useState(false);
    const cartRef = useRef();
    const { getItemQuantity} = useCart();

    const initialQty = getItemQuantity(product?.id) || 1;
    const [selectedQty, setSelectedQty] = useState(initialQty);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(formatDuration(product.price_discount_start, product.price_discount_end));
        }, 1000);
        return () => clearInterval(timerId);
    }, [product.price_discount_start, product.price_discount_end]);



    // const [isAddToCart,setIsAddToCart] = useState(false);


    // const { addItem,getItemQuantity,getIsItemExisting,removeItem ,updateQuantity,cart} = useCart();
    // const initialQty = getItemQuantity(product.id) || 1;
    // const [selectedQty, setSelectedQty] = useState(initialQty);


    // const [selectedQty, setSelectedQty] = useState(initialQty);

    //
    // useEffect(() => {
    //     const qty = getItemQuantity(product.id);
    //
    //     setSelectedQty(qty > 0 ? qty : 1);
    //
    //
    //     setIsAddToCart(getIsItemExisting(product.id));
    //
    // }, [cart, product.id]);

    // const handleQuantityChange = (newQty) => {
    //     const numericQty = Number(newQty);
    //     if (numericQty > 0 && numericQty <= product.quantity) {
    //         setSelectedQty(numericQty);
    //         if (getIsItemExisting(product.id)) {
    //             updateQuantity(product.id, numericQty);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (selectedQty > 0&&cart.length>0) {
    //         updateQuantity(product.id, selectedQty);
    //     }
    // }, [selectedQty, product.id]);

    // const handleToggleToCart = () => {
    //     handleToggleCart(isAddToCart,removeItem,product,addItem,selectedQty,lang)
    // }


    const handleColorClick = (color) => {
        const colorImages = product.media?.filter(m => m.type === "image" && m.product_color_id === color.id) || [];
        if (colorImages.length > 0) setActiveImages(colorImages.slice(0, 3));
    };

    const discountValue = getDiscount(product.price, product.price_after_discount);
    const isDiscountValid = product.price_after_discount < product.price;

    useEffect(() => {
        const images = product.media?.filter(m => m.type === "image").slice(0, 3) || [];
        setActiveImages(images);
    }, [product.media]);
    let dragTimer;

    const handleDisableDrag = () => {
        clearTimeout(dragTimer);
        dragTimer = setTimeout(() => {
            if(setIsDraggingInsideCard)
            setIsDraggingInsideCard(true);
        }, 250);
    };

    const handleEnableDrag = () => {
        clearTimeout(dragTimer);
        if(setIsDraggingInsideCard)
        setIsDraggingInsideCard(false);
    };


    return (
        <div className={`p-2 pt-5 ${styles.cardDiv}`}>
            <div className={styles.card}>
                {product.discount_percentage_text?.[lang] && isDiscountValid && (
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


                {discountValue > 0 && isDiscountValid && time!=="NaNH : NaN M : NaN S"&&(
                    <div className="absolute top-[-17px] left-1/2 -translate-x-1/2 z-50">
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


                <div className="relative w-full h-[300px] mt-3">
                    <Slider
                        {...settings}
                        onMouseEnter={handleDisableDrag}
                        onMouseLeave={handleEnableDrag}
                        onTouchStart={handleDisableDrag}
                        onTouchEnd={handleEnableDrag}
                    >
                        {activeImages.map((image, index) => (
                            <div key={index}>
                                <motion.div
                                    className={styles.productImgDiv}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img

                                        onMouseEnter={handleDisableDrag}
                                        onMouseLeave={handleEnableDrag}
                                        onTouchStart={handleDisableDrag}
                                        onTouchEnd={handleEnableDrag}
                                        src={image.url||"/FallbackProductImage.png"}
                                        alt={`Product Image ${index + 1}`}
                                        loading="lazy"
                                        className={styles.productImg}
                                        draggable={false}
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </Slider>

                    <div className="absolute flex flex-col gap-2" style={{bottom: '-20px', left: '10px'}}>
                        <div className={styles.iconImage}>
                            <FavouriteToggleButton
                                liked={liked}
                                likedCount={likedCount}
                                onToggle={handleToggle}
                            />
                        </div>
                        <div className={styles.iconImage}>
                            <p>
                                {product.total_orders||0}
                            </p>
                            {salesNumIcon}
                        </div>
                    </div>
                </div>

                <Link href={`/products/${product.id}/${slugify(product.name?.[lang] || "")}`}>
                    <div className={styles.infoCard}>
                        <div className="flex flex-wrap gap-2 mt-3 mb-1">
                            {product.categories?.slice(0, 2).map((ctr, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full whitespace-nowrap"
                                    title={ctr.name?.[lang]}
                                >
                          {ctr.name?.[lang]}
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
                            {product.price_after_discount || product.price} - IQD
                            {product.price_after_discount && (
                                <del className={styles.oldPrice}>{product.price} - IQD</del>
                            )}
                        </p>

                        {/* Waite Implement Aksat Service */}
                        {product.stock > 0 && (
                            <p className={styles.available}>
                  <span className={styles.availableIcon}>
                    <img src={'/images/img_6.png'} alt="available"/>
                  </span>
                                اشتري بالاقساط . . . (قريباًْ)
                            </p>
                        )}
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
                                        ? "كمية غير محدودة"
                                        : `مُتبقي: ${product.stock} عناصر`}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.outherDetails}>
                                <p className={`${styles.remaining}`}>
                              <span className={styles.remainingIcon}>
                                <img src={'/images/img_7.png'} alt="remaining"/>
                              </span>
                                    غير متوفر حالياً
                                </p>
                            </div>
                        )}


                    </div>
                </Link>
                {/*<div className="flex mb-1 mr-1">*/}
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

                {/*    /!*    />}*!/*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ProductCardSlider;
