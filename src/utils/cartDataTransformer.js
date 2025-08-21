/**
 * Cart Data Transformer Utilities
 * أدوات تحويل بيانات السلة بين البنية المحلية وبنية السيرفر
 */

/**
 * تحويل بيانات السلة من السيرفر إلى البنية المحلية
 * @param {Array} serverCartItems - عناصر السلة من السيرفر
 * @returns {Array} عناصر السلة بالبنية المحلية
 */
export const transformServerCartToLocal = (serverCartItems) => {
  if (!Array.isArray(serverCartItems)) {
    return [];
  }

  return serverCartItems.map(item => {
    // البنية المتوقعة من السيرفر:
    // {
    //   id: cart_item_id,
    //   product_id: product_id,
    //   quantity: quantity,
    //   color_id: color_id,
    //   product: { /* product data */ }
    // }

    const productId = item.product_id || item.product?.id;
    
    if (!productId) {
      console.warn('Cart item missing product_id:', item);
      return null;
    }

    return {
      // البنية المحلية: id = product_id للتوافق مع الكود الحالي
      id: productId,
      cartItemId: item.id, // cart_item_id للتعامل مع السيرفر
      quantity: item.quantity || 0,
      color_id: item.color_id || null,
      
      // نسخ بيانات المنتج
      ...(item.product || {}),
      
      // التأكد من أن id يبقى product_id وليس cart_item_id
      id: productId
    };
  }).filter(Boolean); // إزالة العناصر null
};

/**
 * تحويل عنصر واحد من السلة من السيرفر إلى البنية المحلية
 * @param {Object} serverCartItem - عنصر السلة من السيرفر
 * @returns {Object|null} عنصر السلة بالبنية المحلية
 */
export const transformSingleServerCartItem = (serverCartItem) => {
  if (!serverCartItem || typeof serverCartItem !== 'object') {
    return null;
  }

  const transformed = transformServerCartToLocal([serverCartItem]);
  return transformed.length > 0 ? transformed[0] : null;
};

/**
 * تحويل بيانات السلة المحلية إلى بنية مناسبة لإرسال للسيرفر
 * @param {Array} localCartItems - عناصر السلة المحلية
 * @returns {Array} عناصر السلة بالبنية المناسبة للسيرفر
 */
export const transformLocalCartToServer = (localCartItems) => {
  if (!Array.isArray(localCartItems)) {
    return [];
  }

  return localCartItems.map(item => ({
    product_id: item.id, // id في البنية المحلية = product_id
    quantity: item.quantity || 1,
    color_id: item.color_id || null
  }));
};

/**
 * استخراج cart_item_id من عنصر السلة المحلية
 * @param {Object} localCartItem - عنصر السلة المحلية
 * @returns {number|null} cart_item_id أو null إذا لم يكن موجود
 */
export const getCartItemId = (localCartItem) => {
  return localCartItem?.cartItemId || null;
};

/**
 * التحقق من وجود cart_item_id في عنصر السلة
 * @param {Object} localCartItem - عنصر السلة المحلية
 * @returns {boolean} true إذا كان cart_item_id موجود
 */
export const hasCartItemId = (localCartItem) => {
  return Boolean(localCartItem?.cartItemId);
};

/**
 * إضافة cart_item_id إلى عنصر السلة المحلية
 * @param {Object} localCartItem - عنصر السلة المحلية
 * @param {number} cartItemId - cart_item_id من السيرفر
 * @returns {Object} عنصر السلة مع cart_item_id المحدث
 */
export const addCartItemId = (localCartItem, cartItemId) => {
  return {
    ...localCartItem,
    cartItemId
  };
};

/**
 * طباعة معلومات تحويل البيانات للتطوير
 * @param {Array} serverData - البيانات من السيرفر
 * @param {Array} localData - البيانات المحلية
 */
export const logDataTransformation = (serverData, localData) => {
  console.group('🔄 Cart Data Transformation');
  console.log('Server data:', serverData);
  console.log('Local data:', localData);
  console.log('Items count:', {
    server: serverData?.length || 0,
    local: localData?.length || 0
  });
  
  if (Array.isArray(localData)) {
    const itemsWithCartId = localData.filter(hasCartItemId).length;
    const itemsWithoutCartId = localData.length - itemsWithCartId;
    console.log('Cart ID status:', {
      withCartId: itemsWithCartId,
      withoutCartId: itemsWithoutCartId
    });
  }
  
  console.groupEnd();
};

export default {
  transformServerCartToLocal,
  transformSingleServerCartItem,
  transformLocalCartToServer,
  getCartItemId,
  hasCartItemId,
  addCartItemId,
  logDataTransformation
};

