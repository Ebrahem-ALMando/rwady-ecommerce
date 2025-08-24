"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useTranslations } from "next-intl";
import { saveOrder } from '@/api/services/saveOrder';
import { clearCouponFromStorage, getCouponFromStorage, saveCouponToStorage } from '@/utils/orderSummaryStorage';

import styles from './OrderSummary.module.css';
import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { checkCouponIcon } from "@/utils/Icons";
import { CircleX, CheckCircle, Loader } from "lucide-react";
import { validateOrderData } from "@/utils/Valid/validateOrderData";
import useCart from "@/hooks/useCart";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { checkCoupon } from "@/api/services/checkCoupon";
import UploadPaymentModal from "@/Components/Checkout/Payment/UploadPaymentModal/UploadPaymentModal";
import { formatDiscount } from "@/utils/formatDiscount";

const OrderSummary = (props) => {
  const t = useTranslations("OrderSummary");

  const [couponData, setCouponData] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // سنعرض snapshot مستقرة لتفاصيل الملخّص لتجنّب الوميض أثناء حسابات الخلفية
  const [displaySummary, setDisplaySummary] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedPaymentProof, setUploadedPaymentProof] = useState(null);
  const [identity, setIdentity] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const {
    cart,
    clearCart,
    setPaymentMethod,
    setCouponCode,
    couponCode,
    runCheckDetails,
    orderSummary, // <-- مباشرة من الهوك
    runCheckDetailsDirectOrder ,
    setIsDirectOrder,
    setDirectOrder,
    } = useCart();

  // Prefetch
  useEffect(() => {
    if (pathname === '/shopping-cart') {
      router.prefetch(`/${props.lang}/checkout`);
    }
  }, [pathname, props.lang, router]);

  // حدث تغيّر الملخص القادم من الهوك -> ثبّته في displaySummary (أو صفّره إن كان null)
  useEffect(() => {
    if (orderSummary) {
    
      setDisplaySummary(prev =>
        JSON.stringify(prev) !== JSON.stringify(orderSummary) ? orderSummary : prev
      );
    } else {
      setDisplaySummary(null);
    }
  }, [orderSummary]);

  // حمّل كوبون محفوظ
  useEffect(() => {
    const saved = getCouponFromStorage();
    if (saved) setCouponData(saved);
  }, []);

  // ضبط وسيلة الدفع من الـprops
  useEffect(() => {
    if (props.paymentType) setPaymentMethod(props.paymentType);
  }, [props.paymentType, setPaymentMethod]);

  useEffect(()=>{
 
   
    if(props.isDirectOrder && props.mode === 'direct_order'){  
        setIsDirectOrder(true);
        setDirectOrder(props.directOrder);
        runCheckDetailsDirectOrder( props.directOrder);
    }
  },[props.isDirectOrder,props.mode,props.directOrder]);
  const handleCheckCoupon = async () => {
    if (!couponCode?.trim()) {
      toast.custom(
        <CustomToast type="warning" title={t("couponMissing")} message={t("couponExample")} />,
        { position: 'top-center', duration: 2500 }
      );
      return;
    }

    setIsChecking(true);
    try {
      const result = await checkCoupon(couponCode);
      if (!result?.error && result?.data?.is_active) {
        const data = {
          discount_type: result?.data?.type,
          discount: result?.data?.amount,
          code: couponCode.toUpperCase(),
        };
        setCouponData(data);
        saveCouponToStorage(data);
        toast.custom(
          <CustomToast
            type="success"
            title={t("couponAppliedTitle")}
            message={
              data.discount_type === "fixed"
                ? t("couponAppliedMessageFixed", { amount: data.discount })
                : t("couponAppliedMessagePercent", { amount: data.discount })
            }
          />,
          { position: 'top-center', duration: 2500 }
        );
      } else {
        toast.custom(
          <CustomToast type="error" title={t("invalidCouponTitle")} message={t("invalidCouponMessage")} />,
          { position: 'top-center', duration: 2500 }
        );
        setCouponData(false);
        clearCouponFromStorage();
      }
    } catch (error) {
      console.log(error);
      setCouponData(false);
      clearCouponFromStorage();
    } finally {
      setIsChecking(false);
      setCouponCode('');
    }

    if(!props.isDirectOrder){
      runCheckDetails();
    }
    else if(props.isDirectOrder && props.mode === 'direct_order'){
      runCheckDetailsDirectOrder(props.directOrder);
    }

  };

  const handleCompleteOrder = async () => {
    if (pathname === '/shopping-cart') {
      router.push(`/${props.lang}/checkout`);
      return;
    }

    if (pathname === '/checkout') {
      if (props.paymentType === "transfer" && !uploadedPaymentProof) {
        setShowUploadModal(true);
        return;
      }
      if (props.step === 1 ) { 
        props.next(); 
        return;
      }
      const isValid = validateOrderData({
        addressId: props.addressId,
        paymentType: props.paymentType,
        identity,
        cart,
        uploadedFile: uploadedPaymentProof,
        directOrder: props.directOrder,
        t
      });
      if (!isValid) return;
      if (props.step === 2 ) {
        props.next();
        return;
      }
      try {
        setIsProcessing(true);

        const body = {
          products: (props.isDirectOrder && props.mode === 'direct_order') ? [props.directOrder] : 
          cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            color: item?.color_id ?? null,
          })),
          success_url: `${window.location.origin}/${props.lang}/orders/`,
          fail_url: `${window.location.origin}/${props.lang}/checkout?state=failure`,
          payment_method: props.paymentType,
          notes: props.orderNotes,
          coupon_code: props.couponCode,
          address: {
            extra_address: props.extraAddress,
            latitude: props.latitude,
            longitude: props.longitude,
          },
          ...(uploadedPaymentProof && { attached: uploadedPaymentProof }),
          ...(props.paymentType === "installment" && { identity }),
            direct_order: props.isDirectOrder && props.mode === 'direct_order',
        };

        const result = await saveOrder(body);
        sessionStorage.setItem('orderPlaced', 'true');

        if (!result.error) {
         if(!props.isDirectOrder){
          clearCart();
         }
         else if(props.isDirectOrder && props.mode === 'direct_order'){
          sessionStorage.removeItem('buyDirectly');
          props.setIsDirectOrder(false);
          props.setDirectOrder({});
          props.setMode(null);
          setIsDirectOrder(false);
          setDirectOrder({});
         }
          clearCouponFromStorage();
          sessionStorage.setItem('placedOrderId', result?.data?.id);
          setDisplaySummary(null);
          setUploadedPaymentProof(null);
          setIdentity('');

          toast.custom(
            <CustomToast type="success" title={t("successTitle")} message={t("successMsg")} />,
            { position: 'top-center', duration: 2500 }
          );

          switch (props.paymentType) {
            case "qi":
              if (result.data?.metadata?.formUrl) {
                window.location.href = result.data.metadata.formUrl;
              } else {
                toast.error(t("failMsg"));
              }
              break;
            case "cash":
              router.push(`/${props.lang}/checkout?state=success`);
              break;
            case "installment":
              router.push(`/${props.lang}/checkout?state=installment`);
              break;
            case "transfer":
              router.push(`/${props.lang}/checkout?state=externel`);
              break;
            default:
              toast.custom(
                <CustomToast type="success" title={t("successTitle")} message={t("successMsg")} />,
                { position: 'top-center', duration: 2500 }
              );
              router.push(`/${props.lang}/checkout?state=success`);
              break;
          }
        } else {
          if (result.message === "رقم البطاقة المستخدمة في الاختبار غير صحيحة") {
            toast.custom(
              <CustomToast type="error" title={t("invalidIdentityTitle")} message={t("invalidIdentityNumber")} />,
              { position: 'top-center', duration: 2500 }
            );
          } else {
            toast.error(t("failMsg"));
          }
          router.push(`/${props.lang}/checkout?state=failure&mode=${props.mode}`);
         
        }
      } catch (error) {
        console.error("Order Error:", error.message);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div style={props.style} className={styles.summary}>
      <h3 className={styles.titleSummary}>{t("summaryTitle")}</h3>
      <hr className={styles.line} />
      <p>{t("haveCoupon")}</p>

      <div className={styles.inputContainer}>
        <motion.input
          value={couponCode || ''}
          onChange={(e) => setCouponCode(e.target.value)}
          whileFocus={{ boxShadow: '0 0 8px rgba(245, 81, 87, 0.3)' }}
          className={styles.inputCoupon}
          type="text"
          placeholder={t("enterCoupon")}
          maxLength={15}
        />
        {checkCouponIcon}
        <motion.button
          className={styles.buttonInput}
          onClick={handleCheckCoupon}
          disabled={isChecking}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isChecking ? (
            <motion.span
              style={{ display: 'inline-block' }}
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, repeatType: "loop", duration: 1, ease: "easeInOut" }}
            >
              <Loader />
            </motion.span>
          ) : t("add")}
        </motion.button>
      </div>

      <RowTextWithNumber
        title={t("productsTotal")}
        value={displaySummary ? `${displaySummary.amount} IQD` : '...'}
        colorValue="#0741AD"
      />

      <AnimatePresence>
        {couponData && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <RowTextWithNumber
              title={`${t("coupon")}: ${couponData.code}`}
              value={displaySummary ? formatDiscount(couponData) : '...'}
              colorValue="#FF647C"
              colorTitle="#00C48C"
              icon={<CheckCircle className={styles.checkIcon} />}
            />
          </motion.div>
        )}

        {couponData === false && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RowTextWithNumber
              isNotValid
              title={t("invalidCoupon")}
              value="0 IQD"
              colorTitle="#FF647C"
              colorValue="#FF647C"
              icon={<CircleX className={styles.errorIcon} />}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <RowTextWithNumber
        title={displaySummary?.promotion_free_shipping ? t("freeShipping") : t("shippingCost")}
        value={displaySummary ? `${displaySummary.shipping_fees} IQD` : '...'}
        colorValue={displaySummary?.promotion_free_shipping ? "#f9b808" : "#0741AD"}
      />
  {
      props.isDirectOrder && props.mode === 'direct_order'&&(
        <RowTextWithNumber
          title={t("order_type")}
          value={props.isDirectOrder && props.mode === 'direct_order' ? t("direct_order") : t("normal_order")}
          colorValue="#0741AD"
        />
        )
  }

      <button onClick={() => setShowDetails(prev => !prev)} className={styles.toggleDetails}>
        {showDetails ? t("hideDetails") : t("showDetails")}
        <span className={showDetails ? styles.arrowUp : styles.arrowDown} />
      </button>

      <AnimatePresence>   
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.detailsContainer}
          >
            <RowTextWithNumber
              title={t("totalWithShipping")}
              value={displaySummary ? `${displaySummary.amount_with_shipping} IQD` : '...'}
              colorValue="#0741AD"
            />
            <RowTextWithNumber
              title={t("couponDiscount")}
              value={displaySummary ? `${displaySummary.coupon_discount_value || 0} IQD` : '...'}
              colorValue="#FF647C"
            />
            <RowTextWithNumber
              title={t("paymentFees")}
              value={displaySummary ? `${displaySummary.payment_fees_value || 0} IQD` : '...'}
              colorValue="#0741AD"
            />
              {displaySummary?.installment_count > 1 && (
              <RowTextWithNumber
                title={t("monthlyInstallment")}
                value={`${Math.round(displaySummary.amount_with_shipping_after_coupon_and_payment_fees / displaySummary.installment_count)} IQD × ${displaySummary.installment_count}`}
                colorValue="#0741AD"
              />
            )}
       
            {displaySummary?.promotion_cart_total && (
              <div className={styles.promotionSection}>
                <p className={styles.promotionDetailsTitle}>{t("promotionDetailsTitle")}</p>
                <RowTextWithNumber
              
                  title={t("promotionCartTotal")}
                  value={`${displaySummary.promotion_cart_total_discount_value || 0} IQD`}
                  colorValue="#f9b808"

                />
                <div className={styles.promotionDetails}>
                  <p className={styles.promotionTitle}>
                    {displaySummary.promotion_cart_total.title?.[props.lang] || displaySummary.promotion_cart_total.title?.ar || t("promotionTitle")}
                  </p>
                  <p className={styles.promotionType}>
                    {displaySummary.promotion_cart_total.discount_type === "percentage" 
                      ? `${t("promotionPercentage")}: ${displaySummary.promotion_cart_total.discount_value}%`
                      : `${t("promotionFixed")}: ${displaySummary.promotion_cart_total.discount_value} IQD`
                    }
                  </p>
                </div>
              </div>
            )}

         
            {displaySummary?.promotion_free_shipping && (
              <div className={styles.promotionSection}>
                <p className={styles.promotionDetailsTitle}>{t("promotionDetailsTitle")}</p>
                <RowTextWithNumber
                  title={t("promotionShipping")}
                  value={`${displaySummary.shipping_fees || 0} IQD`}
                  colorValue="#f9b808"
           
                />
                <div className={styles.promotionDetails}>
                  <p className={styles.promotionTitle}>
                    {displaySummary.promotion_free_shipping.title?.[props.lang] || displaySummary.promotion_free_shipping.title?.ar || t("promotionTitle")}
                  </p>
                  <p className={styles.promotionType}>
                    {displaySummary.promotion_free_shipping.discount_type === "percentage" 
                      ? `${t("promotionPercentage")}: ${displaySummary.promotion_free_shipping.discount_value}%`
                      : `${t("promotionFixed")}: ${displaySummary.promotion_free_shipping.discount_value} IQD`
                    }
                  </p>
                </div>
              </div>
            )}
            
        
          </motion.div>
        )}
      </AnimatePresence>

      {props.paymentName && (
        <AnimatePresence>
          <hr className={styles.line} />
          <motion.div
            key="paymentDetails"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mb-4 border p-4 rounded-md bg-gray-50"
          >
            <h4 className="text-sm font-semibold mb-2 text-gray-800">{t("paymentDetails")}</h4>
            <p className="text-sm mb-3 text-gray-600">
              {t("selectedMethod")}: {props.paymentName}
            </p>

            <AnimatePresence>
              {props.paymentType === "installment" && (
                <motion.div
                  key="installment-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2"
                >
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {t("identityNumberLabel")}
                    <span className="text-red-500 ml-1 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    value={identity ?? ''}
                    onChange={(e) => setIdentity(e.target.value.replace(/\D/g, ""))}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t("identityNumberPlaceholder")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}

      <hr className={styles.line} />
      <RowTextWithNumber
        title={t("grandTotal")}
        value={displaySummary ? `${displaySummary?.amount_with_shipping_after_coupon_and_payment_fees} IQD` : '...'}
        colorTitle="#000"
        weightTitle="500"
        sizeValue="18px"
        colorValue="#0741AD"
      />

      <RowTextWithNumber
        title={t("taxNote")}
        star="*"
        colorTitle="#A5A5A5"
        sizeTitle="14px"
        weightTitle="400"
      />

      {showUploadModal && (
        <UploadPaymentModal
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={(url) => {
            setUploadedPaymentProof(url);
            setShowUploadModal(false);
            toast.success(t("paymentProofUploaded"));
          }}
        />
      )}

      {!props.hideButtonCompleting && (
        <button
          className={styles.completeProcess}
          onClick={handleCompleteOrder}
          disabled={isProcessing}
        >
          {isProcessing ? t("sending") : t("completeOrder")}
        </button>
      )}
    </div>
  );
};

export default OrderSummary;
