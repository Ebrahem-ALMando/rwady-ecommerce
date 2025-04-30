"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';



import { saveOrder } from '@/api/services/saveOrder';
import { clearCouponFromStorage, getCouponFromStorage, saveCouponToStorage } from '@/utils/orderSummaryStorage';

import styles from './OrderSummary.module.css';
import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { checkCoupon } from '@/api/services/checkCoupon';
import { checkCouponIcon } from "@/utils/Icons";
import { calculateDiscount, calculateTotalAfterDiscount } from "@/utils/cartCalculations";
import { CircleX, CheckCircle, Loader } from "lucide-react";
import {validateOrderData} from "@/utils/Valid/validateOrderData";
import useCart from "@/hooks/useCart";

const OrderSummary = (props) => {
    const [couponCode, setCouponCode] = useState('');
    const [couponData, setCouponData] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const { cart, clearCart } = useCart();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const saved = getCouponFromStorage();
        if (saved) {
            setCouponData(saved);
        }
    }, []);

    const handleCheckCoupon = async () => {
        if (!couponCode.trim()) {
            toast.custom(
                <CustomToast
                    type="warning"
                    title="الرجاء إدخال كود الخصم"
                    message="مثال : RRF2025"
                />,
                { position: 'top-center', duration: 2500 }
            );
            return;
        }

        setIsChecking(true);
        try {
            const result = await checkCoupon(couponCode);

            if (result.status_code === 200 && result.data.isvalid) {
                const data = {
                    discount_type: result.data.discount_type,
                    discount: result.data.discount,
                    code: couponCode.toUpperCase(),
                };
                setCouponData(data);
                saveCouponToStorage(data);

                let val = data.discount_type === "fixed"
                    ? `${data.discount} IQD`
                    : `${data.discount} %`;

                toast.custom(
                    <CustomToast
                        type="success"
                        title="تم تطبيق الخصم"
                        message={`تم خصم ${val} بنجاح`}
                    />,
                    { position: 'top-center', duration: 2500 }
                );
            }
        } catch (error) {
            toast.custom(
                <CustomToast
                    type="error"
                    title="كوبون غير صالح"
                    message="الرجاء التحقق من الكود والمحاولة مرة أخرى"
                />,
                { position: 'top-center', duration: 2500 }
            );
            setCouponData(false);
            clearCouponFromStorage();
        } finally {
            setIsChecking(false);
            setCouponCode('');
        }
    };


    const handleCompleteOrder = async () => {

        if (pathname === '/shopping-cart') {
            router.push('/checkout');
            return;
        }

        if (pathname === '/checkout')
        {

            if (!validateOrderData({
            addressId: props.addressId,
            paymentMethodId: props.paymentMethodId,
            cart,
            paymentType: props.paymentType,
            uploadedFile: props.uploadedFile,
        })) return;

            try {
                setIsProcessing(true);

                const formData = new FormData();
                formData.append('order_date', new Date().toLocaleDateString('en-GB'));
                formData.append('products', JSON.stringify(
                    cart.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity
                    }))
                ));
                formData.append('address_id', props.addressId);
                formData.append('payment_method_id', props.paymentMethodId);

                if (props.uploadedFile&&props.paymentType==="externel") {
                    formData.append('image', props.uploadedFile);
                }

                const result = await saveOrder(formData);

                if (result && result.status_code === 200) {
                    clearCart();
                    clearCouponFromStorage();

                    toast.custom(
                        <CustomToast
                            type="success"
                            title="تم إرسال الطلب بنجاح"
                            message="سنتابع معالجة طلبك الآن."
                        />,
                        { position: 'top-center', duration: 2500 }
                    );
                    sessionStorage.setItem('orderPlaced', 'true');

                    if (result.data.payment_url) {
                        window.location.href = result.data.payment_url;
                    }
                    else if (props.paymentType==="externel"){

                        router.push('/checkout?state=externel');
                    }
                    else {
                        router.push('/checkout?state=success');
                    }
                } else {
                    toast.custom(
                        <CustomToast
                            type="error"
                            title="فشل في إرسال الطلب"
                            message="حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً."
                        />,
                        { position: 'top-center', duration: 3000 }
                    );
                }
            } catch (error) {
                console.error("Order Error:", error.message);

                toast.custom(
                    <CustomToast
                        type="error"
                        title="خطأ في الاتصال"
                        message="تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مرة أخرى."
                    />,
                    { position: 'top-center', duration: 3000 }
                );
            } finally {
                setIsProcessing(false);
            }

        }


    };

    return (
        <div style={props.style} className={styles.summary}>
            <h3 className={styles.titleSummary}>ملخص الطلب</h3>
            <hr className={styles.line} />
            <p>هل لديك كود خصم</p>

            <div className={styles.inputContainer}>
                <motion.input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    whileFocus={{ boxShadow: '0 0 8px rgba(245, 81, 87, 0.3)' }}
                    className={styles.inputCoupon}
                    type="text"
                    placeholder="أدخل كود الخصم"
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
                    ) : 'إضافة'}
                </motion.button>
            </div>

            <RowTextWithNumber
                title="مجموع المنتجات"
                value={`${Number(props.getTotalPrice())} IQD`}
                colorValue="#0741AD"
            />

            <AnimatePresence>
                {couponData && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <RowTextWithNumber
                            title={`كوبون ${couponData.code}`}
                            value={`${calculateDiscount(couponData, props.getTotalPrice())} IQD`}
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
                            title="كوبون غير صالح"
                            value="0 IQD"
                            colorTitle="#FF647C"
                            colorValue="#FF647C"
                            icon={<CircleX className={styles.errorIcon} />}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <RowTextWithNumber
                title="رسوم الشحن"
                value={`${props.getShippingTotal()} IQD`}
                colorValue="#0741AD"
            />

            <hr className={styles.line} />

            <RowTextWithNumber
                title="الإجمالي"
                value={`${calculateTotalAfterDiscount(props.getTotalPrice(), props.getShippingTotal(), calculateDiscount(couponData, props.getTotalPrice()))} IQD`}
                colorTitle="#000"
                weightTitle="500"
                sizeValue="18px"
                colorValue="#0741AD"
            />

            <RowTextWithNumber
                title="الأسعار شاملة للضريبة"
                star="*"
                colorTitle="#A5A5A5"
                sizeTitle="14px"
                weightTitle="400"
            />

            {!props.hideButtonCompleting && (
                <button
                    className={styles.completeProcess}
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'جاري الإرسال...' : 'إتمام الطلب'}
                </button>
            )}
        </div>
    );
};

export default OrderSummary;
