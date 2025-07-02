// 'use client';
// import styles from './AddressesList.module.css';
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Line from "@/Components/Shared/Line/Line";
// import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
// import React, { useState } from "react";
// import useSWR from "swr";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
// import Address from "@/Components/Checkout/AddressSection/Address";
// import { toast } from "react-hot-toast";
// import { deleteAddress } from "@/api/services/address/deleteAddress";
// import { getAddressesList } from "@/api/services/address/getAddressesList";
// import { addAddress } from "@/api/services/address/addAddress";
// import { updateAddress } from "@/api/services/address/updateAddress";
// import AddressFormAction from "@/Components/AddressesList/AddressFormAction/AddressFormAction";
//
// const AddressesList = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedAddress, setSelectedAddress] = useState(null);
//
//     const { data, error, isLoading, mutate } = useSWR(
//         "userAddresses",
//          getAddressesList,{
//             // revalidateIfStale: false,
//             // revalidateOnFocus: false,
//         }
//     );
//
//
//     const handleOpenNewAddress = () => {
//         setSelectedAddress(null);
//         setIsOpen(true);
//     };
//
//
//     const handleEditAddress = (address) => {
//         setSelectedAddress(address);
//         setIsOpen(true);
//     };
//
//
//     const handleDeleteAddress = async (id) => {
//         try {
//             const res = await deleteAddress(id);
//             if (res?.status_code === 200) {
//                 toast.success("تم حذف العنوان بنجاح");
//                 mutate();
//             } else {
//                 toast.error("فشل في حذف العنوان");
//             }
//         } catch (err) {
//             toast.error("حدث خطأ أثناء الحذف");
//             console.error("Delete Error:", err.message);
//         }
//     };
//     const handleSetDefaultAddress = async (address) => {
//         if (address.is_default) {
//             toast("هذا العنوان هو الافتراضي بالفعل");
//             return;
//         }
//
//         try {
//             const f=new FormData()
//             f.append("id", address.id)
//             f.append("is_default", 1);
//             const res = await updateAddress(f);
//             if (res?.status_code === 200) {
//                 toast.success("تم تعيين العنوان كافتراضي");
//                 mutate(getAddressesList, { revalidate: true });
//             } else {
//                 toast.error("فشل في تعيين العنوان");
//             }
//         } catch (err) {
//             toast.error("حدث خطأ أثناء تعيين الافتراضية");
//             console.error("Set Default Error:", err.message);
//         }
//     };
//
//
//
//     const handleSubmit = async (formData) => {
//         let res;
//         try {
//             if (selectedAddress?.id) {
//                 res = await updateAddress({ ...formData, id: selectedAddress.id });
//             } else {
//                 res = await addAddress(formData);
//             }
//
//             if (!res || res.status_code !== 200) {
//                 throw new Error("فشل العملية");
//             }
//
//             toast.success(selectedAddress ? "تم تعديل العنوان" : "تم إضافة العنوان");
//             mutate(undefined,{revalidate:true});
//             setIsOpen(false);
//         } catch (err) {
//             toast.error("حدث خطأ أثناء الحفظ");
//             console.error("Submit Error:", err.message);
//         }
//     };
//
//     if (isLoading) return <Loading />;
//     if (error) return <Error onRetry={() => mutate()} />;
//
//     const addressList = data?.data || [];
//
//     return (
//         <div className={styles.container}>
//             <AddressFormAction
//                 title={selectedAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
//                 isOpen={isOpen}
//                 setIsOpen={setIsOpen}
//                 addressData={selectedAddress}
//                 mutate={mutate}
//                 onSubmit={handleSubmit}
//
//             />
//             <div className={styles.sidebar}>
//                 <ProfileSidebar />
//             </div>
//             <div className={styles.card}>
//                 <div className={styles.header}>
//                     <h3>العناوين</h3>
//                     <NewAddressButton onClick={handleOpenNewAddress} />
//                 </div>
//                 <Line />
//                 <div className={styles.mainInfo}>
//                     {addressList.map(address => (
//                         <Address
//                             key={address.id}
//                             id={address.id}
//                             isDefault={address.is_default}
//                             addressData={address}
//                             onDelete={handleDeleteAddress}
//                             onEdit={() => handleEditAddress(address)}
//                             onSetDefault={() => handleSetDefaultAddress(address)}
//                             headerType="form"
//                             fullName=""
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default AddressesList;


