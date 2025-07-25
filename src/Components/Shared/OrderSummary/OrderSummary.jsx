// "use client";
//
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'react-hot-toast';
// import { usePathname, useRouter } from 'next/navigation';
//
//
//
// import { saveOrder } from '@/api/services/saveOrder';
// import { clearCouponFromStorage, getCouponFromStorage, saveCouponToStorage } from '@/utils/orderSummaryStorage';
//
// import styles from './OrderSummary.module.css';
// import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
// import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
// import { checkCoupon } from '@/api/services/checkCoupon';
// import { checkCouponIcon } from "@/utils/Icons";
// import { calculateDiscount, calculateTotalAfterDiscount } from "@/utils/cartCalculations";
// import { CircleX, CheckCircle, Loader } from "lucide-react";
// import {validateOrderData} from "@/utils/Valid/validateOrderData";
// import useCart from "@/hooks/useCart";
//
// const OrderSummary = (props) => {
//     const [couponCode, setCouponCode] = useState('');
//     const [couponData, setCouponData] = useState(null);
//     const [isChecking, setIsChecking] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//
//     const { cart, clearCart } = useCart();
//     const router = useRouter();
//     const pathname = usePathname();
//
//     useEffect(() => {
//         const saved = getCouponFromStorage();
//         if (saved) {
//             setCouponData(saved);
//         }
//     }, []);
//
//     const handleCheckCoupon = async () => {
//         if (!couponCode.trim()) {
//             toast.custom(
//                 <CustomToast
//                     type="warning"
//                     title="الرجاء إدخال كود الخصم"
//                     message="مثال : RRF2025"
//                 />,
//                 { position: 'top-center', duration: 2500 }
//             );
//             return;
//         }
//
//         setIsChecking(true);
//         setTimeout(()=>{
//             toast.custom(
//                     <CustomToast
//                         type="ingo"
//                         title="قيد التطوير"
//                         message="..."
//                     />,
//                     { position: 'top-center', duration: 2500 })
//             setIsChecking(false);
//         },2500)
//         // try {
//         //     const result = await checkCoupon(couponCode);
//         //
//         //     if (result.status_code === 200 && result.data.isvalid) {
//         //         const data = {
//         //             discount_type: result.data.discount_type,
//         //             discount: result.data.discount,
//         //             code: couponCode.toUpperCase(),
//         //         };
//         //         setCouponData(data);
//         //         saveCouponToStorage(data);
//         //
//         //         let val = data.discount_type === "fixed"
//         //             ? `${data.discount} IQD`
//         //             : `${data.discount} %`;
//         //
//         //         toast.custom(
//         //             <CustomToast
//         //                 type="success"
//         //                 title="تم تطبيق الخصم"
//         //                 message={`تم خصم ${val} بنجاح`}
//         //             />,
//         //             { position: 'top-center', duration: 2500 }
//         //         );
//         //     }
//         // } catch (error) {
//         //     toast.custom(
//         //         <CustomToast
//         //             type="error"
//         //             title="كوبون غير صالح"
//         //             message="الرجاء التحقق من الكود والمحاولة مرة أخرى"
//         //         />,
//         //         { position: 'top-center', duration: 2500 }
//         //     );
//         //     setCouponData(false);
//         //     clearCouponFromStorage();
//         // } finally {
//         //     setIsChecking(false);
//         //     setCouponCode('');
//         // }
//     };
//
//
//     const handleCompleteOrder = async () => {
//
//         if (pathname === '/shopping-cart') {
//             router.push('/checkout');
//             return;
//         }
//
//         if (pathname === '/checkout')
//         {
//
//             if (!validateOrderData({
//             addressId: props.addressId,
//             paymentMethodId: props.paymentMethodId,
//             cart,
//             paymentType: props.paymentType,
//             uploadedFile: props.uploadedFile,
//         })) return;
//
//             try {
//                 setIsProcessing(true);
//
//                 const formData = new FormData();
//                 formData.append('order_date', new Date().toLocaleDateString('en-GB'));
//                 formData.append('products', JSON.stringify(
//                     cart.map(item => ({
//                         product_id: item.id,
//                         quantity: item.quantity
//                     }))
//                 ));
//                 formData.append('address_id', props.addressId);
//                 formData.append('payment_method_id', props.paymentMethodId);
//
//                 if (props.uploadedFile&&props.paymentType==="externel") {
//                     formData.append('image', props.uploadedFile);
//                 }
//
//                 const result = await saveOrder(formData);
//
//                 if (result && result.status_code === 200) {
//                     clearCart();
//                     clearCouponFromStorage();
//
//                     toast.custom(
//                         <CustomToast
//                             type="success"
//                             title="تم إرسال الطلب بنجاح"
//                             message="سنتابع معالجة طلبك الآن."
//                         />,
//                         { position: 'top-center', duration: 2500 }
//                     );
//                     sessionStorage.setItem('orderPlaced', 'true');
//
//                     if (result.data.payment_url) {
//                         window.location.href = result.data.payment_url;
//                     }
//                     else if (props.paymentType==="externel"){
//
//                         router.push('/checkout?state=externel');
//                     }
//                     else {
//                         router.push('/checkout?state=success');
//                     }
//                 } else {
//                     toast.custom(
//                         <CustomToast
//                             type="error"
//                             title="فشل في إرسال الطلب"
//                             message="حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً."
//                         />,
//                         { position: 'top-center', duration: 3000 }
//                     );
//                 }
//             } catch (error) {
//                 console.error("Order Error:", error.message);
//
//                 toast.custom(
//                     <CustomToast
//                         type="error"
//                         title="خطأ في الاتصال"
//                         message="تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى."
//                     />,
//                     { position: 'top-center', duration: 3000 }
//                 );
//             } finally {
//                 setIsProcessing(false);
//             }
//
//         }
//
//
//     };
//
//     return (
//         <div style={props.style} className={styles.summary}>
//             <h3 className={styles.titleSummary}>ملخص الطلب</h3>
//             <hr className={styles.line} />
//             <p>هل لديك كود خصم</p>
//
//             <div className={styles.inputContainer}>
//                 <motion.input
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     whileFocus={{ boxShadow: '0 0 8px rgba(245, 81, 87, 0.3)' }}
//                     className={styles.inputCoupon}
//                     type="text"
//                     placeholder="أدخل كود الخصم"
//                     maxLength={15}
//                 />
//                 {checkCouponIcon}
//                 <motion.button
//                     className={styles.buttonInput}
//                     onClick={handleCheckCoupon}
//                     disabled={isChecking}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {isChecking ? (
//                         <motion.span
//                             style={{ display: 'inline-block' }}
//                             animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
//                             transition={{ repeat: Infinity, repeatType: "loop", duration: 1, ease: "easeInOut" }}
//                         >
//                             <Loader />
//                         </motion.span>
//                     ) : 'إضافة'}
//                 </motion.button>
//             </div>
//
//             <RowTextWithNumber
//                 title="مجموع المنتجات"
//                 value={`${Number(props.getTotalPrice())} IQD`}
//                 colorValue="#0741AD"
//             />
//
//             <AnimatePresence>
//                 {couponData && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
//                         <RowTextWithNumber
//                             title={`كوبون ${couponData.code}`}
//                             value={`${calculateDiscount(couponData, props.getTotalPrice())} IQD`}
//                             colorValue="#FF647C"
//                             colorTitle="#00C48C"
//                             icon={<CheckCircle className={styles.checkIcon} />}
//                         />
//                     </motion.div>
//                 )}
//
//                 {couponData === false && (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                         <RowTextWithNumber
//                             isNotValid
//                             title="كوبون غير صالح"
//                             value="0 IQD"
//                             colorTitle="#FF647C"
//                             colorValue="#FF647C"
//                             icon={<CircleX className={styles.errorIcon} />}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//
//             <RowTextWithNumber
//                 title="رسوم الشحن"
//                 value={`${props.getShippingTotal()} IQD`}
//                 colorValue="#0741AD"
//             />
//
//             <hr className={styles.line} />
//
//             <RowTextWithNumber
//                 title="الإجمالي"
//                 value={`${calculateTotalAfterDiscount(props.getTotalPrice(), props.getShippingTotal(), calculateDiscount(couponData, props.getTotalPrice()))} IQD`}
//                 colorTitle="#000"
//                 weightTitle="500"
//                 sizeValue="18px"
//                 colorValue="#0741AD"
//             />
//
//             <RowTextWithNumber
//                 title="الأسعار شاملة للضريبة"
//                 star="*"
//                 colorTitle="#A5A5A5"
//                 sizeTitle="14px"
//                 weightTitle="400"
//             />
//
//             {!props.hideButtonCompleting && (
//                 <button
//                     className={styles.completeProcess}
//                     onClick={handleCompleteOrder}
//                     disabled={isProcessing}
//                 >
//                     {isProcessing ? 'جاري الإرسال...' : 'إتمام الطلب'}
//                 </button>
//             )}
//         </div>
//     );
// };
//
// export default OrderSummary;


