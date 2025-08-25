'use client';

import React, { useState } from 'react';
import styles from './AddressForm.module.css';
import Line from "@/Components/Shared/Line/Line";
import Address from "@/Components/Checkout/AddressSection/Address";
import { CloseIcon } from "@/utils/Icons";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
import { toast } from "react-hot-toast";

const AddressForm = ({
                         isOpen,
                         setIsOpen,
                         addresses = [],
                         onSelectAddress,
                         onEditAddress,
                         onDeleteAddress,
                         onAddNewAddress,
                     }) => {
    const [addressDefault, setAddressDefault] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedAddress = addresses.find(addr => addr.id === addressDefault);
        if (selectedAddress) {
            onSelectAddress?.(selectedAddress);
            setIsOpen(false);
        } else {
            toast.custom(() => (
                <CustomToast
                    title="يرجى اختيار عنوان أولاً"
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div className={styles.AddressContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>عنوان الشحن</h2>
                    <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                        {CloseIcon}
                    </button>
                </div>

                <div className={styles.address}>
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <Address
                                key={address.id}
                                id={address.id}
                                isDefault={addressDefault === address.id}
                                headerType="form"
                                setAddressDefault={setAddressDefault}
                                addressData={address}
                                onEdit={() => onEditAddress?.(address)}
                                onDelete={() => onDeleteAddress?.(address.id)}
                            />
                        ))
                    ) : (
                        <p>لا توجد عناوين.</p>
                    )}

                    <div className={styles.footer}>
                        <div>
                            <NewAddressButton onClick={onAddNewAddress} />
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => setIsOpen(false)}>إلغاء</button>
                            <button onClick={handleSubmit}>تأكيد</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;