'use client';
import styles from './AddressesList.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
import React, { useState } from "react";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import Address from "@/Components/Checkout/AddressSection/Address";
import { toast } from "react-hot-toast";
import { deleteAddress } from "@/api/services/address/deleteAddress";
import { getAddressesList } from "@/api/services/address/getAddressesList";
import { addAddress } from "@/api/services/address/addAddress";
import { updateAddress } from "@/api/services/address/updateAddress";
import AddressFormAction from "@/Components/AddressesList/AddressFormAction/AddressFormAction";
import {getProfile} from "@/api/services/auth/getProfile";
import {useTranslations} from "next-intl";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";

const AddressesList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const { data, error, isLoading, mutate } = useSWR(
        "userAddresses",
        getAddressesList,{
        }
    );
    const { data:profileData } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    const fullName = profileData?.data?.name || "—";
    const phone = profileData?.data?.phone || "—";

    const t=useTranslations('Addresses');
    const handleOpenNewAddress = () => {
        setSelectedAddress(null);
        setIsOpen(true);
    };


    const handleEditAddress = (address) => {
        setSelectedAddress(address);
        setIsOpen(true);
    };


    const handleDeleteAddress = async (id) => {
            const res = await deleteAddress(id);
            if (!res?.error) {
                toast.success(t("deleteSuccess"));
                mutate();
            } else {
                toast.error(t("deleteFail"));
            }


    };
    const handleSetDefaultAddress = async (address) => {
        if (address.is_default) {
            toast.success(t("alreadyDefault"));
            return;
        }
        const data={
            "is_default": true
        }
        const res = await updateAddress(address.id,data);
        if (!res?.error) {
            toast.success(t("setDefaultSuccess"));
            mutate();
        } else {
            toast.error(t("setDefaultFail"));
        }
    };




    const handleSubmit = async (formData) => {
        let res;
        console.log(formData)
            if (selectedAddress?.id) {
                const data={
                    "name": formData?.name,
                    "extra_address": formData?.extra_address,
                    // "is_default":formData?.is_default
                }
                res = await updateAddress(selectedAddress.id,data);
            } else {
                res = await addAddress(formData);
            }
            if (res.error) {
                toast.error(t("submitFail"));
            }
            if(!res.error){
                toast.success(
                    selectedAddress ? t("updateSuccess") : t("addSuccess")
                );
                mutate();
                setIsOpen(false);

            }
    };


    if (isLoading) return <Loading />;
    if (error) return <ReloadWithError />;

    const addressList = data?.data || [];

    return (
        <div className={styles.container}>
            <AddressFormAction
                title={selectedAddress ? t("editTitle") : t("newTitle")}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                addressData={selectedAddress}
                mutate={mutate}
                onSubmit={handleSubmit}

            />
            <div className={styles.sidebar}>
                <ProfileSidebar userData={profileData?.data ?? {}} />
            </div>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h3>{t("myAddresses")}</h3>
                    <NewAddressButton onClick={handleOpenNewAddress} t={t} />

                </div>
                <Line />
                <div className={styles.mainInfo}>
                    {addressList.map(address => (
                        <Address
                            key={address.id}
                            id={address.id}
                            isDefault={address.is_default}
                            addressData={address}
                            onDelete={handleDeleteAddress}
                            onEdit={() => handleEditAddress(address)}
                            onSetDefault={() => handleSetDefaultAddress(address)}
                            headerType="form"
                            fullName={fullName}
                            phone={phone}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddressesList;

