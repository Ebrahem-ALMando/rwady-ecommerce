// // import { useEffect, useState, useCallback, useRef } from 'react';
// // import {
// //   getCartFromStorage,
// //   saveCartToStorage,
// //   clearCartFromStorage,
// //   CART_KEY,
// //   CART_UPDATED_EVENT,
// // } from '@/utils/cartStorage';
// // import { toast } from 'react-hot-toast';
// // import { useAuth } from '@/hooks/useAuth';
// // import { checkDetails } from '@/api/services/orders/checkDetails';
// // import { getCouponFromStorage } from '@/utils/orderSummaryStorage';
// // import { usePathname } from 'next/navigation';

// // /** =======================
// //  *  Coalesced check-details
// //  *  ======================= */

// // // مجمّع مشترك لكل النسخ داخل نفس التبويب
// // let ORDER_SUMMARY_SETTERS = new Set(); // نحدّث كل النسخ بنفس النتيجة
// // let CHECK_DEBOUNCE_TIMER = null;
// // let CHECK_INFLIGHT_PROMISE = null;
// // let LAST_PAYLOAD_KEY = ''; // لمنع تكرار نفس الطلب
// // const CHECK_DEBOUNCE_MS = 300;

// // function notifyOrderSummary(summary) {
// //   ORDER_SUMMARY_SETTERS.forEach((fn) => {
// //     try { fn(summary); } catch {}
// //   });
// // }

// // async function coalescedCheckDetails(payload) {
// //   const key = JSON.stringify(payload);

// //   // نفس الحمولة قيد الانتظار/التجهيز -> لا نكرر
// //   if (key === LAST_PAYLOAD_KEY && (CHECK_INFLIGHT_PROMISE || CHECK_DEBOUNCE_TIMER)) {
// //     return CHECK_INFLIGHT_PROMISE;
// //   }

// //   LAST_PAYLOAD_KEY = key;

// //   if (CHECK_DEBOUNCE_TIMER) clearTimeout(CHECK_DEBOUNCE_TIMER);

// //   // Debounce خفيف لدمج التغييرات المتتابعة
// //   CHECK_INFLIGHT_PROMISE = new Promise((resolve) => {
// //     CHECK_DEBOUNCE_TIMER = setTimeout(async () => {
// //       CHECK_DEBOUNCE_TIMER = null;
// //       try {
// //         // نفّذ الطلب مرة واحدة فقط لكل التبويب مهما كان عدد النسخ
// //         const res = await checkDetails(payload);
// //         if (!res?.error) {
// //           notifyOrderSummary(res.data);
// //           resolve(res.data);    
// //         } else {
// //           notifyOrderSummary(null);
// //           resolve(null);
// //         }
// //       } catch (err) {
// //         console.error('checkDetails failed', err);
// //         notifyOrderSummary(null);
// //         resolve(null);
// //       } finally {
// //         CHECK_INFLIGHT_PROMISE = null;
// //       }
// //     }, CHECK_DEBOUNCE_MS);
// //   });

// //   return CHECK_INFLIGHT_PROMISE;
// // }

// // export default function useCart() {
// //   const { isAuthenticated } = useAuth();
// //   const pathname = usePathname();
// //   const [cart, setCart] = useState([]);
// //   const [loaded, setLoaded] = useState(false);

// //   const [orderSummary, _setOrderSummary] = useState(null);
// //   const [isCheckingDetails, setIsCheckingDetails] = useState(false);
// //   const [paymentMethod, setPaymentMethod] = useState('cash');
// //   const [couponCode, setCouponCode] = useState(null);

// //   // كل نسخة من الهوك تسجّل Setter الخاص بها لتصلها نفس النتيجة
// //   useEffect(() => {
// //     ORDER_SUMMARY_SETTERS.add(_setOrderSummary);
// //     return () => ORDER_SUMMARY_SETTERS.delete(_setOrderSummary);
// //   }, []);

// //   /** 1) التهيئة مرة واحدة */
// //   useEffect(() => {
// //     const storedCart = getCartFromStorage();
// //     setCart(Array.isArray(storedCart) ? storedCart : []);
// //     setLoaded(true);
// //   }, []);

// //   /** 2) احفظ ثم ابثّ الحدث */
// //   useEffect(() => {
// //     if (!loaded) return;
// //     saveCartToStorage(cart);
// //     window.dispatchEvent(new Event(CART_UPDATED_EVENT));
// //   }, [cart, loaded]);

// //   /** 3) مزامنة داخل نفس التبويب + بين التبويبات */
// //   useEffect(() => {
// //     const syncFromStorage = () => {
// //       const updated = getCartFromStorage();
// //       if (JSON.stringify(updated) !== JSON.stringify(cart)) {
// //         setCart(Array.isArray(updated) ? updated : []);
// //       }
// //     };

