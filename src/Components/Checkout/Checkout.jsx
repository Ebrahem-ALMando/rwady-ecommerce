'use client';

import styles from './Checkout.module.css';
import Address from "@/Components/Checkout/AddressSection/Address";
import Order from "@/Components/Checkout/Order/Order";
import Payment from "@/Components/Checkout/Payment/Payment";
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import React, {useEffect, useState} from "react";
import AddressForm from "@/Components/Checkout/AddressForm/AddressForm";
import useCart from "@/hooks/useCart";
import UploadPaymentModal from "@/Components/Checkout/Payment/UploadPaymentModal/UploadPaymentModal";
import useSWR from "swr";
import { getAddressesList } from "@/api/services/address/getAddressesList";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { deleteAddress } from "@/api/services/address/deleteAddress";
import { toast } from "react-hot-toast";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import StateModal from "@/Components/Checkout/StateModal/StateModal";
import StepProgressBar from "@/Components/Shared/StepProgressBar/StepProgressBar";
import {customNextArrowIcon, customPrevArrowIcon, downArrow, leftArrow} from "@/utils/Icons";

import {AnimatePresence,motion} from 'framer-motion'

const Checkout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentData, setPaymentData] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null);
    const [paymentState, setPaymentState] = useState(null);
    const [step, setStep] = useState(1);
    const [orderNotes, setOrderNotes] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const state = searchParams.get('state');

        const orderPlaced = sessionStorage.getItem('orderPlaced');


        if (['success', 'failure', 'externel'].includes(state)) {
            if (orderPlaced) {
                setPaymentState(state);
                sessionStorage.removeItem('orderPlaced');
            } else {
                router.push('/checkout');
            }
        }
    }, [searchParams, router]);

    const handleChecked = (id, type) => {
        setPaymentData({ id, type });
    };


    const { updateQuantity, getItemQuantity, removeItem, getTotalPrice, cart, getShippingTotal } = useCart();

    // const { data, error, isLoading, mutate } = useSWR("userAddresses", getAddressesList, {
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    // });

    // if (isLoading) return <Loading />;
    // if (error) return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;
    //
    // const addressList = data?.data || [];
    //
    //
    const mockAddresses = [
        {
            id: 1,
            is_default: true,
            full_name: "إبراهيم المندو",
            phone: "0933123456",
            city: "إدلب",
            region: "المدينة",
            street: "شارع الكورنيش",
            building: "بناية 12",
            notes: "بجانب المسجد",
        },
        {
            id: 2,
            is_default: false,
            full_name: "محمد أحمد",
            phone: "0933567890",
            city: "حلب",
            region: "الفرقان",
            street: "طريق الجامعة",
            building: "بناية 5",
            notes: "مقابل الصيدلية",
        },
    ];

    const addressList = mockAddresses;
    const isLoading = false;
    const error = null;
    const mutate = () => {};
    const defaultAddress = selectedAddress || addressList.find(a => a.is_default);
    const handleDeleteAddress = async (id) => {
        try {
            const res = await deleteAddress(id);
            if (res.status_code === 200) {
                toast.success("تم حذف العنوان بنجاح");
                mutate();
            } else {
                toast.error("فشل في حذف العنوان");
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء الحذف");
            console.error("Delete Error:", err.message);
        }
    };

    const next = () => setStep((prev) => prev + 1);
    const prev = () => setStep((prev) => prev - 1);
    const isRTL = typeof window !== "undefined" && document?.documentElement?.dir === "rtl";

    return (
        <>

            <section className={styles.checkoutSection}>

                <div className={styles.container}>
                    {paymentState && (
                        <StateModal
                            type={paymentState}
                            onClose={() => {
                                setPaymentState(null);
                                router.push('/checkout')
                            }}
                        />
                    )}

                    <AddressForm
                        addresses={addressList}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onSelectAddress={(address) => setSelectedAddress(address)}
                        onEditAddress={(address) => {
                            toast("وظيفة التعديل قيد التطوير");
                        }}
                        onDeleteAddress={handleDeleteAddress}
                        onAddNewAddress={() => toast("اذهب إلى صفحة العناوين لإضافة عنوان جديد")}
                    />
                    <div className={styles.items}>
                        <StepProgressBar
                            currentStep={step}
                            totalSteps={3}
                            stepsTitles={["العنوان", "نوع الدفع", "تأكيد الطلب"]}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -50}}
                                transition={{duration: 0.4, ease: "easeInOut"}}
                            >
                                {step === 1 && (
                                    <>
                                        <h2 className={styles.titleSection}>عنوان الشحن</h2>
                                        {defaultAddress ? (
                                            <Address
                                                onClick={() => setIsOpen(true)}
                                                key={defaultAddress.id}
                                                id={defaultAddress.id}
                                                isDefault={defaultAddress.is_default}
                                                addressData={defaultAddress}
                                            />
                                        ) : (
                                            <EmptyState
                                                message={"لا يوجد عناوين متاحة !"}
                                                item={
                                                    <Link href={"/addresses-list"} className={styles.newAddress}>
                                                        اضف عنوان جديد!
                                                    </Link>
                                                }
                                            />
                                        )}
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <h2 className={styles.titleSection}>الدفع</h2>
                                        <Payment handleChecked={handleChecked}/>
                                    </>
                                )}

                                {cart?.length > 0 &&
                                    step === 3 && (
                                        <>
                                            <h2 className={styles.titleSection}>طلبك</h2>
                                            <Order/>
                                        </>
                                    )
                                }

                                {step === 4 && (
                                    <>
                                        <h2 className={styles.titleSection}>تأكيد الطلب</h2>

                                        <div className={styles.confirmBox}>
                                            <p className={styles.confirmText}>
                                                هل أنت مستعد لإتمام طلبك؟ تأكد من صحة العنوان وطريقة الدفع، ثم اضغط على
                                                زر <strong>إتمام الطلب</strong>.
                                            </p>

                                            <div className={styles.policyLinks}>
                                                <p>📄 يرجى مراجعة:</p>
                                                <ul>
                                                    <li><a href="/shipping-policy" target="_blank">طريقة الشحن</a></li>
                                                    <li><a href="/terms" target="_blank">سياسة التعامل</a></li>
                                                </ul>
                                            </div>

                                            <div className={styles.notesSection}>
                                                <label htmlFor="order-notes">📝 ملاحظات إضافية (اختياري):</label>
                                                <textarea
                                                    id="order-notes"
                                                    placeholder="مثلاً: الاتصال قبل التوصيل..."
                                                    rows="2"
                                                    value={orderNotes ?? ''}
                                                    className={styles.notesInput}
                                                    onChange={(e) => setOrderNotes(e.target.value)}
                                                />
                                            </div>


                                        </div>
                                    </>
                                )}

                            </motion.div>
                        </AnimatePresence>

                        <div className={styles.navigationButtons}>
                            <button
                                onClick={prev}
                                className={`${styles.prevButton} ${step <= 1 ? styles.disabled : ""}`}
                                disabled={step <= 1}
                            >
                                {isRTL ? customNextArrowIcon : customPrevArrowIcon}
                                السابق
                            </button>

                            <button
                                onClick={next}
                                className={`${styles.nextButton} ${step >= 4 ? styles.disabled : ""}`}
                                disabled={step >= 4}
                            >
                                التالي
                                {isRTL ? customPrevArrowIcon : customNextArrowIcon}
                            </button>
                        </div>

                    </div>

                    <div className={styles.processSummary}>
                        <OrderSummary
                            addressId={defaultAddress?.id || null}
                            paymentMethodId={paymentData?.id || null}
                            paymentType={paymentData?.type || null}
                            uploadedFile={uploadedFile}
                            getShippingTotal={getShippingTotal}
                            getTotalPrice={getTotalPrice}
                        />

                    </div>
                </div>

            </section>
        </>

    );
};

export default Checkout;