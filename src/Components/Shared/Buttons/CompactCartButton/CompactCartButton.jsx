"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, memo } from 'react';
import { ShoppingCart, Plus, Minus, Check, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';
import styles from './CompactCartButton.module.css';

/**
 * CompactCartButton (Debounced Quantity Flush)
 * - يحدّث واجهة العداد فورًا (setState محلي)
 * - يؤجّل تحديث السلة الحقيقية 500ms بعد آخر كبسة
 * - يلغي الاعتماد على cart في props (يُزامن عبر حدث cart-updated)
 * - يحترم minimum_purchase / maximum_purchase والمخزون
 */

const CompactCartButton = forwardRef(({
  product,
  lang,
  addItem,
  removeItem,
  updateQuantity,         // مسار تقليدي
  updateQuantityRaf,      // إن كان موجودًا من useCart سيُستعمل عند التفريغ
  getItemQuantity,
  getIsItemExisting,
  isSyncing = false,
  variant = 'default', // 'default', 'minimal', 'compact'
  size = 'medium',     // 'small', 'medium', 'large'
  showQuantityControls = true,
  debounceMs = 700,    // <— المدة قبل تفريغ التحديث للسلة
  className = '',
}, ref) => {
  const t = useTranslations('Cart');

  const minQty = product?.minimum_purchase ?? 1;
  const stockMax = product?.stock_unlimited ? Infinity : (product?.stock ?? 0);
  const policyMax = product?.maximum_purchase ?? Infinity;
  const maxQty = Math.min(stockMax, policyMax);

  const [isAddToCart, setIsAddToCart] = useState(false);
  const [selectedQty, setSelectedQty] = useState(minQty);
  const [isAnimating, setIsAnimating] = useState(false);


  const syncFromCart = () => {
    const q = getItemQuantity?.(product.id) ?? 0;
    setSelectedQty(q > 0 ? q : minQty);
    setIsAddToCart(!!getIsItemExisting?.(product.id));
  };

  useEffect(() => {
    syncFromCart();
    const onUpdated = () => syncFromCart();
    window.addEventListener('cart-updated', onUpdated);
    return () => window.removeEventListener('cart-updated', onUpdated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, getItemQuantity, getIsItemExisting]);


  useImperativeHandle(ref, () => ({
    increment: () => handleIncrement(),
    decrement: () => handleDecrement(),
    toggle: () => handleToggleCart(),
    getQuantity: () => selectedQty,
    isInCart: () => isAddToCart
  }));

  // ======= Debounced Flush =======
  const pendingQtyRef = useRef(null);
  const debounceIdRef = useRef(null);

  const clearDebounce = () => {
    if (debounceIdRef.current) {
      clearTimeout(debounceIdRef.current);
      debounceIdRef.current = null;
    }
  };

  const flushQty = () => {
    clearDebounce();
    const q = pendingQtyRef.current;
    pendingQtyRef.current = null;
    if (q == null) return;
    if (!isAddToCart) return; 
 
    if (typeof updateQuantityRaf === 'function') {
      updateQuantityRaf(product.id, q);
    } else if (typeof updateQuantity === 'function') {
      updateQuantity(product.id, q);
    }
   
 
  };

  const scheduleDebouncedFlush = () => {
    
    clearDebounce();
    debounceIdRef.current = setTimeout(flushQty, debounceMs);
  
  };

 
  useEffect(() => {

    const onPointerUp = () => flushQty();
    const onVisibility = () => { if (document.hidden) flushQty(); };

    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('visibilitychange', onVisibility);
      flushQty(); 
    };
 
  }, []); 


  const showAddedToast = () => {
    toast.custom(
      <CustomToast
        type="success"
        title={t('addSuccessTitle')}
        message={t('addSuccessMessage', {
          name: product?.name?.[lang]?.slice(0, 20) + ((product?.name?.[lang]?.length || 0) > 20 ? '...' : '')
        })}
      />,
      { position: 'top-left', duration: 1800 }
    );
  };

  const showRemovedToast = () => {
    toast.custom(
      <CustomToast
        type="delete"
        title={t('removeSuccessTitle')}
        message={t('removeSuccessMessage', {
          name: product?.name?.[lang]?.slice(0, 20) + ((product?.name?.[lang]?.length || 0) > 20 ? '...' : '')
        })}
      />,
      { position: 'top-left', duration: 1600 }
    );
  };


  const handleToggleCart = () => {

    if (isAnimating) return;
    setIsAnimating(true);


    clearDebounce();
    pendingQtyRef.current = null;

    if (isAddToCart) {
      removeItem?.(product.id);
      showRemovedToast();
    } else {
      const initial = Math.min(
        Math.max(selectedQty, minQty),
        maxQty === Infinity ? selectedQty : Math.max(1, Math.min(selectedQty, maxQty))
      );
      addItem?.(product, initial);
      showAddedToast();
    }

    setIsAnimating(false);
  };

  const handleIncrement = () => {

    const next = Math.min(
      (selectedQty || minQty) + 1,
      maxQty === Infinity ? Number.MAX_SAFE_INTEGER : maxQty
    );
    if (next === selectedQty) return;
    setSelectedQty(next);           
    pendingQtyRef.current = next;  
    scheduleDebouncedFlush();     
  };

  const handleDecrement = () => {
    const next = Math.max(minQty, (selectedQty || minQty) - 1);
    if (next === selectedQty) return;
    setSelectedQty(next);

    if (isAddToCart) {
      if (next < minQty) {
        clearDebounce();
        pendingQtyRef.current = null;
        removeItem?.(product.id);
      } else {
        pendingQtyRef.current = next;
        scheduleDebouncedFlush();
      }
    }

  };

  const isDisabled = (!product?.availability || ((product?.stock ?? 0) <= 0 && !product?.stock_unlimited));

  // ======= عناصر مساعدة للرسم =======
  const QtyControls = (
    <div className={`${styles.quantityWrapper} ${isAddToCart ? styles.show : ''} ${isDisabled ? styles.disabled : ''}`}>
      <button onClick={handleDecrement} disabled={selectedQty <= minQty || isDisabled} aria-label='decrement' className={styles.quantityButton}>
        <Minus size={14} />
      </button>
      <div className={styles.quantityValue}>{selectedQty}</div>
      <button
        onClick={handleIncrement}
        disabled={(maxQty !== Infinity && selectedQty >= maxQty) || isDisabled}
        aria-label='increment'
        className={styles.quantityButton}
      >
        <Plus size={14} />
      </button>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className={`${styles.compactContainer} ${styles[size]} ${className}`}>
        <button
          onClick={handleToggleCart}
          disabled={isDisabled || isAnimating}
          className={`${styles.minimalButton} ${styles[size]} ${isAddToCart ? styles.active : ''} ${isAnimating ? styles.animating : ''} ${className} ${isDisabled ? styles.disabled : ''}`}
        >
          <div className={styles.iconWrapper}>
            {isAnimating ? (
              <div className={styles.loadingSpinner} />
            ) : isAddToCart ? (
              <Check size={16} />
          ):(
              <ShoppingCart size={16} />
            )}
          </div>
        </button>
        {isAddToCart && showQuantityControls && (
          <div className={`${styles.quantityControls} ${isAddToCart ? styles.show : ''} `}>
            <button onClick={handleDecrement} disabled={selectedQty <= minQty || isDisabled} className={styles.quantityBtn}>
              <Minus size={12} />
            </button>
            <span className={styles.quantityDisplay}>{selectedQty}</span>
            <button
              onClick={handleIncrement}
              disabled={(maxQty !== Infinity && selectedQty >= maxQty) || isDisabled}
              className={styles.quantityBtn}
            >
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${styles.compactContainer} ${styles[size]} ${className}`}>
        <button
          onClick={handleToggleCart}
          disabled={isDisabled || isAnimating}
          className={`${styles.compactButton} ${isAddToCart ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
        >
          <div className={styles.buttonContent}>
            {isAnimating  ? (
              <div className={styles.loadingSpinner} />
            ) : isDisabled ? (
              <>
                <XCircle size={14} />
                <span>{t('outOfStock')}</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>{isAddToCart ? t('added') : t('addToCart')}</span>
              </>
            )}
          </div>
        </button>
        {isAddToCart && showQuantityControls && (
          <div className={`${styles.quantityControls} ${isAddToCart ? styles.show : ''} ${isDisabled ? styles.disabled : ''}`}>
            <button onClick={handleDecrement} disabled={selectedQty <= minQty || isDisabled} aria-label='decrement' className={styles.quantityBtn}>
              <Minus size={12} />
            </button>
            <span className={styles.quantityDisplay}>{selectedQty}</span>
            <button
              onClick={handleIncrement}
              disabled={(maxQty !== Infinity && selectedQty >= maxQty) || isDisabled}
              aria-label='increment'
              className={styles.quantityBtn}
            >
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${styles.defaultContainer} ${styles[size]} ${className}`}>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleToggleCart}
          disabled={isDisabled || isAnimating}
          className={`${styles.defaultButton} ${isAddToCart ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
        >
          <div className={`${styles.buttonIcon} ${isAddToCart ? styles.iconActive : ''} ${isAnimating ? styles.animating : ''}`}>
            {isAnimating ? (
              <div className={styles.loadingSpinner} />
            ) : isDisabled ? (
              <XCircle size={18} />
            ) : (
              <ShoppingCart size={18} />
            )}
          </div>
          <span className={styles.buttonText}>
            {isDisabled ? t('outOfStock') : isAddToCart ? t('removeFromCart') : t('addToCart')}
          </span>
          {isSyncing && (
            <div className={styles.syncIndicator}>
              <div className={styles.syncSpinner} />
            </div>
          )}
        </button>

        {/* Quantity Controls - Desktop Horizontal */}
        {isAddToCart && showQuantityControls && QtyControls}
      </div>

      {/* Quantity Controls - Mobile Vertical */}
      {isAddToCart && showQuantityControls && (
        <div className={`${styles.quantityWrapperMobile} ${isAddToCart ? styles.show : ''} ${isDisabled ? styles.disabled : ''}`}>
          <button onClick={handleDecrement} disabled={selectedQty <= minQty || isDisabled} aria-label='decrement' className={styles.quantityButton}>
            <Minus size={14} />
          </button>
          <div className={styles.quantityValue}>{selectedQty}</div>
          <button
            onClick={handleIncrement}
                  disabled={(maxQty !== Infinity && selectedQty >= maxQty) || isDisabled}
                  aria-label='increment'
              className={styles.quantityButton}
          >
            <Plus size={14} />
          </button>
        </div>
      )}
    </div>
  );
});

CompactCartButton.displayName = 'CompactCartButton';

export default memo(CompactCartButton);