// //     const onCartUpdated = () => syncFromStorage(); // نفس التبويب
// //     const onStorage = (e) => { if (e.key === CART_KEY) syncFromStorage(); }; // تبويبات أخرى

// //     window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
// //     window.addEventListener('storage', onStorage);
// //     return () => {
// //       window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
// //       window.removeEventListener('storage', onStorage);
// //     };
// //   }, [cart]);

// //   /** 4) تشغيل check-details بشكل مُجمّع */
// //   const buildPayload = useCallback(() => ({
// //     products: cart.map((item) => ({
// //       product_id: item.id,
// //       quantity: item.quantity,
// //       color: item.color_id ?? null,
// //     })),
// //     payment_method: paymentMethod,
// //     coupon_code: getCouponFromStorage()?.code || null,
// //   }), [cart, paymentMethod]);

// //   const prevPayloadRef = useRef('');

// // useEffect(() => {
// //   if (!cart || cart.length === 0) {
// //     _setOrderSummary(null);
// //     notifyOrderSummary(null);
// //     prevPayloadRef.current = '';
// //     return;
// //   }

// //   const payload = buildPayload();
// //   const key = JSON.stringify(payload);

// //   const isCartOrCheckout =
// //     pathname.endsWith('/shopping-cart') || pathname.endsWith('/checkout');

// //   if (key === prevPayloadRef.current || !isCartOrCheckout) return;

// //   prevPayloadRef.current = key;
// //   (async () => {
// //     setIsCheckingDetails(true);
// //     await coalescedCheckDetails(payload);
// //     setIsCheckingDetails(false);
// //   })();
// // }, [cart, paymentMethod, buildPayload, pathname]);

// //   /** 5) دوال التعديل (بدون بثّ يدوي) */
// //   const addItem = useCallback((product, quantity = 1) => {
// //     setCart((prev) => {
// //       const existing = prev.find((item) => item.id === product.id);
// //       const currentQty = existing ? existing.quantity : 0;
// //       const maxQty = product.stock;

// //       if ((currentQty + quantity > maxQty) && !product.stock_unlimited) {
// //         toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
// //         return prev;
// //       }

// //       return existing
// //         ? prev.map((item) =>
// //             item.id === product.id
// //               ? { ...item, quantity: item.quantity + quantity }
// //               : item
// //           )
// //         : [...prev, { ...product, quantity }];
// //     });
// //   }, []);

// //   const removeItem = useCallback((id) => {
// //     setCart((prev) => prev.filter((item) => item.id !== id));
// //   }, []);

// //   const updateQuantity = useCallback((id, quantity) => {
// //     const val = Number(quantity);
// //     if (val <= 0) return removeItem(id);
// //     setCart((prev) =>
// //       prev.map((item) => (item.id === id ? { ...item, quantity: val } : item))
// //     );
// //   }, [removeItem]);

// //   const clearCart = useCallback(() => {
// //     setCart([]);
// //     clearCartFromStorage(); // سيتم البثّ تلقائيًا عبر useEffect([cart])
// //   }, []);

// //   /** 6) أدوات مساعدة */
// //   const getTotalPrice = () =>
// //     cart.reduce(
// //       (sum, item) => sum + (item.price_after_discount ?? item.price) * item.quantity,
// //       0
// //     );

// //   const getShippingTotal = () =>
// //     cart.reduce(
// //       (sum, item) =>
// //         item.shipping_type === 'free_shipping'
// //           ? sum
// //           : sum + (item.shipping_rate_single ?? 0),
// //       0
// //     );

// //   const getItemQuantity = (id) =>
// //     cart.find((item) => item.id === id)?.quantity || 0;

// //   const getIsItemExisting = (productId) => cart.some((item) => item.id === productId);

// //   const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

// //   return {
// //     cart,
// //     addItem,
// //     removeItem,
// //     updateQuantity,
// //     clearCart,
// //     getTotalPrice,
// //     getItemQuantity,
// //     getShippingTotal,
// //     getIsItemExisting,
// //     getCartCount,

// //     // تفاصيل الطلب
// //     orderSummary,
// //     isCheckingDetails,
// //     runCheckDetails: () => { // يدويًا عند الحاجة
// //       const payload = buildPayload();
// //       prevPayloadRef.current = JSON.stringify(payload); // حتى لا يعيدها الـeffect مباشرة
// //       setIsCheckingDetails(true);
// //       return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
// //     },

// //     paymentMethod,
// //     setPaymentMethod,
// //     couponCode,
// //     setCouponCode,
// //   };
// // }


// import { useEffect, useState, useCallback, useRef } from 'react';
// import {
//   getCartFromStorage,
//   saveCartToStorage,
//   clearCartFromStorage,
//   CART_KEY,
//   CART_UPDATED_EVENT,
// } from '@/utils/cartStorage';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '@/hooks/useAuth';
// import { checkDetails } from '@/api/services/orders/checkDetails';
// import { getCouponFromStorage } from '@/utils/orderSummaryStorage';
// import { usePathname } from 'next/navigation';