"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useTranslations } from "next-intl";

import { saveOrder } from '@/api/services/saveOrder';
import {clearCouponFromStorage, getCouponFromStorage, saveCouponToStorage} from '@/utils/orderSummaryStorage';

import styles from './OrderSummary.module.css';
import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { checkCouponIcon } from "@/utils/Icons";
import { calculateDiscount, calculateTotalAfterDiscount } from "@/utils/cartCalculations";
import { CircleX, CheckCircle, Loader } from "lucide-react";
import { validateOrderData } from "@/utils/Valid/validateOrderData";
import useCart from "@/hooks/useCart";
import {usePathname} from "@/i18n/navigation";
import {useRouter} from "next/navigation";
import {getCartFromStorage} from "@/utils/cartStorage";
import {checkCoupon} from "@/api/services/checkCoupon";
import UploadPaymentModal from "@/Components/Checkout/Payment/UploadPaymentModal/UploadPaymentModal";
import {formatDiscount} from "@/utils/formatDiscount";
const OrderSummary = (props) => {
    const t = useTranslations("OrderSummary");
    // const [couponCode, setCouponCode] = useState('');
    const [couponData, setCouponData] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSummary, setOrderSummary] = useState(null);
    const [displaySummary, setDisplaySummary] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedPaymentProof, setUploadedPaymentProof] = useState(null);
    const [identity, setIdentity] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    // useEffect(() => {
    //
    //     if (props.paymentType === "installment" && props.identity) {
    //         setIdentity(props.identity);
    //     }
    // }, [props.paymentType, props.identity]);


    const {
        cart,
        clearCart,
        setPaymentMethod,
        setCouponCode,
        couponCode,
        runCheckDetails,
        // orderSummary,
        initializeSummaryUpdater,
    } = useCart();


    useEffect(() => {
        initializeSummaryUpdater(setOrderSummary);
    }, []);
    useEffect(() => {
        if (pathname === '/shopping-cart') {
            router.prefetch(`/${props.lang}/checkout`);
        }
    }, [pathname, props.lang, router]);

    useEffect(() => {
        if (orderSummary) {
            setDisplaySummary((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(orderSummary)) {
                    return orderSummary;
                }
                return prev;
            });
        }
    }, [orderSummary]);


    useEffect(() => {
        const saved = getCouponFromStorage();
        if (saved) {
            setCouponData(saved);
        }
    }, []);

    useEffect(() => {
        if (props.paymentType) {
            setPaymentMethod(props.paymentType);
        }
    }, [props.paymentType]);

    const handleCheckCoupon = async () => {
        if (!couponCode?.trim()) {
            toast.custom(
                <CustomToast
                    type="warning"
                    title={t("couponMissing")}
                    message={t("couponExample")}
                />,
                { position: 'top-center', duration: 2500 }
            );
            return;
        }
        if (couponCode) {
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
                        <CustomToast
                            type="error"
                            title={t("invalidCouponTitle")}
                            message={t("invalidCouponMessage")}
                        />,
                        { position: 'top-center', duration: 2500 }
                    );
                    setCouponData(false);
                    clearCouponFromStorage();
                }
            } catch (error) {
                console.log(error)
                setCouponData(false);
                clearCouponFromStorage();
            } finally {
                setIsChecking(false);
                setCouponCode('');
            }
        }
        runCheckDetails();
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
            const isValid = validateOrderData({
                addressId: props.addressId,
                paymentType: props.paymentType,
                identity,
                cart,
                uploadedFile: uploadedPaymentProof,
                t
            });

            if (!isValid) return;

            try {
                setIsProcessing(true);

                const isExternalPayment = props.paymentType === "transfer"


                // console.log("HHH:",`${window.location.origin}/${props.lang}/checkout?state=success`)
                const body = {
                    products: cart.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                    success_url: `${window.location.origin}/${props.lang}/orders/`,
                    // success_url: `${window.location.origin}/${props.lang}/checkout?state=${isExternalPayment ? 'externel' : 'success'}`,
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
                    ...(props.paymentType === "installment" && {
                        identity: identity,
                    }),

                };
                const result = await saveOrder(body);
                sessionStorage.setItem('orderPlaced', 'true');
                if (!result.error) {
                    clearCart();
                    clearCouponFromStorage();
                    sessionStorage.setItem('placedOrderId', result?.data?.id);
                    setDisplaySummary(null)
                    setOrderSummary(null)
                    setUploadedPaymentProof(null)
                    setIdentity(null)
                    toast.custom(
                        <CustomToast
                            type="success"
                            title={t("successTitle")}
                            message={t("successMsg")}
                        />,
                        { position: 'top-center', duration: 2500 }
                    );
                    switch (props.paymentType) {
                        case "qi":
                            if (result.data?.metadata?.formUrl) {
                                window.location.href = result.data.metadata.formUrl;
                               // setTimeout(()=>{
                               //
                               // },5000)
                            } else {
                                toast.error(t("failMsg"));
                            }
                            break;
                        case "cash":
                            // router.push(`/checkout?state=externel`);
                            router.push(`/checkout?state=success`);
                            break;

                        case "installment":
                            router.push(`/checkout?state=installment`);
                            break;

                        case "transfer":
                            router.push(`/checkout?state=externel`);
                            break;
                        default:
                            toast.custom(
                                <CustomToast
                                    type="success"
                                    title={t("successTitle")}
                                    message={t("successMsg")}
                                />,
                                { position: 'top-center', duration: 2500 }
                            );
                            router.push(`/checkout?state=success`);
                            break;
                    }
                } else {
                    if(result.message==="رقم البطاقة المستخدمة في الاختبار غير صحيحة")
                    {
                        toast.custom(
                            <CustomToast
                                type="error"
                                title={t("invalidIdentityTitle")}
                                message={t("invalidIdentityNumber")}
                            />,
                            { position: 'top-center', duration: 2500 }
                        );
                    }
                    else {
                        toast.error(t("failMsg"));
                    }
                    router.push(`/${props.lang}/checkout?state=failure`);

                }

            } catch (error) {

                console.error("Order Error:", error.message);
                // toast.error(t("errorMsg"));
            } finally {
                setIsProcessing(false);
            }
        }
    };


    return (
        <div style={props.style} className={styles.summary}>
            <h3 className={styles.titleSummary}>{t("summaryTitle")}</h3>
            <hr className={styles.line}/>
            <p>{t("haveCoupon")}</p>

            <div className={styles.inputContainer}>
                <motion.input
                    value={couponCode || ''}
                    onChange={(e) => setCouponCode(e.target.value)}
                    whileFocus={{boxShadow: '0 0 8px rgba(245, 81, 87, 0.3)'}}
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
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    {isChecking ? (
                        <motion.span
                            style={{display: 'inline-block'}}
                            animate={{rotate: [0, 360], scale: [1, 1.2, 1]}}
                            transition={{repeat: Infinity, repeatType: "loop", duration: 1, ease: "easeInOut"}}
                        >
                            <Loader/>
                        </motion.span>
                    ) : t("add")}
                </motion.button>
            </div>

            <RowTextWithNumber
                title={t("productsTotal")}
                // value={`${Number(props.getTotalPrice())} IQD`}
                value={displaySummary ? `${orderSummary?.amount} IQD` : '...'}
                colorValue="#0741AD"
            />

            <AnimatePresence>
                {couponData && (
                    <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}}
                                exit={{opacity: 0, height: 0}}>
                        <RowTextWithNumber
                            title={`${t("coupon")}: ${couponData.code}`}
                            // value={`${calculateDiscount(couponData, props.getTotalPrice())} IQD`}
                            // value={displaySummary ? `${couponData?.coupon_discount_value || '.'} IQD` : '...'}
                            value={displaySummary ? formatDiscount(couponData) : '...'}

                            colorValue="#FF647C"
                            colorTitle="#00C48C"
                            icon={<CheckCircle className={styles.checkIcon}/>}
                        />
                    </motion.div>
                )}

                {couponData === false && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <RowTextWithNumber
                            isNotValid
                            title={t("invalidCoupon")}
                            value="0 IQD"
                            colorTitle="#FF647C"
                            colorValue="#FF647C"
                            icon={<CircleX className={styles.errorIcon}/>}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <RowTextWithNumber
                title={t("shippingCost")}
                // value={`${props.getShippingTotal()} IQD`}
                value={displaySummary ? `${orderSummary?.shipping_fees} IQD` : '...'}
                colorValue="#0741AD"
            />
            <button onClick={() => setShowDetails(prev => !prev)} className={styles.toggleDetails}>
                {showDetails ? t("hideDetails") : t("showDetails")}
                <span className={showDetails ? styles.arrowUp : styles.arrowDown}/>
            </button>

            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        className={styles.detailsContainer}
                    >
                        <RowTextWithNumber
                            title={t("totalWithShipping")}
                            value={orderSummary ? `${orderSummary.amount_with_shipping} IQD` : '...'}
                            colorValue="#0741AD"
                        />
                        <RowTextWithNumber
                            title={t("couponDiscount")}
                            value={orderSummary ? `${orderSummary.coupon_discount_value || 0} IQD` : '...'}
                            colorValue="#FF647C"
                        />
                        <RowTextWithNumber
                            title={t("paymentFees")}
                            value={orderSummary ? `${orderSummary.payment_fees_value || 0} IQD` : '...'}
                            colorValue="#0741AD"
                        />
                        {orderSummary?.installment_count && orderSummary.installment_count > 1 && (
                            <RowTextWithNumber
                                title={t("monthlyInstallment")}
                                value={`${Math.round(orderSummary.amount_with_shipping_after_coupon_and_payment_fees / orderSummary.installment_count)} IQD × ${orderSummary.installment_count}`}
                                colorValue="#0741AD"
                            />
                        )}
                    </motion.div>

                )}
            </AnimatePresence>


            {props.paymentName && (
                <AnimatePresence>
                    <hr className={styles.line}/>
                    <motion.div
                        key="paymentDetails"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        transition={{duration: 0.3}}
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
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 10}}
                                    transition={{duration: 0.3}}
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
                                        value={identity??''}
                                        onChange={(e) => {
                                            const onlyNums = e.target.value.replace(/\D/g, "");
                                            setIdentity(onlyNums);
                                        }}
                                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={t("identityNumberPlaceholder")}
                                    />
                                </motion.div>

                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            )}
            <hr className={styles.line}/>
            <RowTextWithNumber
                title={t("grandTotal")}
                value={displaySummary ? `${orderSummary?.amount_with_shipping_after_coupon_and_payment_fees} IQD` : '...'}

                // value={`${calculateTotalAfterDiscount(props.getTotalPrice(), props.getShippingTotal(), calculateDiscount(couponData, props.getTotalPrice()))} IQD`}
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
                        // handleCompleteOrder()
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


