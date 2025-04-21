'use client';
import styles from './AddressesList.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import Address from "@/Components/Checkout/AddressSection/Address";
import {toast} from "react-hot-toast";
import {deleteAddress} from "@/api/services/address/deleteAddress";


const AddressesList = ({ initialData, initialError, getData, keyData }) => {
    const [isDataFresh, setIsDataFresh] = useState(false);

    const { data, error, isLoading, mutate } = useSWR(
        keyData,
        getData,
        {
            fallbackData: { data: initialData.data },
            revalidateOnMount: false,
        }
    );

    // useEffect(() => {
    //     if (!isDataFresh) {
    //         mutate(undefined, { revalidate: true });
    //         setIsDataFresh(true);
    //     }
    // }, [isDataFresh, mutate]);

    const hasError = error || (!data?.data?.length && initialError);
    if (isLoading) return <Loading />;
    if (hasError) return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;

    const addressList = data?.data || [];
    const handleDeleteAddress = async (id) => {
        try {
            const res = await deleteAddress(id);
            console.log(res)
            if (res.status_code === 200) {
                toast.success("تم حذف العنوان بنجاح");
                mutate(undefined, { revalidate: true });
            } else {
                toast.error("فشل في حذف العنوان");
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء الحذف");
            console.error("Delete Error:", err.message);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar />
            </div>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h3>العناوين</h3>
                    <NewAddressButton />
                </div>
                <Line />
                <div className={styles.mainInfo}>
                    {addressList.map(address => (
                        <Address
                            key={address.id}
                            id={address.id}
                            isDefault={address.is_default}
                            headerType="form"
                            addressData={address}
                            onDelete={(id) => handleDeleteAddress(id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressesList;