// /** =======================
//  *  Helpers for SLIM cart items
//  *  ======================= */
// const firstImageUrl = (p) => p?.image_url || p?.media?.find?.(m => m.type === 'image')?.url || null;

// const slimProductForCart = (p) => ({
//   id: p.id,
//   name: p.name, // keep localized names
//   // pricing needed for totals
//   price: p.price,
//   price_after_discount: p.price_after_discount,
//   final_price_after_promotion: p.final_price_after_promotion,
//   // stock & policy
//   stock: p.stock,
//   stock_unlimited: !!p.stock_unlimited,
//   // shipping
//   shipping_type: p.shipping_type,
//   shipping_rate_single: p.shipping_rate_single ?? 0,
//   // color selection (if any)
//   color_id: p.color_id ?? null,
//   colors: Array.isArray(p.colors) ? p.colors.map(c => ({ id: c.id, color: c.color })) : [],
//   // a single lightweight image & a minimal media array to keep UI compatibility
//   image_url: firstImageUrl(p),
//   media: firstImageUrl(p) ? [{ type: 'image', url: firstImageUrl(p) }] : [],
// });

// // Lightweight signature for change detection (avoid heavy JSON.stringify on big objects)
// const cartSignature = (arr) => Array.isArray(arr)
//   ? arr.map(x => `${x.id}:${x.quantity}:${(x.final_price_after_promotion ?? x.price_after_discount ?? x.price)}`).join('|')
//   : '';

// /** =======================
//  *  Coalesced check-details
//  *  ======================= */
// // مجمّع مشترك لكل النسخ داخل نفس التبويب
// let ORDER_SUMMARY_SETTERS = new Set(); // نحدّث كل النسخ بنفس النتيجة
// let CHECK_DEBOUNCE_TIMER = null;
// let CHECK_INFLIGHT_PROMISE = null;
// let LAST_PAYLOAD_KEY = ''; // لمنع تكرار نفس الطلب
// const CHECK_DEBOUNCE_MS = 300;

// function notifyOrderSummary(summary) {
//   ORDER_SUMMARY_SETTERS.forEach((fn) => {
//     try { fn(summary); } catch {}
//   });
// }

// async function coalescedCheckDetails(payload) {
//   const key = JSON.stringify(payload);
//   // نفس الحمولة قيد الانتظار/التجهيز -> لا نكرر
//   if (key === LAST_PAYLOAD_KEY && (CHECK_INFLIGHT_PROMISE || CHECK_DEBOUNCE_TIMER)) {
//     return CHECK_INFLIGHT_PROMISE;
//   }
//   LAST_PAYLOAD_KEY = key;
//   if (CHECK_DEBOUNCE_TIMER) clearTimeout(CHECK_DEBOUNCE_TIMER);

//   // Debounce خفيف لدمج التغييرات المتتابعة
//   CHECK_INFLIGHT_PROMISE = new Promise((resolve) => {
//     CHECK_DEBOUNCE_TIMER = setTimeout(async () => {
//       CHECK_DEBOUNCE_TIMER = null;
//       try {
//         // نفّذ الطلب مرة واحدة فقط لكل التبويب مهما كان عدد النسخ
//         const res = await checkDetails(payload);
//         if (!res?.error) {
//           notifyOrderSummary(res.data);
//           resolve(res.data);
//         } else {
//           notifyOrderSummary(null);
//           resolve(null);
//         }
//       } catch (err) {
//         console.error('checkDetails failed', err);
//         notifyOrderSummary(null);
//         resolve(null);
//       } finally {
//         CHECK_INFLIGHT_PROMISE = null;
//       }
//     }, CHECK_DEBOUNCE_MS);
//   });

//   return CHECK_INFLIGHT_PROMISE;
// }

// export default function useCart() {
//   const { isAuthenticated } = useAuth();
//   const pathname = usePathname();
//   const [cart, setCart] = useState([]);
//   const [loaded, setLoaded] = useState(false);

//   const [orderSummary, _setOrderSummary] = useState(null);
//   const [isCheckingDetails, setIsCheckingDetails] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [couponCode, setCouponCode] = useState(null);

//   // كل نسخة من الهوك تسجّل Setter الخاص بها لتصلها نفس النتيجة
//   useEffect(() => {
//     ORDER_SUMMARY_SETTERS.add(_setOrderSummary);
//     return () => ORDER_SUMMARY_SETTERS.delete(_setOrderSummary);
//   }, []);

//   /** 1) التهيئة مرة واحدة + ترحيل العناصر الثقيلة إلى نسخة خفيفة */
//   useEffect(() => {
//     const storedCart = getCartFromStorage();
//     const base = Array.isArray(storedCart) ? storedCart : [];

