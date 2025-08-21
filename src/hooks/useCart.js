import { useEffect, useState, useCallback, useRef } from 'react';
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

/** =======================
 *  Coalesced check-details
 *  ======================= */

// مجمّع مشترك لكل النسخ داخل نفس التبويب
let ORDER_SUMMARY_SETTERS = new Set(); // نحدّث كل النسخ بنفس النتيجة
let CHECK_DEBOUNCE_TIMER = null;
let CHECK_INFLIGHT_PROMISE = null;
let LAST_PAYLOAD_KEY = ''; // لمنع تكرار نفس الطلب
const CHECK_DEBOUNCE_MS = 300;

function notifyOrderSummary(summary) {
  ORDER_SUMMARY_SETTERS.forEach((fn) => {
    try { fn(summary); } catch {}
  });
}

async function coalescedCheckDetails(payload) {
  const key = JSON.stringify(payload);

  // نفس الحمولة قيد الانتظار/التجهيز -> لا نكرر
  if (key === LAST_PAYLOAD_KEY && (CHECK_INFLIGHT_PROMISE || CHECK_DEBOUNCE_TIMER)) {
    return CHECK_INFLIGHT_PROMISE;
  }

  LAST_PAYLOAD_KEY = key;

  if (CHECK_DEBOUNCE_TIMER) clearTimeout(CHECK_DEBOUNCE_TIMER);

  // Debounce خفيف لدمج التغييرات المتتابعة
  CHECK_INFLIGHT_PROMISE = new Promise((resolve) => {
    CHECK_DEBOUNCE_TIMER = setTimeout(async () => {
      CHECK_DEBOUNCE_TIMER = null;
      try {
        // نفّذ الطلب مرة واحدة فقط لكل التبويب مهما كان عدد النسخ
        const res = await checkDetails(payload);
        if (!res?.error) {
          notifyOrderSummary(res.data);
          resolve(res.data);    
        } else {
          notifyOrderSummary(null);
          resolve(null);
        }
      } catch (err) {
        console.error('checkDetails failed', err);
        notifyOrderSummary(null);
        resolve(null);
      } finally {
        CHECK_INFLIGHT_PROMISE = null;
      }
    }, CHECK_DEBOUNCE_MS);
  });

  return CHECK_INFLIGHT_PROMISE;
}

export default function useCart() {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [orderSummary, _setOrderSummary] = useState(null);
  const [isCheckingDetails, setIsCheckingDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [couponCode, setCouponCode] = useState(null);

  // كل نسخة من الهوك تسجّل Setter الخاص بها لتصلها نفس النتيجة
  useEffect(() => {
    ORDER_SUMMARY_SETTERS.add(_setOrderSummary);
    return () => ORDER_SUMMARY_SETTERS.delete(_setOrderSummary);
  }, []);

  /** 1) التهيئة مرة واحدة */
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(Array.isArray(storedCart) ? storedCart : []);
    setLoaded(true);
  }, []);

  /** 2) احفظ ثم ابثّ الحدث */
  useEffect(() => {
    if (!loaded) return;
    saveCartToStorage(cart);
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }, [cart, loaded]);

  /** 3) مزامنة داخل نفس التبويب + بين التبويبات */
  useEffect(() => {
    const syncFromStorage = () => {
      const updated = getCartFromStorage();
      if (JSON.stringify(updated) !== JSON.stringify(cart)) {
        setCart(Array.isArray(updated) ? updated : []);
      }
    };

    const onCartUpdated = () => syncFromStorage(); // نفس التبويب
    const onStorage = (e) => { if (e.key === CART_KEY) syncFromStorage(); }; // تبويبات أخرى

    window.addEventListener(CART_UPDATED_EVENT, onCartUpdated);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, onCartUpdated);
      window.removeEventListener('storage', onStorage);
    };
  }, [cart]);

  /** 4) تشغيل check-details بشكل مُجمّع */
  const buildPayload = useCallback(() => ({
    products: cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      color: item.color_id ?? null,
    })),
    payment_method: paymentMethod,
    coupon_code: getCouponFromStorage()?.code || null,
  }), [cart, paymentMethod]);

  const prevPayloadRef = useRef('');
  useEffect(() => {
    // لا تعمل أي شيء إذا السلة فاضية
    if (!cart || cart.length === 0) {
      _setOrderSummary(null);
      notifyOrderSummary(null);
      prevPayloadRef.current = '';
      return;
    }

    const payload = buildPayload();
    const key = JSON.stringify(payload);
    if (key === prevPayloadRef.current) return; // نفس الحمولة بالضبط

    prevPayloadRef.current = key;
    (async () => {
      setIsCheckingDetails(true);
      await coalescedCheckDetails(payload); // سيحدث كل النسخ عبر notifyOrderSummary
      setIsCheckingDetails(false);
    })();
  }, [cart, paymentMethod, buildPayload]);

  /** 5) دوال التعديل (بدون بثّ يدوي) */
  const addItem = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const maxQty = product.stock;

      if ((currentQty + quantity > maxQty) && !product.stock_unlimited) {
        toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
        return prev;
      }

      return existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { ...product, quantity }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    const val = Number(quantity);
    if (val <= 0) return removeItem(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: val } : item))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart([]);
    clearCartFromStorage(); // سيتم البثّ تلقائيًا عبر useEffect([cart])
  }, []);

  /** 6) أدوات مساعدة */
  const getTotalPrice = () =>
    cart.reduce(
      (sum, item) => sum + (item.price_after_discount ?? item.price) * item.quantity,
      0
    );

  const getShippingTotal = () =>
    cart.reduce(
      (sum, item) =>
        item.shipping_type === 'free_shipping'
          ? sum
          : sum + (item.shipping_rate_single ?? 0),
      0
    );

  const getItemQuantity = (id) =>
    cart.find((item) => item.id === id)?.quantity || 0;

  const getIsItemExisting = (productId) => cart.some((item) => item.id === productId);

  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

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

    // تفاصيل الطلب
    orderSummary,
    isCheckingDetails,
    runCheckDetails: () => { // يدويًا عند الحاجة
      const payload = buildPayload();
      prevPayloadRef.current = JSON.stringify(payload); // حتى لا يعيدها الـeffect مباشرة
      setIsCheckingDetails(true);
      return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
    },

    paymentMethod,
    setPaymentMethod,
    couponCode,
    setCouponCode,
  };
}
