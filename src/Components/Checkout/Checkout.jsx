

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
import AddressFormAction from "@/Components/AddressesList/AddressFormAction/AddressFormAction";
import {updateAddress} from "@/api/services/address/updateAddress";
import {addAddress} from "@/api/services/address/addAddress";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
import {useLocale, useTranslations} from "next-intl";
import {getProfile} from "@/api/services/auth/getProfile";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';
import { MapPinHouse } from "lucide-react";
import { getCountries } from "@/api/services/general/Addresses/getCountries";

const Checkout = () => {
    const [defaultAddress,setDefaultAddress]=useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderId, setOrderId] = useState(null);

    const [paymentData, setPaymentData] = useState(() => ({
        id: null,
        type: null,
        method: null,
        name:null
    }));
    // const [uploadedFile, setUploadedFile] = useState(null);
    const [paymentState, setPaymentState] = useState(null);
    const [step, setStep] = useState(1);
    const [orderNotes, setOrderNotes] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const lang=useLocale()
    const tAddresses=useTranslations('Addresses')
    const [directOrder, setDirectOrder] = useState({});
    const [isDirectOrder, setIsDirectOrder] = useState(false);
    const [mode, setMode] = useState(null);
    const t = useTranslations("Checkout");  
    const { runCheckDetailsDirectOrder } = useCart();
    useEffect(() => {
        const state = searchParams.get('state');
        const orderPlaced = sessionStorage.getItem('orderPlaced');
        const orderId = sessionStorage.getItem('placedOrderId');
        const mode = searchParams.get('mode');
        const data = JSON.parse(sessionStorage.getItem('buyDirectly'));
                
        if(mode === 'direct_order' && data){
            setDirectOrder(data);
            setIsDirectOrder(true);
            setMode(mode);  
            runCheckDetailsDirectOrder( data);
            
        }
        if(!mode){
            setIsDirectOrder(false);
            setDirectOrder({});
            setMode(null);
            sessionStorage.removeItem('buyDirectly');   
        }
    
        if (['success', 'failure', 'externel', 'installment'].includes(state)) {
            if (orderPlaced) {
                setPaymentState(state);
                setOrderId(orderId??null);
                sessionStorage.removeItem('orderPlaced');
                sessionStorage.removeItem('placedOrderId');
            } else {
                router.push(`/${lang}/checkout?mode=${mode}`);
            }
        }
    }, [searchParams, router]);


    const handleChecked = (id, type, method,name) => {
        setPaymentData({ id, type, method,name });
    };

    const { updateQuantity, getItemQuantity, removeItem, getTotalPrice, cart, getShippingTotal } = useCart();

    const { data, error, isLoading, mutate } = useSWR("userAddresses",
        getAddressesList, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const { data: countriesData } = useSWR("countries", getCountries, {
        revalidateOnFocus: false,
    });
    useEffect(() => {
        if (data?.data) {
            const defaultAddr = data.data.find(addr => addr.is_default) || data?.data[0]||[];
            setDefaultAddress(defaultAddr);
        }
    }, [data]);

    const { data:profileData } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    const fullName = profileData?.data?.name || "—";
    const phone = profileData?.data?.phone || "—";

    if (isLoading) return <Loading />;
    if (error) return <ReloadWithError />;








    const next = () => setStep((prev) => prev + 1);
    const prev = () => setStep((prev) => prev - 1);
    const isRTL = typeof window !== "undefined" && document?.documentElement?.dir === "rtl";


    const handleSubmit = async (formData) => {
        let res;
        if (selectedAddress?.id) {

            res = await updateAddress(selectedAddress.id, {
                name: formData.name,

            });
        } else {

            formData.is_default = true;
            res = await addAddress(formData);
            setDefaultAddress(res.data)
        }

        if (res.error) {
            toast.custom(() => (
                <CustomToast
                    title={tAddresses("submitFail")}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        } else {
                toast.custom(() => (
                <CustomToast
                    title={selectedAddress ? tAddresses("updateSuccess") : tAddresses("addSuccess")}
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            setIsOpen(false);
            setSelectedAddress(null);
            // await mutate();
        }
    };
    const handleOpenNewAddress = () => {
        setSelectedAddress(null);
        setIsOpen(true);
    };

    return (
        <>

            <section className={styles.checkoutSection}>

                <div className={styles.container}>
                    <AddressFormAction
                        title={selectedAddress ? tAddresses("editTitle") : tAddresses("newTitle")}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        addressData={selectedAddress}
                        mutate={mutate}
                        onSubmit={handleSubmit}
                        isDefault={true}
                        countriesData={countriesData?.data || []}
                        phone={phone}
                    />
                    {paymentState && (
                        <StateModal
                            type={paymentState}
                            onClose={() => {
                                setPaymentState(null);
                                router.push(`/${lang}/checkout?${mode ? `mode=${mode}` : ''}`);
                            }}
                            lang={lang}
                            orderId={orderId}
                        />
                    )}


                    <div className={styles.items}>
                        <StepProgressBar
                            currentStep={step}
                            totalSteps={3}
                            stepsTitles={t.raw("stepsTitles")}
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
                                        <h2 className={styles.titleSection}>{t("shippingAddressTitle")}</h2>


                                        {defaultAddress&&defaultAddress.id ? (
                                            <Address
                                                onClick={() => setIsOpen(true)}
                                                key={defaultAddress.id}
                                                id={defaultAddress.id}
                                                isDefault={defaultAddress.is_default}
                                                addressData={defaultAddress}
                                                fullName={fullName}
                                                phone={defaultAddress.phone || phone}   

                                                t={tAddresses}
                                       
                                            />
                                        ) : (
                                           
                                            <div
                                                onClick={handleOpenNewAddress}
                                                className={styles.openNewAddress}
                                            >
                                                <span 
                                                className={styles.mapPinHouseIconContainer}
                                                 >
                                                  
                                                    <MapPinHouse
                                                        size={56}
                                                        color="#a0aec0"
                                                        strokeWidth={1.5}
                                                        className={styles.mapPinHouseIcon}
                                                     
                                                    />
                                                   
                                                </span>
                                                <div 
                                                
                                                className={styles.noAddressesAvailable}
                                                >
                                                    {t("noAddressesAvailable")}
                                                </div>
                                                <NewAddressButton onClick={handleOpenNewAddress} t={t}/>
                                            </div>
                                        )}
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <h2 className={styles.titleSection}>{t("paymentTitle")}</h2>
                                        <Payment
                                            lang={lang}
                                            handleChecked={handleChecked} selected={paymentData}/>

                                    </>
                                )}

                                {/*{cart?.length > 0 &&*/}
                                {/*    step === 3 && (*/}
                                {/*        <>*/}
                                {/*            <h2 className={styles.titleSection}>{t("yourOrder")}</h2>*/}
                                {/*            <Order*/}
                                {/*                lang={lang}*/}
                                {/*            />*/}
                                {/*        </>*/}
                                {/*    )*/}
                                {/*}*/}

                                {step === 3 && (
                                    <>
                                        <h2 className={styles.titleSection}>{t("confirmTitle")}</h2>

                                        <div className={styles.confirmBox}>
                                            <p className={styles.confirmText}>
                                                {t("confirmText")} <strong>{t("completeOrder")}</strong>.
                                            </p>

                                            <div className={styles.policyLinks}>
                                                <p>📄 {t("reviewNote")}:</p>
                                                <ul>
                                                    <li><a href={`/${lang}/shipment-policies`}
                                                           target="_blank">{t("shippingPolicy")}</a></li>
                                                    <li><a href={`/${lang}/return-policy`} target="_blank">{t("terms")}</a></li>
                                                </ul>
                                            </div>

                                            <div className={styles.notesSection}>
                                                <label htmlFor="order-notes">📝 {t("notesLabel")}</label>
                                                <textarea
                                                    id="order-notes"
                                                    placeholder={t("notesPlaceholder")}
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
                                {t("prev")}
                            </button>

                            <button
                                onClick={next}
                                className={`${styles.nextButton} ${step >= 3 || (step === 2 && paymentData.id === null) || (step === 1 && defaultAddress?.length === 0) ? styles.disabled : ""}`}
                                disabled={step >= 3||(step===2&&paymentData.id===null)||(step===1&&defaultAddress?.length===0)}
                            >
                                {t("next")}
                                {isRTL ? customPrevArrowIcon : customNextArrowIcon}
                            </button>

                        </div>

                    </div>

                    <div className={styles.processSummary}>
                        {/*<OrderSummary*/}
                        {/*    addressId={defaultAddress?.id || null}*/}
                        {/*    paymentMethodId={paymentData?.id || null}*/}
                        {/*    paymentType={paymentData?.method || null}*/}
                        {/*    uploadedFile={uploadedFile}*/}
                        {/*    // payment_method={paymentData.method}*/}
                        {/*    // getShippingTotal={getShippingTotal}*/}
                        {/*    // getTotalPrice={getTotalPrice}*/}
                        {/*/>*/}
                        <OrderSummary
                            addressId={defaultAddress?.id || null}
                            paymentMethodId={paymentData?.id || null}
                            paymentType={paymentData?.method || null}
                            paymentName={paymentData?.name?.[lang] || null}
                            // uploadedFile={uploadedFile}
                            orderNotes={orderNotes}
                            extraAddress={defaultAddress?.extra_address || ""}
                            latitude={defaultAddress?.latitude || ""}
                            longitude={defaultAddress?.longitude || ""}
                            identity={paymentData?.method === "installment" ? profileData?.data?.identity : null}
                            lang={lang}
                            directOrder={directOrder}
                            isDirectOrder={isDirectOrder}
                            mode={mode}
                            setIsDirectOrder={setIsDirectOrder}
                            setDirectOrder={setDirectOrder}
                            setMode={setMode}
                            next={next}
                            step={step}
                        />

                    </div>
                </div>

            </section>
        </>

    );
};

export default Checkout;