//     const migrated = base.map((it) => {
//       if (!it) return it;
//       const looksHeavy = (
//         'description' in it ||
//         'categories' in it ||
//         'brands' in it ||
//         'promotion' in it ||
//         'related_products' in it ||
//         (Array.isArray(it.media) && it.media.length > 1)
//       );
//       if (looksHeavy || !('media' in it) || !('image_url' in it)) {
//         return { ...slimProductForCart(it), quantity: it.quantity ?? 1 };
//       }
//       return it;
//     });

//     setCart(migrated);
//     setLoaded(true);
//   }, []);

//   /** 2) احفظ ثم ابثّ الحدث */
//   useEffect(() => {
//     if (!loaded) return;
//     saveCartToStorage(cart);
//     window.dispatchEvent(new Event(CART_UPDATED_EVENT));
//   }, [cart, loaded]);

//   /** 3) مزامنة داخل نفس التبويب + بين التبويبات (بتوقيع خفيف) */
//   useEffect(() => {
//     const syncFromStorage = () => {
//       const updated = getCartFromStorage();
//       if (cartSignature(updated) !== cartSignature(cart)) {
//         setCart(Array.isArray(updated) ? updated : []);
//       }
//     };

//     const onCartUpdated = () => syncFromStorage(); // نفس التبويب
//     const onStorage = (e) => { if (e.key === CART_KEY) syncFromStorage(); }; // تبويبات أخرى

//     window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
//     window.addEventListener('storage', onStorage);
//     return () => {
//       window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
//       window.removeEventListener('storage', onStorage);
//     };
//   }, [cart]);

//   /** 4) تشغيل check-details بشكل مُجمّع */
//   const buildPayload = useCallback(() => ({
//     products: cart.map((item) => ({
//       product_id: item.id,
//       quantity: item.quantity,
//       color: item.color_id ?? null,
//     })),
//     payment_method: paymentMethod,
//     coupon_code: getCouponFromStorage()?.code || null,
//   }), [cart, paymentMethod]);

//   const prevPayloadRef = useRef('');

//   useEffect(() => {
//     if (!cart || cart.length === 0) {
//       _setOrderSummary(null);
//       notifyOrderSummary(null);
//       prevPayloadRef.current = '';
//       return;
//     }

//     const payload = buildPayload();
//     const key = JSON.stringify(payload);

//     const isCartOrCheckout =
//       pathname.endsWith('/shopping-cart') || pathname.endsWith('/checkout');

//     if (key === prevPayloadRef.current || !isCartOrCheckout) return;

//     prevPayloadRef.current = key;
//     (async () => {
//       setIsCheckingDetails(true);
//       await coalescedCheckDetails(payload);
//       setIsCheckingDetails(false);
//     })();
//   }, [cart, paymentMethod, buildPayload, pathname]);

//   /** 5) دوال التعديل (تخزين نسخة خفيفة فقط) */
//   const addItem = useCallback((product, quantity = 1) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       const currentQty = existing ? existing.quantity : 0;
//       const maxQty = product.stock;

//       if ((currentQty + quantity > maxQty) && !product.stock_unlimited) {
//         toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
//         return prev;
//       }

//       return existing
//         ? prev.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + quantity }
//               : item
//           )
//         : [...prev, { ...slimProductForCart(product), quantity }];
//     });
//   }, []);

//   const removeItem = useCallback((id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   }, []);

//   const updateQuantity = useCallback((id, quantity) => {
//     const val = Number(quantity);
//     if (val <= 0) return removeItem(id);
//     setCart((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, quantity: val } : item))
//     );
//   }, [removeItem]);

//   const clearCart = useCallback(() => {
//     setCart([]);
//     clearCartFromStorage(); // سيتم البثّ تلقائيًا عبر useEffect([cart])
//   }, []);

//   /** 6) أدوات مساعدة */
//   const getUnitPrice = (it) => (it.final_price_after_promotion ?? it.price_after_discount ?? it.price) || 0;

//   const getTotalPrice = () =>
//     cart.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0);

//   const getShippingTotal = () =>
//     cart.reduce(
//       (sum, item) =>
//         item.shipping_type === 'free_shipping'
//           ? sum
//           : sum + (item.shipping_rate_single ?? 0),
//       0
//     );

//   const getItemQuantity = (id) =>
//     cart.find((item) => item.id === id)?.quantity || 0;

//   const getIsItemExisting = (productId) => cart.some((item) => item.id === productId);

//   const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

//   return {
//     cart,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getItemQuantity,
//     getShippingTotal,
//     getIsItemExisting,
//     getCartCount,

//     // تفاصيل الطلب
//     orderSummary,
//     isCheckingDetails,
//     runCheckDetails: () => { // يدويًا عند الحاجة
//       const payload = buildPayload();
//       prevPayloadRef.current = JSON.stringify(payload); // حتى لا يعيدها الـeffect مباشرة
//       setIsCheckingDetails(true);
//       return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
//     },

//     paymentMethod,
//     setPaymentMethod,
//     couponCode,
//     setCouponCode,
//   };
// }