// --------------
// const OrderSummary = (props) => {
//     const t = useTranslations("OrderSummary");
//     // const [couponCode, setCouponCode] = useState('');
//     const [couponData, setCouponData] = useState(null);
//     const [isChecking, setIsChecking] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [orderSummary, setOrderSummary] = useState(null);
//
//     const {
//         cart,
//         clearCart,
//         setPaymentMethod,
//         setCouponCode,
//         couponCode,
//         // orderSummary,
//         initializeSummaryUpdater,
//     } = useCart();
//
//
//     useEffect(() => {
//         initializeSummaryUpdater(setOrderSummary);
//     }, []);
//
//
//     useEffect(() => {
//         if (orderSummary) {
//             setDisplaySummary((prev) => {
//                 if (JSON.stringify(prev) !== JSON.stringify(orderSummary)) {
//                     return orderSummary;
//                 }
//                 return prev;
//             });
//         }
//     }, [orderSummary]);
//     const router = useRouter();
//     const pathname = usePathname();
//
//     useEffect(() => {
//         const saved = getCouponFromStorage();
//         if (saved) {
//             setCouponData(saved);
//         }
//     }, []);
//
//     useEffect(() => {
//         if (props.paymentType) {
//             setPaymentMethod(props.paymentType);
//         }
//     }, [props.paymentType]);
//
//
//     const handleCheckCoupon = async () => {
//     if(couponCode){
//         if (!couponCode.trim()) {
//             toast.custom(
//                 <CustomToast
//                     type="warning"
//                     title={t("couponMissing")}
//                     message={t("couponExample")}
//                 />,
//                 {position: 'top-center', duration: 2500}
//             );
//             return;
//         }
//     }
//         setIsChecking(true);
//         setTimeout(() => {
//             toast.custom(
//                 <CustomToast
//                     type="info"
//                     title={t("inProgress")}
//                     message="..."
//                 />,
//                 {position: 'top-center', duration: 2500})
//             setIsChecking(false);
//         }, 2500)
//     }
//     const handleCompleteOrder = async () => {
//         if (pathname === '/shopping-cart') {
//             router.push('/checkout');
//             return;
//         }
//
//         if (pathname === '/checkout') {
//             const isValid = validateOrderData({
//                 addressId: props.addressId,
//                 paymentType: props.paymentType,
//                 identity: props.identity,
//                 cart,
//             });
//
//             if (!isValid) return;
//
//             try {
//                 setIsProcessing(true);
//
//                 const body = {
//                     products: cart.map(item => ({
//                         product_id: item.id,
//                         quantity: item.quantity,
//                     })),
//                     success_url: `${window.location.origin}/${props.lang}/checkout?state=success`,
//                     fail_url: `${window.location.origin}/${props.lang}/checkout?state=fail`,
//                     payment_method: props.paymentType,
//                     notes: props.orderNotes,
//                     coupon_code: props.couponCode,
//                     address: {
//                         extra_address: props.extraAddress,
//                         latitude: props.latitude,
//                         longitude: props.longitude,
//                     },
//                     ...(props.paymentType === "installment" && {
//                         identity: props.identity, // مطلوب فقط في الدفع بالتقسيط
//                     }),
//                 };
//
//                 const result = await saveOrder(body);
//
//                 if (!result.error) {
//                     clearCart();
//                     clearCouponFromStorage();
//                     sessionStorage.setItem('orderPlaced', 'true');
//                     setDisplaySummary(null)
//                     setOrderSummary(null)
//                     // ✅ معالجة حسب نوع الدفع
//                     switch (props.paymentType) {
//                         case "qi":
//                             // فتح صفحة الدفع
//                             if (result.data?.metadata?.formUrl) {
//                                 toast.success(t("successMsg"));
//                                 window.location.href = result.data.metadata.formUrl;
//                             } else {
//                                 toast.error(t("failMsg"));
//                             }
//                             break;
//
//                         case "cash":
//                             // عرض رسالة نجاح فقط
//                             toast.custom(
//                                 <CustomToast
//                                     type="success"
//                                     title={t("successTitle")}
//                                     message={t("successMsg")}
//                                 />,
//                                 { position: 'top-center', duration: 2500 }
//                             );
//                             // router.push(`/checkout?state=externel`);
//                             router.push(`/checkout?state=success`);
//                             break;
//
//                         case "installment":
//
//                             toast.custom(
//                                 <CustomToast
//                                     type="success"
//                                     title={t("successTitle")}
//                                     message={t("successMsg")}
//                                 />,
//                                 { position: 'top-center', duration: 2500 }
//                             ); // أو أظهر Modal مخصص للتقسيط
//                             router.push(`/checkout?state=success`);
//                             break;
//
//                         case "transfer":
//
//                             toast.custom(
//                                 <CustomToast
//                                     type="success"
//                                     title={t("successTitle")}
//                                     message={t("successMsg")}
//                                 />,
//                                 { position: 'top-center', duration: 2500 }
//                             );
//                             router.push(`/checkout?state=success`);
//                             break;
//
//                         default:
//                             toast.custom(
//                                 <CustomToast
//                                     type="success"
//                                     title={t("successTitle")}
//                                     message={t("successMsg")}
//                                 />,
//                                 { position: 'top-center', duration: 2500 }
//                             );
//                             router.push(`/checkout?state=success`);
//                             break;
//                     }
//                 } else {
//                     router.push(`/checkout?state=failure`);
//                     toast.error(t("failMsg"));
//                 }
//
//             } catch (error) {
//
//                 console.error("Order Error:", error.message);
//                 toast.error(t("errorMsg"));
//             } finally {
//                 setIsProcessing(false);
//             }
//         }
//     };
//
//
//
//     const [displaySummary, setDisplaySummary] = useState(null);
//
//
//
//
//
//
//     return (
//         <div style={props.style} className={styles.summary}>
//             <h3 className={styles.titleSummary}>{t("summaryTitle")}</h3>
//             <hr className={styles.line} />
//             <p>{t("haveCoupon")}</p>
//
//             <div className={styles.inputContainer}>
//                 <motion.input
//                     // value={couponCode||''}
//                     // onChange={(e) => setCouponCode(e.target.value)}
//                     whileFocus={{ boxShadow: '0 0 8px rgba(245, 81, 87, 0.3)' }}
//                     className={styles.inputCoupon}
//                     style={{padding:props.lang==='en'?'0 0 0 80px':'0 80px 0 0'}}
//                     type="text"
//                     placeholder={t("enterCoupon")}
//                     maxLength={15}
//                 />
//                 {checkCouponIcon}
//                 <motion.button
//                     className={styles.buttonInput}
//                     onClick={handleCheckCoupon}
//                     disabled={isChecking}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     {isChecking ? (
//                         <motion.span
//                             style={{ display: 'inline-block' }}
//                             animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
//                             transition={{ repeat: Infinity, repeatType: "loop", duration: 1, ease: "easeInOut" }}
//                         >
//                             <Loader />
//                         </motion.span>
//                     ) : t("add")}
//                 </motion.button>
//             </div>
//
//             <RowTextWithNumber
//                 title={t("productsTotal")}
//                 // value={`${Number(props.getTotalPrice())} IQD`}
//                 value={displaySummary ? `${orderSummary?.amount} IQD` : '...'}
//                 colorValue="#0741AD"
//             />
//
//             <AnimatePresence>
//                 {couponData && (
//                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
//                         <RowTextWithNumber
//                             title={`${t("coupon")}: ${couponData.code}`}
//                             // value={`${calculateDiscount(couponData, props.getTotalPrice())} IQD`}
//                             value={displaySummary ? `${orderSummary?.coupon_discount_value} IQD` : '...'}
//
//                             colorValue="#FF647C"
//                             colorTitle="#00C48C"
//                             icon={<CheckCircle className={styles.checkIcon} />}
//                         />
//                     </motion.div>
//                 )}
//
//                 {couponData === false && (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                         <RowTextWithNumber
//                             isNotValid
//                             title={t("invalidCoupon")}
//                             value="0 IQD"
//                             colorTitle="#FF647C"
//                             colorValue="#FF647C"
//                             icon={<CircleX className={styles.errorIcon} />}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//
//             <RowTextWithNumber
//                 title={t("shippingCost")}
//                 // value={`${props.getShippingTotal()} IQD`}
//                 value={displaySummary ? `${orderSummary?.shipping_fees} IQD` : '...'}
//                 colorValue="#0741AD"
//             />
//
//             <hr className={styles.line} />
//
//             <RowTextWithNumber
//                 title={t("grandTotal")}
//                 value={displaySummary ? `${orderSummary?.amount_with_shipping_after_coupon_and_payment_fees} IQD` : '...'}
//
//                 // value={`${calculateTotalAfterDiscount(props.getTotalPrice(), props.getShippingTotal(), calculateDiscount(couponData, props.getTotalPrice()))} IQD`}
//                 colorTitle="#000"
//                 weightTitle="500"
//                 sizeValue="18px"
//                 colorValue="#0741AD"
//             />
//
//             <RowTextWithNumber
//                 title={t("taxNote")}
//                 star="*"
//                 colorTitle="#A5A5A5"
//                 sizeTitle="14px"
//                 weightTitle="400"
//             />
//
//             {!props.hideButtonCompleting && (
//                 <button
//                     className={styles.completeProcess}
//                     onClick={handleCompleteOrder}
//                     disabled={isProcessing}
//                 >
//                     {isProcessing ? t("sending") : t("completeOrder")}
//                 </button>
//             )}
//         </div>
//     );
// };
//
// export default OrderSummary;

