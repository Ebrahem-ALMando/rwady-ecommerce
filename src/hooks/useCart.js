
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
import { addToCart } from '@/api/services/cart/addToCart';
import { deleteCartItem } from '@/api/services/cart/deleteCartItem';
import { updateCartItem } from '@/api/services/cart/updateCartItem';

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
  image_url: firstImageUrl(p),
  cartItemId: p.cartItemId ?? null,
  brands: p.brands || null,
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
  const [isDirectOrder, setIsDirectOrder] = useState(false);
  const [directOrder, setDirectOrder] = useState({});
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
  const buildPayloadDirectOrder = useCallback((directOrder) => ({
    products: [directOrder],
    payment_method: paymentMethod,
    coupon_code: getCouponFromStorage()?.code || null,
  }), [directOrder, paymentMethod]);
  const prevPayloadRef = useRef('');
  useEffect(() => {
    if(isDirectOrder && directOrder){
  
      const payload = buildPayloadDirectOrder(directOrder);
      const key = JSON.stringify(payload);
      if (key === prevPayloadRef.current) return;
      prevPayloadRef.current = key;
      (async () => { setIsCheckingDetails(true); await coalescedCheckDetails(payload); setIsCheckingDetails(false); })();
      
      return;
    }
    if (!cart || cart.length === 0 && !isDirectOrder) { _setOrderSummary(null); notifyOrderSummary(null); prevPayloadRef.current = ''; return; }
    const isCartOrCheckout = pathname.endsWith('/shopping-cart') || pathname.endsWith('/checkout');
    if (!isCartOrCheckout) return;
    const payload = buildPayload();
    const key = JSON.stringify(payload);
    if (key === prevPayloadRef.current) return;
    prevPayloadRef.current = key;
    (async () => { setIsCheckingDetails(true); await coalescedCheckDetails(payload); setIsCheckingDetails(false); })();
  }, [cart, paymentMethod, buildPayload, pathname, buildPayloadDirectOrder,isDirectOrder,directOrder]);

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
    // Always update local cart first for UI responsiveness
    let cartItemId = null;
    _setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const maxQty = product.stock;
      if ((currentQty + quantity > maxQty) && !product.stock_unlimited) {
        toast.error(`لا يمكنك إضافة أكثر من ${maxQty} قطعة من هذا المنتج`);
        return prev;
      }
      // If already exists, keep cartItemId if present
      cartItemId = existing?.cartItemId ?? null;
      const next = existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity, cartItemId }
              : item
          )
        : [
            ...prev,
            { ...slimProductForCart(product), quantity, cartItemId: null },
          ];
      sigRef.current = cartSignature(next);
      return next;
    });

    // If authenticated, sync with backend and update cartItemId if needed
    if (isAuthenticated) {
      (async () => {
        try {
          const payload = {
            product_id: product.id,
            quantity,
            color_id: product.color_id ?? null,
          };
          const res = await addToCart(payload);
          if (res?.error) {
            // toast.error(res?.message || 'حدث خطأ أثناء مزامنة المنتج مع السيرفر');
            return;
          }
          const newCartItemId = res?.data?.id ?? null;
          // Update cartItemId in local cart for this product
          _setCart((prev) =>
            prev.map((item) =>
              item.id === product.id
                ? { ...item, cartItemId: newCartItemId }
                : item
            )
          );
        } catch (e) {
          toast.error('حدث خطأ أثناء مزامنة المنتج مع السيرفر');
        }
      })();
    }
  }, [isAuthenticated]);



  const removeItem = useCallback((id) => {
    startTransition(() => {
      _setCart((prev) => {
        // Find the cart item to get its cartItemId
        const itemToRemove = prev.find((i) => i.id === id);
        const cartItemId = itemToRemove?.cartItemId ?? null;

        // If authenticated and cartItemId exists, delete from server
        if (isAuthenticated && cartItemId) {
          (async () => {
            try {
              const res = await deleteCartItem(cartItemId);
              if (res?.error) {
                // toast.error(res?.message || 'حدث خطأ أثناء حذف المنتج من السيرفر');
                return;
              }
            } catch (e) {
              toast.error('حدث خطأ أثناء حذف المنتج من السيرفر');
            }
          })();
        }

        // Always remove from local cart
        const next = prev.filter((i) => i.id !== id);
        sigRef.current = cartSignature(next);
        return next;
      });
    });
  }, [isAuthenticated]);



  const updateQuantity = useCallback((id, quantity) => {
    const val = Number(quantity);
    if (val <= 0) return removeItem(id);

    startTransition(() => {
      _setCart((prev) => {
        // Find the cart item to get its cartItemId
        const itemToUpdate = prev.find((item) => item.id === id);
        const cartItemId = itemToUpdate?.cartItemId || null;
        // If authenticated and cartItemId exists, update on server
        if (isAuthenticated && cartItemId) {

          (async () => {
            try { 
              const res = await updateCartItem(cartItemId, { quantity: val });
              if (res?.error) {
                // toast.error(res?.message || 'حدث خطأ أثناء تحديث الكمية في السيرفر');
                return;
              }
            } catch (e) {
              toast.error('حدث خطأ أثناء تحديث الكمية في السيرفر');
            }
          })();
        }

        // Always update in local storage
        const next = prev.map((item) =>
          item.id === id ? { ...item, quantity: val } : item
        );
        sigRef.current = cartSignature(next);
        return next;
      });
    });
  }, [removeItem, isAuthenticated]);

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
    updateQuantityRaf, 
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
    runCheckDetailsDirectOrder: (directOrder) => {
   
      const payload = buildPayloadDirectOrder(directOrder);
      // prevPayloadRef.current = JSON.stringify(payload);
      setIsCheckingDetails(true);
      return coalescedCheckDetails(payload).finally(() => setIsCheckingDetails(false));
    },
    paymentMethod,
    setPaymentMethod,
    couponCode,
    setCouponCode,
    directOrder,
    setDirectOrder,
    isDirectOrder,  
    setIsDirectOrder,
  };
}