// import { useEffect, useState, useCallback, useRef, startTransition } from 'react';
// import {
//   getCartFromStorage,
//   saveCartToStorage,
//   clearCartFromStorage,
//   CART_KEY,
//   CART_UPDATED_EVENT,
// } from '@/utils/cartStorage';
// import { toast } from 'react-hot-toast';
// import { useAuth } from '@/hooks/useAuth';
// import { checkDetails } from '@/api/services/orders/checkDetails';
// import { getCouponFromStorage } from '@/utils/orderSummaryStorage';
// import { usePathname } from 'next/navigation';

// /** =======================
//  *  Slim cart helpers
//  *  ======================= */
// const firstImageUrl = (p) => p?.image_url || p?.media?.find?.(m => m.type === 'image')?.url || null;

// const slimProductForCart = (p) => ({
//   id: p.id,
//   name: p.name,
//   price: p.price,
//   price_after_discount: p.price_after_discount,
//   final_price_after_promotion: p.final_price_after_promotion,
//   stock: p.stock,
//   stock_unlimited: !!p.stock_unlimited,
//   shipping_type: p.shipping_type,
//   shipping_rate_single: p.shipping_rate_single ?? 0,
//   color_id: p.color_id ?? null,
//   colors: Array.isArray(p.colors) ? p.colors.map(c => ({ id: c.id, color: c.color })) : [],
//   image_url: firstImageUrl(p),
//   media: firstImageUrl(p) ? [{ type: 'image', url: firstImageUrl(p) }] : [],
// });

// const unitPrice = (it) => (it.final_price_after_promotion ?? it.price_after_discount ?? it.price) || 0;
// const cartSignature = (arr) => Array.isArray(arr) ? arr.map(x => `${x.id}:${x.quantity}:${unitPrice(x)}`).join('|') : '';

// /** =======================
//  *  Coalesced check-details
//  *  ======================= */
// let ORDER_SUMMARY_SETTERS = new Set();
// let CHECK_DEBOUNCE_TIMER = null;
// let CHECK_INFLIGHT_PROMISE = null;
// let LAST_PAYLOAD_KEY = '';
// const CHECK_DEBOUNCE_MS = 300;

// function notifyOrderSummary(summary) {
//   ORDER_SUMMARY_SETTERS.forEach((fn) => { try { fn(summary); } catch {} });
// }

// async function coalescedCheckDetails(payload) {
//   const key = JSON.stringify(payload);
//   if (key === LAST_PAYLOAD_KEY && (CHECK_INFLIGHT_PROMISE || CHECK_DEBOUNCE_TIMER)) return CHECK_INFLIGHT_PROMISE;
//   LAST_PAYLOAD_KEY = key;
//   if (CHECK_DEBOUNCE_TIMER) clearTimeout(CHECK_DEBOUNCE_TIMER);

//   CHECK_INFLIGHT_PROMISE = new Promise((resolve) => {
//     CHECK_DEBOUNCE_TIMER = setTimeout(async () => {
//       CHECK_DEBOUNCE_TIMER = null;
//       try {
//         const res = await checkDetails(payload);
//         if (!res?.error) { notifyOrderSummary(res.data); resolve(res.data); }
//         else { notifyOrderSummary(null); resolve(null); }
//       } catch (err) {
//         console.error('checkDetails failed', err);
//         notifyOrderSummary(null); resolve(null);
//       } finally { CHECK_INFLIGHT_PROMISE = null; }
//     }, CHECK_DEBOUNCE_MS);
//   });

//   return CHECK_INFLIGHT_PROMISE;
// }

// export default function useCart() {
//   const { isAuthenticated } = useAuth();
//   const pathname = usePathname();
//   const [cart, setCart] = useState([]);
//   const [loaded, setLoaded] = useState(false);

//   const [orderSummary, _setOrderSummary] = useState(null);
//   const [isCheckingDetails, setIsCheckingDetails] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('cash');
//   const [couponCode, setCouponCode] = useState(null);

//   // share order summary across hook instances
//   useEffect(() => {
//     ORDER_SUMMARY_SETTERS.add(_setOrderSummary);
//     return () => ORDER_SUMMARY_SETTERS.delete(_setOrderSummary);
//   }, []);

//   /** 1) init + migrate heavy items to slim form */
//   useEffect(() => {
//     const storedCart = getCartFromStorage();
//     const base = Array.isArray(storedCart) ? storedCart : [];
//     const migrated = base.map((it) => {
//       if (!it) return it;
//       const looksHeavy = (
//         'description' in it || 'categories' in it || 'brands' in it || 'promotion' in it || 'related_products' in it ||
//         (Array.isArray(it.media) && it.media.length > 1)
//       );
//       if (looksHeavy || !('media' in it) || !('image_url' in it)) {
//         return { ...slimProductForCart(it), quantity: it.quantity ?? 1 };
//       }
//       return it;
//     });
//     setCart(migrated);
//     setLoaded(true);
//   }, []);

