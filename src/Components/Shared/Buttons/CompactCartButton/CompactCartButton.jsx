"use client";
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';
import styles from './CompactCartButton.module.css';

const CompactCartButton = forwardRef(({
  product,
  lang,
  addItem,
  removeItem,
  updateQuantity,
  getItemQuantity,
  getIsItemExisting,
  cart,
  isSyncing = false,
  variant = 'default', // 'default', 'minimal', 'compact'
  size = 'medium', // 'small', 'medium', 'large'
  showQuantityControls = true,
  className = ''
}, ref) => {
  const t = useTranslations('Cart');
  
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync with cart state
  useEffect(() => {
    const qty = getItemQuantity(product.id);
    setSelectedQty(qty > 0 ? qty : 1);
    setIsAddToCart(getIsItemExisting(product.id));
  }, [cart, product.id, getItemQuantity, getIsItemExisting]);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    increment: () => handleIncrement(),
    decrement: () => handleDecrement(),
    toggle: () => handleToggleCart(),
    getQuantity: () => selectedQty,
    isInCart: () => isAddToCart
  }));

  const handleToggleCart = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (isAddToCart) {
      removeItem(product.id);
      toast.custom(
        <CustomToast
          type="delete"
          title={t("removeSuccessTitle")}
          message={t("removeSuccessMessage", {
            name: product.name?.[lang]?.slice(0, 20) + (product.name?.[lang]?.length > 20 ? "..." : "")
          })}
        />,
        { position: 'top-left', duration: 2500 }
      );
    } else {
      addItem(product, selectedQty);
      toast.custom(
        <CustomToast
          type="success"
          title={t("addSuccessTitle")}
          message={t("addSuccessMessage", {
            name: product.name?.[lang]?.slice(0, 20) + (product.name?.[lang]?.length > 20 ? "..." : "")
          })}
        />,
            { position: 'top-left', duration: 2500 }
      );
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleIncrement = () => {
    const maxQty = product.stock_unlimited ? 999 : product.stock;
    if (selectedQty < maxQty) {
      const newQty = selectedQty + 1;
      setSelectedQty(newQty);
      if (isAddToCart) {
        updateQuantity(product.id, newQty);
      }
    }
  };

  const handleDecrement = () => {
    if (selectedQty > 1) {
      const newQty = selectedQty - 1;
      setSelectedQty(newQty);
      if (isAddToCart) {
        updateQuantity(product.id, newQty);
      }
    } else if (isAddToCart) {
      removeItem(product.id);
    }
  };

  const isDisabled = (!product.availability || (product.stock <= 0 && !product.stock_unlimited));

  if (variant === 'minimal') {
    return (
      <div className={`${styles.compactContainer} ${styles[size]} ${className}`}>
      <button
        onClick={handleToggleCart}
        disabled={isDisabled || isAnimating}
        className={`${styles.minimalButton} ${styles[size]} ${isAddToCart ? styles.active : ''} ${isAnimating ? styles.animating : ''} ${className}`}
      >
        <div className={styles.iconWrapper}>
          {isAnimating ? (
            <div className={styles.loadingSpinner} />
          ) : isAddToCart ? (
            <Check size={16} />
          ) : (
            <ShoppingCart size={16} />
          )}
        </div>
      </button>

       {/* Quantity Controls */}
       {isAddToCart && showQuantityControls && (
        <div className={`${styles.quantityControls} ${isAddToCart ? styles.show : ''}`}>
          <button
            onClick={handleDecrement}
            disabled={selectedQty <= 1}
            className={styles.quantityBtn}
          >
            <Minus size={12} />
          </button>
          <span className={styles.quantityDisplay}>{selectedQty}</span>
          <button
            onClick={handleIncrement}
            disabled={selectedQty >= (product.stock_unlimited ? 999 : product.stock)}
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
            {isAnimating ? (
              <div className={styles.loadingSpinner} />
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>{isAddToCart ? t('added') : t('addToCart')}</span>
              </>
            )}
          </div>
        </button>

        {/* Quantity Controls */}
        {isAddToCart && showQuantityControls && (
          <div className={`${styles.quantityControls} ${isAddToCart ? styles.show : ''}`}>
            <button
              onClick={handleDecrement}
              disabled={selectedQty <= 1}
              className={styles.quantityBtn}
            >
              <Minus size={12} />
            </button>
            <span className={styles.quantityDisplay}>{selectedQty}</span>
            <button
              onClick={handleIncrement}
              disabled={selectedQty >= (product.stock_unlimited ? 999 : product.stock)}
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
            ) : (
              <ShoppingCart size={18} />
            )}
          </div>
          
          <span className={styles.buttonText}>
            {isAddToCart ? t('removeFromCart') : t('addToCart')}
          </span>

          {isSyncing && (
            <div className={styles.syncIndicator}>
              <div className={styles.syncSpinner} />
            </div>
          )}
        </button>

        {/* Quantity Controls - Desktop Horizontal */}
        {isAddToCart && showQuantityControls && (
          <div className={`${styles.quantityWrapper} ${isAddToCart ? styles.show : ''}`}>
            <button
              onClick={handleDecrement}
              disabled={selectedQty <= 1}
              className={styles.quantityButton}
            >
              <Minus size={14} />
            </button>
            
            <div className={styles.quantityValue}>
              {selectedQty}
            </div>
            
            <button
              onClick={handleIncrement}
              disabled={selectedQty >= (product.stock_unlimited ? 999 : product.stock)}
              className={styles.quantityButton}
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Quantity Controls - Mobile Vertical */}
      {isAddToCart && showQuantityControls && (
        <div className={`${styles.quantityWrapperMobile} ${isAddToCart ? styles.show : ''}`}>
          <button
            onClick={handleDecrement}
            disabled={selectedQty <= 1}
            className={styles.quantityButton}
          >
            <Minus size={14} />
          </button>
          
          <div className={styles.quantityValue}>
            {selectedQty}
          </div>
          
          <button
            onClick={handleIncrement}
            disabled={selectedQty >= (product.stock_unlimited ? 999 : product.stock)}
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

export default CompactCartButton;
