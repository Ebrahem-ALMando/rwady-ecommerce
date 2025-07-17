// import {useEffect, useState, useCallback, useMemo} from 'react';
// import {
//     getCartFromStorage,
//     saveCartToStorage,
//     clearCartFromStorage,
// } from '@/utils/cartStorage';
// import { toast } from "react-hot-toast";
//
// export default function useCart() {
//     const [cart, setCart] = useState([]);
//     const [loaded, setLoaded] = useState(false);
//
//
//     useEffect(() => {
//         const storedCart = getCartFromStorage();
//         if (Array.isArray(storedCart)) {
//             setCart(storedCart);
//         }
//         setLoaded(true);
//     }, []);
//
//
//     useEffect(() => {
//         if (loaded) {
//             saveCartToStorage(cart);
//         }
//     }, [cart, loaded]);
//
//
//     useEffect(() => {
//         const handleStorageChange = (event) => {
//             if (event.key === 'rwady-cart') {
//                 const updatedCart = getCartFromStorage();
//                 if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
//                     setCart(updatedCart);
//                 }
//             }
//         };
//
//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, [cart]);
//
//
//     const addItem = useCallback((product, quantity = 1) => {
//         setCart((prev) => {
//             const existing = prev.find((item) => item.id === product.id);
//             const currentQty = existing ? existing.stock : 0;
//             const maxQty = product.stock;
//
//             if (currentQty + quantity > maxQty) {
//                 toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
//                 return prev;
//             }
//
//             if (existing) {
//                 return prev.map((item) =>
//                     item.id === product.id
//                         ? { ...item, quantity: item.quantity + quantity }
//                         : item
//                 );
//             }
//
//             return [...prev, { ...product, quantity }];
//         });
//     }, []);
//
//
//     const removeItem = useCallback((id) => {
//         setCart((prev) => prev.filter((item) => item.id !== id));
//     }, []);
//
//
//     const updateQuantity = useCallback((id, quantity) => {
//         const val = Number(quantity);
//         if (val <= 0) return removeItem(id);
//
//         setCart((prev) =>
//             prev.map((item) =>
//                 item.id === id ? { ...item, quantity: val } : item
//             )
//         );
//     }, [removeItem]);
//
//
//     const clearCart = useCallback(() => {
//         setCart([]);
//         clearCartFromStorage();
//     }, []);
//
//
//     const getTotalPrice = () =>
//         cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
//
//
//     const getShippingTotal = () => {
//         let fixedPrice = null;
//
//         const total = cart.reduce((sum, item) => {
//             const shipping = item.shipping_setting || {};
//             const quantity = item.quantity;
//
//
//             if (shipping.shipping_type === 'free') return sum;
//
//
//             const allNullOrZero =
//                 !shipping.shipping_fixed_price &&
//                 !shipping.per_product_price &&
//                 !shipping.per_product_min_price;
//
//             if (allNullOrZero) return sum;
//
//
//             if (shipping.shipping_fixed_price != null) {
//                 fixedPrice = shipping.shipping_fixed_price;
//             }
//
//
//             if (
//                 shipping.min_product_number != null &&
//                 shipping.per_product_min_price != null &&
//                 quantity >= shipping.min_product_number
//             ) {
//                 return sum + (shipping.per_product_min_price * quantity);
//             }
//
//
//             if (shipping.per_product_price != null) {
//                 return sum + (shipping.per_product_price * quantity);
//             }
//
//             return sum;
//         }, 0);
//
//
//         // return `${fixedPrice != null ? fixedPrice : total} IQD`;
//         return fixedPrice != null ? fixedPrice : total;
//     };
//
//
//
//     const getItemQuantity = (id) =>
//         cart.find((item) => item.id === id)?.quantity || 0;
//
//
//     const getIsItemExisting = (productId) =>
//         cart.some((item) => item.id === productId);
//
//
//     // const cartCount = useMemo(() => {
//     //     return cart.length;
//     // }, [cart]);
//     const getCartCount = () =>
//         cart.length || 0;
//
//
//     return {
//         cart,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//         // cartCount,
//         getTotalPrice,
//         getItemQuantity,
//         getShippingTotal,
//         getIsItemExisting,
//         getCartCount
//     };
// }