//   /** 2) save (in idle) + broadcast */
//   useEffect(() => {
//     if (!loaded) return;
//     const run = () => {
//       saveCartToStorage(cart);
//       window.dispatchEvent(new Event(CART_UPDATED_EVENT));
//     };

//     let idleId = null; let t = null;
//     if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
//       idleId = window.requestIdleCallback(run, { timeout: 200 });
//       return () => { if (idleId) window.cancelIdleCallback?.(idleId); };
//     } else {
//       t = setTimeout(run, 0);
//       return () => clearTimeout(t);
//     }
//   }, [cart, loaded]);

//   /** 3) one-time listeners + lightweight comparison */
//   const cartSigRef = useRef(cartSignature(cart));
//   const setCartSafe = useCallback((next) => {
//     cartSigRef.current = cartSignature(next);
//     setCart(next);
//   }, []);

//   useEffect(() => {
//     const syncFromStorage = () => {
//       const updated = getCartFromStorage();
//       if (cartSignature(updated) !== cartSigRef.current) {
//         setCartSafe(Array.isArray(updated) ? updated : []);
//       }
//     };

//     const onCartUpdated = () => syncFromStorage();
//     const onStorage = (e) => { if (e.key === CART_KEY) syncFromStorage(); };

//     window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
//     window.addEventListener('storage', onStorage);
//     return () => {
//       window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
//       window.removeEventListener('storage', onStorage);
//     };
//   }, [setCartSafe]);

//   /** 4) check-details (only on cart/checkout) */
//   const buildPayload = useCallback(() => ({
//     products: cart.map((item) => ({ product_id: item.id, quantity: item.quantity, color: item.color_id ?? null })),
//     payment_method: paymentMethod,
//     coupon_code: getCouponFromStorage()?.code || null,
//   }), [cart, paymentMethod]);

//   const prevPayloadRef = useRef('');

//   useEffect(() => {
//     if (!cart || cart.length === 0) {
//       _setOrderSummary(null); notifyOrderSummary(null); prevPayloadRef.current = ''; return;
//     }

//     const isCartOrCheckout = pathname.endsWith('/shopping-cart') || pathname.endsWith('/checkout');
//     if (!isCartOrCheckout) return; // ✅ لا نبني الحمولة إذا لسنا في الصفحات المعنية

//     const payload = buildPayload();
//     const key = JSON.stringify(payload);
//     if (key === prevPayloadRef.current) return;

//     prevPayloadRef.current = key;
//     (async () => { setIsCheckingDetails(true); await coalescedCheckDetails(payload); setIsCheckingDetails(false); })();
//   }, [cart, paymentMethod, buildPayload, pathname]);

//   /** 5) mutations (transition to keep UI responsive) */
//   const addItem = useCallback((product, quantity = 1) => {
//     startTransition(() => {
//       setCartSafe((prev) => {
//         const existing = prev.find((item) => item.id === product.id);
//         const currentQty = existing ? existing.quantity : 0;
//         const maxQty = product.stock;

//         if ((currentQty + quantity > maxQty) && !product.stock_unlimited) {
//           toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
//           return prev;
//         }

//         return existing
//           ? prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
//           : [...prev, { ...slimProductForCart(product), quantity }];
//       });
//     });
//   }, [setCartSafe]);

//   const removeItem = useCallback((id) => {
//     startTransition(() => {
//       setCartSafe((prev) => prev.filter((item) => item.id !== id));
//     });
//   }, [setCartSafe]);

//   const updateQuantity = useCallback((id, quantity) => {
//     const val = Number(quantity);
//     if (val <= 0) return removeItem(id);
//     startTransition(() => {
//       setCartSafe((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: val } : item)));
//     });
//   }, [removeItem, setCartSafe]);

//   const clearCart = useCallback(() => {
//     startTransition(() => {
//       setCartSafe([]);
//       clearCartFromStorage();
//     });
//   }, [setCartSafe]);

//   /** 6) selectors */
//   const getTotalPrice = () => cart.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);
//   const getShippingTotal = () => cart.reduce((sum, item) => item.shipping_type === 'free_shipping' ? sum : sum + (item.shipping_rate_single ?? 0), 0);
//   const getItemQuantity = (id) => cart.find((item) => item.id === id)?.quantity || 0;
//   const getIsItemExisting = (productId) => cart.some((item) => item.id === productId);
//   const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

//   return {
//     cart,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getItemQuantity,
//     getShippingTotal,
//     getIsItemExisting,
//     getCartCount,

//     orderSummary,
//     isCheckingDetails,
//     runCheckDetails: () => {
//       const payload = buildPayload();
//       prevPayloadRef.current = JSON.stringify(payload);
//       setIsCheckingDetails(true);
//       return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
//     },

