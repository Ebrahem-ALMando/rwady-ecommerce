// 'use client';
// import {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
// import { useTranslations } from 'next-intl';
// import useCart from "@/hooks/useCart";
// import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
// import {handleToggleCart} from "@/utils/handleToggleCart";
//
//
//
// const CartActionButton = ({ product, className = '',styles ,icon,showQuantityControl=false
//                               ,setAddToCart,isAddToCart,selectedQty,setSelectedQty,lang},ref) => {
//     const t = useTranslations('Cart');
//     const {
//         addItem,
//         removeItem,
//         updateQuantity,
//         getItemQuantity,
//         getIsItemExisting,
//         cart,
//     } = useCart();
//
//     // const [selectedQty, setSelectedQty] = useState(1);
//     // const [isAddToCart, setIsAddToCart] = useState(false);
//
//     useEffect(() => {
//         if (!product?.id) return;
//
//         const qty = getItemQuantity(product.id);
//         const exists = getIsItemExisting(product.id);
//
//         if (qty !== selectedQty) {
//             setSelectedQty(qty > 0 ? qty : 1);
//         }
//
//         setAddToCart(exists);
//         setAddToCart(exists);
//     }, [cart, product.id]);
//
//
//
//     // useEffect(() => {
//     //     const qty = getItemQuantity(product.id);
//     //     setSelectedQty(qty > 0 ? qty : 1);
//     //     setIsAddToCart(getIsItemExisting(product.id));
//     //     setAddToCart(getIsItemExisting(product.id));
//     // }, [cart, product.id]);
//
//     const handleToggleToCart = () => {
//         handleToggleCart(
//             setAddToCart,
//             isAddToCart,
//             removeItem,
//             product,
//             addItem,
//             selectedQty,
//             lang
//         );
//     };
//
//     // const handleToggleToCart = () => {
//     //     if (isAddToCart) {
//     //         removeItem(product.id);
//     //         setAddToCart(false)
//     //
//     //     } else {
//     //         addItem(product, selectedQty);
//     //         setAddToCart(true)
//     //     }
//     // };
//
//     const handleQuantityChange = (val) => {
//         setSelectedQty(val);
//         if (getIsItemExisting(product.id)) {
//             updateQuantity(product.id, val);
//         }
//     };
//     useImperativeHandle(ref, () => ({
//         increment: () =>  handleQuantityChange(selectedQty + 1),
//         decrement: () =>handleQuantityChange(Math.max(1, selectedQty - 1))
//     }));
//     return (
//         <div className={`${styles.cartActionWrapper} ${className}`}>
//             <button
//                 aria-label={isAddToCart ? t('remove') : t('add')}
//                 onClick={handleToggleToCart}
//                 // className={`${styles.cartButton} ${isAddToCart ? styles.remove : styles.add}`}
//                 disabled={!product.stock || product.stock <= 0 ||!product.availability}
//                 className={`${(!product.stock || product.stock <= 0 ||!product.availability) ? styles.disabled : null} ${isAddToCart ? styles.addToCart : null}`}
//
//             >
//                 {icon&&
//                     <span>
//                         {icon}
//                     </span>
//                 }
//                 {isAddToCart ? t('remove') : t('add')}
//             </button>
//
//             {!product.stock && (
//                 <p className={styles.outOfStockText}>{t('outOfStock')}</p>
//             )}
//
//             {isAddToCart && showQuantityControl&& (
//                 <QuantityControl
//                     quantity={selectedQty}
//                     max={product.stock}
//                     onIncrement={() => handleQuantityChange(selectedQty + 1)}
//                     onDecrement={() => handleQuantityChange(Math.max(1, selectedQty - 1))}
//                 />
//             )}
//         </div>
//     );
// };
//
// export default forwardRef(CartActionButton);
//
'use client';
import { useEffect, useImperativeHandle, forwardRef} from 'react';
import { useTranslations } from 'next-intl';
import useCart from "@/hooks/useCart";
import QuantityControl from "@/Components/ProductDetails/QuantityControl/QuantityControl";
import {handleToggleCart} from "@/utils/handleToggleCart";



const CartActionButton = ({ product, className = '',btnClassName='',styles ,icon,showQuantityControl=false
                              ,setAddToCart,isAddToCart,selectedQty,setSelectedQty,lang},ref) => {
    const t = useTranslations("Cart");
    const {
        addItem,
        removeItem,
        updateQuantity,
        getItemQuantity,
        getIsItemExisting,
        cart,
    } = useCart();

    useEffect(() => {
        if (!product?.id) return;
        const qty = getItemQuantity(product.id);
        const exists = getIsItemExisting(product.id);
        if (qty !== selectedQty) {
            setSelectedQty(qty > 0 ? qty : 1);
        }
        setAddToCart(exists);
        setAddToCart(exists);
    }, [cart, product.id]);


    const handleToggleToCart = () => {
        const safeName = product.name?.[lang] || "المنتج";
        const truncatedName = safeName.slice(0, 20) + (safeName.length > 20 ? "..." : "");

        const addMessage = t("addSuccessMessage", { name: truncatedName });
        const removeMessage = t("removeSuccessMessage", { name: truncatedName });
        handleToggleCart(
            setAddToCart,
            isAddToCart,
            removeItem,
            product,
            addItem,
            selectedQty,
            addMessage,
            removeMessage,
            t("addSuccessTitle"),
            t("removeSuccessTitle")
        );
    };
    const handleQuantityChange = (val) => {
        setSelectedQty(val);
        if (getIsItemExisting(product.id)) {
            updateQuantity(product.id, val);
        }
    };
    useImperativeHandle(ref, () => ({
        increment: () =>  handleQuantityChange(selectedQty + 1),
        decrement: () =>handleQuantityChange(Math.max(1, selectedQty - 1))
    }));
    return (
        <div className={`${styles.cartActionWrapper} ${className}`}>
            <button
                aria-label={isAddToCart ? t('remove') : t('add')}
                onClick={handleToggleToCart}
                disabled={!product.stock || product.stock <= 0 ||!product.availability}
                className={`${(!product.stock || product.stock <= 0 ||!product.availability) ? styles.disabled : null} ${isAddToCart ? styles.addToCart : null} ${btnClassName}`}
            >
                {icon&&
                    <span>
                        {icon}
                    </span>
                }
                {isAddToCart ? t('remove') : t('add')}
            </button>

            {!product.stock && (
                <p className={styles.outOfStockText}>{t('outOfStock')}</p>
            )}

            {isAddToCart && showQuantityControl&& (
                <QuantityControl
                    quantity={selectedQty}
                    max={product.stock}
                    onIncrement={() => handleQuantityChange(selectedQty + 1)}
                    onDecrement={() => handleQuantityChange(Math.max(1, selectedQty - 1))}
                />
            )}
        </div>
    );
};

export default forwardRef(CartActionButton);

