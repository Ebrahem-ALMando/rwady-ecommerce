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
import { listAddresses } from "@/api/services/address/listAddresses";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { deleteAddress } from "@/api/services/address/deleteAddress";
import { toast } from "react-hot-toast";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import StateModal from "@/Components/Checkout/StateModal/StateModal";


const Checkout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentData, setPaymentData] = useState({});
    const [uploadedFile, setUploadedFile] = useState(null);
    const [paymentState, setPaymentState] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const state = searchParams.get('state');

        const orderPlaced = sessionStorage.getItem('orderPlaced');

        console.log(orderPlaced)
        if (['success', 'failure', 'externel'].includes(state)) {
            if (orderPlaced) {
                setPaymentState(state);
                // sessionStorage.removeItem('orderPlaced');
            } else {
                router.push('/checkout');
            }
        }
    }, [searchParams, router]);

    const handleChecked = (id, type) => {
        setPaymentData({ id, type });
    };


    const { updateQuantity, getItemQuantity, removeItem, getTotalPrice, cart, getShippingTotal } = useCart();

    const { data, error, isLoading, mutate } = useSWR("userAddresses", listAddresses, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });

    if (isLoading) return <Loading />;
    if (error) return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;

    const addressList = data?.data || [];

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


    return (
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
                                <Link href={'/addresses-list'} className={styles.newAddress}>
                                    اضف عنوان جديد!
                                </Link>
                            }
                        />
                    )}

                    {cart?.length > 0 &&
                        <>
                            <h2 className={styles.titleSection}>طلبك</h2>

                            <Order/>
                        </>
                    }

                    <h2 className={styles.titleSection}>الدفع</h2>
                    <Payment handleChecked={handleChecked} />

                    {paymentData.type === "externel" && <UploadPaymentModal
                        setUploadedFile={setUploadedFile}
                        uploadedFile={uploadedFile}
                    />}
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
    );
};

export default Checkout;