//     paymentMethod,
//     setPaymentMethod,
//     couponCode,
//     setCouponCode,
//   };
// }
import { useEffect, useState, useCallback, useRef, startTransition } from 'react';
import {
  getCartFromStorage,
  saveCartToStorage,
  clearCartFromStorage,
  CART_KEY,
  CART_UPDATED_EVENT,
} from '@/utils/cartStorage';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { checkDetails } from '@/api/services/orders/checkDetails';
import { getCouponFromStorage } from '@/utils/orderSummaryStorage';
import { usePathname } from 'next/navigation';




// --- helpers (unchanged from your slim version) ---
const firstImageUrl = (p) => p?.image_url || p?.media?.find?.(m => m.type === 'image')?.url || null;
const slimProductForCart = (p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  price_after_discount: p.price_after_discount,
  final_price_after_promotion: p.final_price_after_promotion,
  stock: p.stock,
  stock_unlimited: !!p.stock_unlimited,
  shipping_type: p.shipping_type,
  shipping_rate_single: p.shipping_rate_single ?? 0,
  color_id: p.color_id ?? null,
  colors: Array.isArray(p.colors) ? p.colors.map(c => ({ id: c.id, color: c.color })) : [],
  image_url: firstImageUrl(p),
  media: firstImageUrl(p) ? [{ type: 'image', url: firstImageUrl(p) }] : [],
});
const unitPrice = (it) => (it.final_price_after_promotion ?? it.price_after_discount ?? it.price) || 0;
const cartSignature = (arr) => Array.isArray(arr) ? arr.map(x => `${x.id}:${x.quantity}:${unitPrice(x)}`).join('|') : '';

// coalesced check-details (same as your perf pass) ...
let ORDER_SUMMARY_SETTERS = new Set();
let CHECK_DEBOUNCE_TIMER = null;
let CHECK_INFLIGHT_PROMISE = null;
let LAST_PAYLOAD_KEY = '';
const CHECK_DEBOUNCE_MS = 300;
function notifyOrderSummary(summary) { ORDER_SUMMARY_SETTERS.forEach((fn) => { try { fn(summary); } catch {} }); }
async function coalescedCheckDetails(payload) {
  const key = JSON.stringify(payload);
  if (key === LAST_PAYLOAD_KEY && (CHECK_INFLIGHT_PROMISE || CHECK_DEBOUNCE_TIMER)) return CHECK_INFLIGHT_PROMISE;
  LAST_PAYLOAD_KEY = key; if (CHECK_DEBOUNCE_TIMER) clearTimeout(CHECK_DEBOUNCE_TIMER);
  CHECK_INFLIGHT_PROMISE = new Promise((resolve) => {
    CHECK_DEBOUNCE_TIMER = setTimeout(async () => {
      CHECK_DEBOUNCE_TIMER = null;
      try { const res = await checkDetails(payload); if (!res?.error) { notifyOrderSummary(res.data); resolve(res.data); } else { notifyOrderSummary(null); resolve(null); } }
      catch { notifyOrderSummary(null); resolve(null); }
      finally { CHECK_INFLIGHT_PROMISE = null; }
    }, CHECK_DEBOUNCE_MS);
  });
  return CHECK_INFLIGHT_PROMISE;
}

