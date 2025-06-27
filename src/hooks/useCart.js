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

import {useEffect, useState, useCallback, useMemo} from 'react';
import {
    getCartFromStorage,
    saveCartToStorage,
    clearCartFromStorage,
} from '@/utils/cartStorage';
import { toast } from "react-hot-toast";

// ✅ إضافة الحدث المخصص لتحديث السلة يدويًا
function dispatchCartUpdate() {
    window.dispatchEvent(new Event("cart-updated"));
}

export default function useCart() {
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

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
            dispatchCartUpdate(); // 🔥 إشارة لتحديث المكونات الأخرى
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

    const addItem = useCallback((product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            const currentQty = existing ? existing.stock : 0;
            const maxQty = product.stock;

            if (currentQty + quantity > maxQty) {
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

            dispatchCartUpdate();
            return updated;
        });
    }, []);

    const removeItem = useCallback((id) => {
        setCart((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            dispatchCartUpdate();
            return updated;
        });
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        const val = Number(quantity);
        if (val <= 0) return removeItem(id);

        setCart((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, quantity: val } : item
            );
            dispatchCartUpdate();
            return updated;
        });
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setCart([]);
        clearCartFromStorage();
        dispatchCartUpdate();
    }, []);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

    const getShippingTotal = () => {
        let fixedPrice = null;

        const total = cart.reduce((sum, item) => {
            const shipping = item.shipping_setting || {};
            const quantity = item.quantity;

            if (shipping.shipping_type === 'free') return sum;

            const allNullOrZero =
                !shipping.shipping_fixed_price &&
                !shipping.per_product_price &&
                !shipping.per_product_min_price;

            if (allNullOrZero) return sum;

            if (shipping.shipping_fixed_price != null) {
                fixedPrice = shipping.shipping_fixed_price;
            }

            if (
                shipping.min_product_number != null &&
                shipping.per_product_min_price != null &&
                quantity >= shipping.min_product_number
            ) {
                return sum + (shipping.per_product_min_price * quantity);
            }

            if (shipping.per_product_price != null) {
                return sum + (shipping.per_product_price * quantity);
            }

            return sum;
        }, 0);

        return fixedPrice != null ? fixedPrice : total;
    };

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
    };
}