// useEffect(() => {
//     if (orderSummary) {
//         setDisplaySummary(orderSummary);
//     }
// }, [orderSummary]);
// const handleCompleteOrder = async () => {
//
//     if (pathname === '/shopping-cart') {
//         router.push('/checkout');
//         return;
//     }
//
//     if (pathname === '/checkout') {
//         // if (!validateOrderData({
//         //     addressId: props.addressId,
//         //     paymentMethodId: props.paymentMethodId,
//         //     cart,
//         //     paymentType: props.paymentType,
//         //     uploadedFile: props.uploadedFile,
//         // })) return;
//
//         try {
//             setIsProcessing(true);
//
//             const body = {
//                 products: cart.map(item => ({
//                     product_id: item.id,
//                     quantity: item.quantity
//                 })),
//                 success_url: `${window.location.origin}/${props.lang}/checkout?state=success`,
//                 fail_url: `${window.location.origin}/${props.lang}/checkout?state=fail`,
//                 payment_method: props.paymentType
//             };
//             // const body = {
//             //     products: cart.map(item => ({
//             //         product_id: item.id,
//             //         quantity: item.quantity
//             //     })),
//             //     success_url: `${window.location.origin}/${props.lang}/checkout?state=success`,
//             //     fail_url: `${window.location.origin}/${props.lang}/checkout?state=fail`,
//             //     payment_method: props.paymentMethodId,
//             //     address_id: props.addressId,
//             //     coupon_code: props.couponCode,
//             //     notes: props.orderNotes
//             // };
//
//             const result = await saveOrder(body);
//
//             if (!result.error && result.data?.metadata?.formUrl) {
//                 clearCart();
//                 clearCouponFromStorage();
//
//                 toast.custom(
//                     <CustomToast
//                         type="success"
//                         title={t("successTitle")}
//                         message={t("successMsg")}
//                     />,
//                     { position: 'top-center', duration: 2500 }
//                 );
//
//                 sessionStorage.setItem('orderPlaced', 'true');
//
//                 window.location.href = result.data.metadata.formUrl;
//
//             } else {
//                 toast.custom(
//                     <CustomToast
//                         type="error"
//                         title={t("failTitle")}
//                         message={t("failMsg")}
//                     />,
//                     { position: 'top-center', duration: 3000 }
//                 );
//             }
//
//         } catch (error) {
//             console.error("Order Error:", error.message);
//             toast.custom(
//                 <CustomToast
//                     type="error"
//                     title={t("errorTitle")}
//                     message={t("errorMsg")}
//                 />,
//                 { position: 'top-center', duration: 3000 }
//             );
//         } finally {
//             setIsProcessing(false);
//         }
//     }
// };

// useEffect(() => {
//     console.log("Updated summary:", orderSummary);
// }, [orderSummary]);