export default function useCart() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [cart, _setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [orderSummary, _setOrderSummary] = useState(null);
  const [isCheckingDetails, setIsCheckingDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [couponCode, setCouponCode] = useState(null);

  // keep a signature ref for lightweight equality
  const sigRef = useRef('');
  const setCart = useCallback((next) => {
    const arr = typeof next === 'function' ? next(_getCart()) : next;
    sigRef.current = cartSignature(arr);
    _setCart(arr);
  }, []);
  const _getCart = useCallback(() => _setCart.current ?? [], []);
  useEffect(() => { _setCart.current = cart; }, [cart]);

  useEffect(() => { ORDER_SUMMARY_SETTERS.add(_setOrderSummary); return () => ORDER_SUMMARY_SETTERS.delete(_setOrderSummary); }, []);

  // 1) init + migrate
  useEffect(() => {
    const storedCart = getCartFromStorage();
    const base = Array.isArray(storedCart) ? storedCart : [];
    const migrated = base.map((it) => {
      if (!it) return it;
      const looksHeavy = ('description' in it) || ('categories' in it) || ('brands' in it) || ('promotion' in it) || ('related_products' in it) || (Array.isArray(it.media) && it.media.length > 1);
      return (looksHeavy || !('media' in it) || !('image_url' in it)) ? { ...slimProductForCart(it), quantity: it.quantity ?? 1 } : it;
    });
    sigRef.current = cartSignature(migrated);
    _setCart(migrated);
    setLoaded(true);
  }, []);

  // 2) save in idle + broadcast
  useEffect(() => {
    if (!loaded) return;
    const run = () => { saveCartToStorage(cart); window.dispatchEvent(new Event(CART_UPDATED_EVENT)); };
    let idleId = null, t = null;
    if ('requestIdleCallback' in window) { idleId = window.requestIdleCallback(run, { timeout: 200 }); return () => window.cancelIdleCallback?.(idleId); }
    t = setTimeout(run, 0); return () => clearTimeout(t);
  }, [cart, loaded]);

  // 3) sync listeners once
  useEffect(() => {
    const syncFromStorage = () => { const updated = getCartFromStorage(); const sig = cartSignature(updated); if (sig !== sigRef.current) { sigRef.current = sig; _setCart(Array.isArray(updated) ? updated : []); } };
    const onCartUpdated = () => syncFromStorage();
    const onStorage = (e) => { if (e.key === CART_KEY) syncFromStorage(); };
    window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated); window.removeEventListener('storage', onStorage); };
  }, []);

  // 4) check-details guard
  const buildPayload = useCallback(() => ({
    products: cart.map((item) => ({ product_id: item.id, quantity: item.quantity, color: item.color_id ?? null })),
    payment_method: paymentMethod,
    coupon_code: getCouponFromStorage()?.code || null,
  }), [cart, paymentMethod]);
  const prevPayloadRef = useRef('');
  useEffect(() => {
    if (!cart || cart.length === 0) { _setOrderSummary(null); notifyOrderSummary(null); prevPayloadRef.current = ''; return; }
    const isCartOrCheckout = pathname.endsWith('/shopping-cart') || pathname.endsWith('/checkout');
    if (!isCartOrCheckout) return;
    const payload = buildPayload();
    const key = JSON.stringify(payload);
    if (key === prevPayloadRef.current) return;
    prevPayloadRef.current = key;
    (async () => { setIsCheckingDetails(true); await coalescedCheckDetails(payload); setIsCheckingDetails(false); })();
  }, [cart, paymentMethod, buildPayload, pathname]);

  // 5) RAF-scheduled quantity updates (NEW)
  const rafRef = useRef(null);
  const pendingMapRef = useRef(new Map()); // id -> qty

  const flushPending = useCallback(() => {
    const updates = pendingMapRef.current; pendingMapRef.current = new Map(); rafRef.current = null;
    if (updates.size === 0) return;
    startTransition(() => {
      _setCart((prev) => {
        const next = prev.map((item) => {
          const q = updates.get(item.id);
          if (q == null) return item;
          if (q <= 0) return null; // سيتم تنقيتها
          return { ...item, quantity: q };
        }).filter(Boolean);
        sigRef.current = cartSignature(next);
        return next;
      });
    });
  }, []);

  const scheduleQuantity = useCallback((id, quantity) => {
    pendingMapRef.current.set(id, Number(quantity));
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(flushPending);
  }, [flushPending]);

  // public mutations
  const addItem = useCallback((product, quantity = 1) => {
    startTransition(() => {
      _setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        const currentQty = existing ? existing.quantity : 0;
        const maxQty = product.stock;
        if ((currentQty + quantity > maxQty) && !product.stock_unlimited) { toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`); return prev; }
        const next = existing
          ? prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
          : [...prev, { ...slimProductForCart(product), quantity }];
        sigRef.current = cartSignature(next); return next;
      });
    });
  }, []);

  const removeItem = useCallback((id) => { startTransition(() => { _setCart((prev) => { const next = prev.filter((i) => i.id !== id); sigRef.current = cartSignature(next); return next; }); }); }, []);

  const updateQuantity = useCallback((id, quantity) => { // legacy immediate
    const val = Number(quantity); if (val <= 0) return removeItem(id);
    startTransition(() => {
      _setCart((prev) => {
        const next = prev.map((item) => (item.id === id ? { ...item, quantity: val } : item));
        sigRef.current = cartSignature(next); return next;
      });
    });
  }, [removeItem]);

  const updateQuantityRaf = scheduleQuantity; // NEW: exported

  const clearCart = useCallback(() => { startTransition(() => { _setCart([]); clearCartFromStorage(); sigRef.current = ''; }); }, []);

  // selectors
  const getTotalPrice = () => cart.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);
  const getShippingTotal = () => cart.reduce((sum, item) => item.shipping_type === 'free_shipping' ? sum : sum + (item.shipping_rate_single ?? 0), 0);
  const getItemQuantity = (id) => cart.find((item) => item.id === id)?.quantity || 0;
  const getIsItemExisting = (productId) => cart.some((item) => item.id === productId);
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    updateQuantityRaf, // <— استخدمها للزر +/− السريع
    clearCart,
    getTotalPrice,
    getItemQuantity,
    getShippingTotal,
    getIsItemExisting,
    getCartCount,
    orderSummary,
    isCheckingDetails,
    runCheckDetails: () => {
      const payload = buildPayload();
      prevPayloadRef.current = JSON.stringify(payload);
      setIsCheckingDetails(true);
      return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
    },
    paymentMethod,
    setPaymentMethod,
    couponCode,
    setCouponCode,
  };
}