// import {useEffect, useState, useCallback, useMemo} from 'react';
// import {
//     getCartFromStorage,
//     saveCartToStorage,
//     clearCartFromStorage,
// } from '@/utils/cartStorage';
// import { toast } from "react-hot-toast";
// import {useAuth} from "@/hooks/useAuth";
// import {addToCart} from "@/api/services/cart/addToCart";
// import {deleteCartItem} from "@/api/services/cart/deleteCartItem";
// import {updateCartItem} from "@/api/services/cart/updateCartItem";
//
//
// function dispatchCartUpdate() {
//
//     setTimeout(() => {
//         window.dispatchEvent(new Event("cart-updated"));
//     }, 200);
// }
//
// export default function useCart() {
//     const { isAuthenticated } = useAuth();
//     const [cart, setCart] = useState([]);
//     const [loaded, setLoaded] = useState(false);
//
//     useEffect(() => {
//         const storedCart = getCartFromStorage();
//         if (Array.isArray(storedCart)) {
//             setCart(storedCart);
//         }
//         setLoaded(true);
//     }, []);
//
//     useEffect(() => {
//         if (loaded) {
//             saveCartToStorage(cart);
//             dispatchCartUpdate();
//         }
//     }, [cart, loaded]);
//
//     useEffect(() => {
//         const handleStorageChange = (event) => {
//             if (event.key === 'rwady-cart') {
//                 const updatedCart = getCartFromStorage();
//                 if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
//                     setCart(updatedCart);
//                 }
//             }
//         };
//
//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, [cart]);
//
//     const addItem = useCallback(async (product, quantity = 1) => {
//         setCart((prev) => {
//             const existing = prev.find((item) => item.id === product.id);
//             const currentQty = existing ? existing.quantity : 0;
//             const maxQty = product.stock;
//
//             if (currentQty + quantity > maxQty) {
//                 toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
//                 return prev;
//             }
//
//             let updated;
//             if (existing) {
//                 updated = prev.map((item) =>
//                     item.id === product.id
//                         ? { ...item, quantity: item.quantity + quantity }
//                         : item
//                 );
//             } else {
//                 updated = [...prev, { ...product, quantity }];
//             }
//
//             return updated;
//         });
//
//
//         dispatchCartUpdate();
//
//         // مزامنة مع السيرفر في حال كنت بدك تفعلها لاحقًا
//         // if (isAuthenticated) {
//         //     try {
//         //         await addToCart({
//         //             product_id: product.id,
//         //             quantity,
//         //             color_id: product.color_id ?? product.colors?.[0]?.id ?? null,
//         //         });
//         //     } catch (error) {
//         //         toast.error("فشل في مزامنة السلة مع السيرفر");
//         //     }
//         // }
//     }, [isAuthenticated]);
//
//
//     const removeItem = useCallback(async (id) => {
//         setCart((prev) => {
//             const updated = prev.filter((item) => item.id !== id);
//             dispatchCartUpdate();
//             return updated;
//         });
//
//         // if (isAuthenticated) {
//         //     try {
//         //         await deleteCartItem(id);
//         //     } catch (error) {
//         //         toast.error("فشل في حذف العنصر من السلة على السيرفر");
//         //     }
//         // }
//     }, [isAuthenticated]);
//
//     const updateQuantity = useCallback(async (id, quantity) => {
//         const val = Number(quantity);
//         if (val <= 0) return removeItem(id);
//
//         setCart((prev) => {
//             const updated = prev.map((item) =>
//                 item.id === id ? { ...item, quantity: val } : item
//             );
//             dispatchCartUpdate();
//             return updated;
//         });
//
//         // if (isAuthenticated) {
//         //     try {
//         //         await updateCartItem(id, { quantity: val });
//         //     } catch (error) {
//         //         toast.error("فشل في تعديل الكمية على السيرفر");
//         //     }
//         // }
//     }, [removeItem, isAuthenticated]);
//
//     const clearCart = useCallback(async () => {
//         if (isAuthenticated) {
//
//             await Promise.allSettled(
//                 cart.map(item => deleteCartItem(item.id))
//             );
//         }
//
//
//         setCart([]);
//         clearCartFromStorage();
//         dispatchCartUpdate();
//     }, [cart, isAuthenticated]);
//
//
//     const getTotalPrice = () =>
//         cart.reduce((sum, item) =>
//             sum + (item.price_after_discount ?? item.price) * item.quantity, 0);
//
//     const getShippingTotal = () =>
//         cart.reduce((sum, item) =>
//                 item.shipping_type === "free_shipping"
//                     ? sum
//                     : sum + (item.shipping_rate_single ?? 0),
//             0);
//     // const getShippingTotal = () => {
//     //     let fixedPrice = null;
//     //
//     //     const total = cart.reduce((sum, item) => {
//     //         const shipping = item.shipping_setting || {};
//     //         const quantity = item.quantity;
//     //
//     //         if (shipping.shipping_type === 'free') return sum;
//     //
//     //         const allNullOrZero =
//     //             !shipping.shipping_fixed_price &&
//     //             !shipping.per_product_price &&
//     //             !shipping.per_product_min_price;
//     //
//     //         if (allNullOrZero) return sum;
//     //
//     //         if (shipping.shipping_fixed_price != null) {
//     //             fixedPrice = shipping.shipping_fixed_price;
//     //         }
//     //
//     //         if (
//     //             shipping.min_product_number != null &&
//     //             shipping.per_product_min_price != null &&
//     //             quantity >= shipping.min_product_number
//     //         ) {
//     //             return sum + (shipping.per_product_min_price * quantity);
//     //         }
//     //
//     //         if (shipping.per_product_price != null) {
//     //             return sum + (shipping.per_product_price * quantity);
//     //         }
//     //
//     //         return sum;
//     //     }, 0);
//     //
//     //     return fixedPrice != null ? fixedPrice : total;
//     // };
//
//     const getItemQuantity = (id) =>
//         cart.find((item) => item.id === id)?.quantity || 0;
//
//     const getIsItemExisting = (productId) =>
//         cart.some((item) => item.id === productId);
//
//     const getCartCount = () =>
//         cart.reduce((sum, item) => sum + item.quantity, 0);
//
//     return {
//         cart,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//         getTotalPrice,
//         getItemQuantity,
//         getShippingTotal,
//         getIsItemExisting,
//         getCartCount,
//     };
// }
import {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
    getCartFromStorage,
    saveCartToStorage,
    clearCartFromStorage,
} from '@/utils/cartStorage';
import { toast } from "react-hot-toast";
import {useAuth} from "@/hooks/useAuth";
import {addToCart} from "@/api/services/cart/addToCart";
import {deleteCartItem} from "@/api/services/cart/deleteCartItem";
import {updateCartItem} from "@/api/services/cart/updateCartItem";
import { checkDetails } from "@/api/services/orders/checkDetails";
import {getCouponFromStorage} from "@/utils/orderSummaryStorage";


