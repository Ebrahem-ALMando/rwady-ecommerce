/**
 * Cart Sync Helper Utilities
 * مساعدات مزامنة السلة
 */

import { getCartFromStorage, saveCartToStorage, clearCartFromStorage } from '@/utils/cartStorage';

/**
 * تحقق من وجود سلة محلية
 * @returns {boolean}
 */
export const hasLocalCart = () => {
  const localCart = getCartFromStorage();
  return Array.isArray(localCart) && localCart.length > 0;
};

/**
 * الحصول على عدد العناصر في السلة المحلية
 * @returns {number}
 */
export const getLocalCartItemCount = () => {
  const localCart = getCartFromStorage();
  if (!Array.isArray(localCart)) return 0;
  return localCart.reduce((total, item) => total + (item.quantity || 0), 0);
};

/**
 * طباعة تفاصيل السلة المحلية (للتطوير)
 */
export const logLocalCart = () => {
  const localCart = getCartFromStorage();
  console.group('🛒 Local Cart Details');
  console.log('Items count:', localCart?.length || 0);
  console.log('Total quantity:', getLocalCartItemCount());
  console.log('Items:', localCart);
  console.groupEnd();
};

/**
 * إنشاء سلة تجريبية (للتطوير والاختبار)
 * @param {Array} testItems - عناصر تجريبية
 */
export const createTestCart = (testItems = []) => {
  const defaultTestItems = [
    {
      id: 1,
      name: { ar: 'منتج تجريبي 1', en: 'Test Product 1' },
      price: 100,
      quantity: 2,
      image_url: '/test-image.jpg'
    },
    {
      id: 2, 
      name: { ar: 'منتج تجريبي 2', en: 'Test Product 2' },
      price: 200,
      quantity: 1,
      image_url: '/test-image-2.jpg'
    }
  ];
  
  const items = testItems.length > 0 ? testItems : defaultTestItems;
  saveCartToStorage(items);
  console.log('🧪 Test cart created with', items.length, 'items');
  return items;
};

/**
 * مسح السلة المحلية مع تأكيد
 */
export const clearLocalCartWithConfirm = () => {
  if (hasLocalCart()) {
    const confirmed = window.confirm('هل تريد حذف السلة المحلية؟');
    if (confirmed) {
      clearCartFromStorage();
      console.log('🗑️ Local cart cleared');
      return true;
    }
    return false;
  }
  console.log('📭 No local cart to clear');
  return true;
};

/**
 * معلومات حالة المزامنة
 * @param {Object} cartState - حالة السلة من useCart
 */
export const logSyncStatus = (cartState) => {
  console.group('🔄 Cart Sync Status');
  console.log('Is Authenticated:', cartState.isAuthenticated);
  console.log('Is Syncing:', cartState.isSyncing);
  console.log('Synced on Login:', cartState.syncedOnLogin);
  console.log('Cart Items:', cartState.cart?.length || 0);
  console.log('Local Cart Items:', getLocalCartItemCount());
  
  // معلومات إضافية عن cartItemId
  if (Array.isArray(cartState.cart)) {
    const itemsWithCartId = cartState.cart.filter(item => item.cartItemId).length;
    const itemsWithoutCartId = cartState.cart.length - itemsWithCartId;
    console.log('Cart ID Status:', {
      withCartItemId: itemsWithCartId,
      withoutCartItemId: itemsWithoutCartId,
      items: cartState.cart.map(item => ({
        productId: item.id,
        cartItemId: item.cartItemId || 'missing',
        quantity: item.quantity
      }))
    });
  }
  
  console.groupEnd();
};

/**
 * مراقبة أحداث السلة (للتطوير)
 */
export const watchCartEvents = () => {
  if (typeof window === 'undefined') return;
  
  let originalConsoleLog = console.log;
  
  // مراقبة تحديثات localStorage
  window.addEventListener('storage', (e) => {
    if (e.key === 'rwady-cart') {
      console.log('📦 Cart storage changed:', {
        oldValue: e.oldValue,
        newValue: e.newValue
      });
    }
  });
  
  // مراقبة أحداث السلة المخصصة
  window.addEventListener('cart-updated', () => {
    console.log('🔄 Cart updated event fired');
  });
  
  console.log('👀 Cart event watching enabled');
};

export default {
  hasLocalCart,
  getLocalCartItemCount,
  logLocalCart,
  createTestCart,
  clearLocalCartWithConfirm,
  logSyncStatus,
  watchCartEvents
};