function dispatchCartUpdate() {

    setTimeout(() => {
        window.dispatchEvent(new Event("cart-updated"));
    }, 200);
}

let externalSetOrderSummary = null;
export default function useCart() {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [orderSummary, setOrderSummary] = useState(null);
    const [isCheckingDetails, setIsCheckingDetails] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [couponCode, setCouponCode] = useState(null);

    const initializeSummaryUpdater = useCallback((externalSetter) => {
        externalSetOrderSummary = externalSetter;
    }, []);
    const runCheckDetails = async () => {
        if (!cart || cart.length === 0) {
            externalSetOrderSummary?.(null);
            return;
        }

        const payload = {
            products: cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
                color: item.color_id ?? null,
            })),
            payment_method: paymentMethod,
            coupon_code: getCouponFromStorage()?.code || null,

        };

        try {
            setIsCheckingDetails(true);
            const res = await checkDetails(payload);
            // console.log(res?.data)
            if (!res.error) {
                externalSetOrderSummary?.(res.data);
            } else {
                externalSetOrderSummary?.(null);
            }
        } catch (err) {
            console.error("Check details failed", err);
            externalSetOrderSummary?.(null);
        } finally {
            setIsCheckingDetails(false);
        }
    };

    const prevPayloadRef = useRef('');
    useEffect(() => {
        const currentPayload = JSON.stringify({
            cart: cart.map(item => ({ id: item.id, q: item.quantity })),
            paymentMethod

        });

        if (currentPayload !== prevPayloadRef.current) {
            prevPayloadRef.current = currentPayload;
            runCheckDetails();
        }
    }, [cart, paymentMethod]);



    useEffect(() => {
        const storedCart = getCartFromStorage();
        if (Array.isArray(storedCart)) {
            setCart(storedCart);
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            saveCartToStorage(cart);
            dispatchCartUpdate();
        }
    }, [cart, loaded]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'rwady-cart') {
                const updatedCart = getCartFromStorage();
                if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
                    setCart(updatedCart);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [cart]);

    const addItem = useCallback(async (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            const currentQty = existing ? existing.quantity : 0;
            const maxQty = product.stock;

            if ((currentQty + quantity > maxQty)&&!product.stock_unlimited) {
                toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
                return prev;
            }

            let updated;
            if (existing) {
                updated = prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updated = [...prev, { ...product, quantity }];
            }

            return updated;
        });


        dispatchCartUpdate();

        // مزامنة مع السيرفر في حال كنت بدك تفعلها لاحقًا
        // if (isAuthenticated) {
        //     try {
        //         await addToCart({
        //             product_id: product.id,
        //             quantity,
        //             color_id: product.color_id ?? product.colors?.[0]?.id ?? null,
        //         });
        //     } catch (error) {
        //         toast.error("فشل في مزامنة السلة مع السيرفر");
        //     }
        // }
    }, [isAuthenticated]);


    const removeItem = useCallback(async (id) => {
        setCart((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            dispatchCartUpdate();
            return updated;
        });

        // if (isAuthenticated) {
        //     try {
        //         await deleteCartItem(id);
        //     } catch (error) {
        //         toast.error("فشل في حذف العنصر من السلة على السيرفر");
        //     }
        // }
    }, [isAuthenticated]);

    const updateQuantity = useCallback(async (id, quantity) => {
        const val = Number(quantity);
        if (val <= 0) return removeItem(id);

        setCart((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, quantity: val } : item
            );
            dispatchCartUpdate();
            return updated;
        });

        // if (isAuthenticated) {
        //     try {
        //         await updateCartItem(id, { quantity: val });
        //     } catch (error) {
        //         toast.error("فشل في تعديل الكمية على السيرفر");
        //     }
        // }
    }, [removeItem, isAuthenticated]);

    const clearCart = useCallback(async () => {
        if (isAuthenticated) {

            await Promise.allSettled(
                cart.map(item => deleteCartItem(item.id))
            );
        }


        setCart([]);
        clearCartFromStorage();
        dispatchCartUpdate();
    }, [cart, isAuthenticated]);


    const getTotalPrice = () =>
        cart.reduce((sum, item) =>
            sum + (item.price_after_discount ?? item.price) * item.quantity, 0);

    const getShippingTotal = () =>
        cart.reduce((sum, item) =>
                item.shipping_type === "free_shipping"
                    ? sum
                    : sum + (item.shipping_rate_single ?? 0),
            0);
    const getItemQuantity = (id) =>
        cart.find((item) => item.id === id)?.quantity || 0;

    const getIsItemExisting = (productId) =>
        cart.some((item) => item.id === productId);

    const getCartCount = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemQuantity,
        getShippingTotal,
        getIsItemExisting,
        getCartCount,
        runCheckDetails,
        orderSummary,
        isCheckingDetails,
        paymentMethod,
        setPaymentMethod,
        couponCode,
        setCouponCode,
        initializeSummaryUpdater
    };

}
