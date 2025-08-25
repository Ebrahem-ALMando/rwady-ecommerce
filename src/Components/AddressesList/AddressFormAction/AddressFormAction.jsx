// 'use client';
//
// import React, { useEffect, useState } from 'react';
// import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
// import Line from "@/Components/Shared/Line/Line";
// import { CloseIcon } from "@/utils/Icons";
// import { toast } from "react-hot-toast";
// import useSWR from "swr";
// import { getCities } from "@/api/services/location/getCities";
// import { getDistricts } from "@/api/services/location/getDistricts";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
// import { motion } from 'framer-motion';
// import {log} from "next/dist/server/typescript/utils";
// const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit }) => {
//     const [formData, setFormData] = useState({
//         address: '',
//         city: '',
//         district: '',
//         postal_code: '',
//         phone: '',
//         is_default: false,
//     });
//
//     const [districts, setDistricts] = useState([]);
//
//     const { data: citiesData, error, isLoading, mutate: refreshCities } =
//         useSWR("cities", getCities,{
//
//             revalidateOnFocus:false
//         });
//     const cities = citiesData?.data || [];
//
//
//     useEffect(() => {
//         if (formData.city) {
//             getDistricts(formData.city)
//                 .then(res => setDistricts(res))
//                 .catch(() => toast.error("فشل في تحميل المناطق"));
//         }
//         console.log(districts)
//     }, [formData.city]);
//
//
//     useEffect(() => {
//         if (addressData) {
//             setFormData({
//                 address: addressData.address || '',
//                 city: addressData.city_id || '',
//                 // district: addressData.district_id || '',
//                 // district: addressData.district_id || '',
//                 postal_code: addressData.postal_code || '',
//                 phone: addressData.phone || '',
//                 is_default: addressData.is_default || false,
//             });
//
//             if (addressData.city_id) {
//                 getDistricts(addressData.city_id)
//                     .then(res => setDistricts(res.data))
//                     .catch(() => toast.error("فشل في تحميل المناطق"));
//             }
//         } else {
//             setFormData({
//                 address: '',
//                 city: '',
//                 district: '',
//                 postal_code: '',
//                 phone: '',
//                 is_default: false,
//             });
//             setDistricts([]);
//         }
//     }, [addressData]);
//
//
//
//     const handleChange = async (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//
//         if (name === "city") {
//             try {
//                 const res = await getDistricts(value);
//                 setDistricts(res.data);
//                 setFormData(prev => ({ ...prev, district: '' }));
//             } catch {
//                 toast.error("فشل في تحميل المناطق");
//             }
//         }
//     };
//
//     const validateForm = () => {
//         if (!formData.address.trim()) {
//             toast.error("يرجى إدخال العنوان الكامل");
//             return false;
//         }
//         if (!formData.city) {
//             toast.error("يرجى اختيار المدينة");
//             return false;
//         }
//         // if (!formData.district) {
//         //     toast.error("يرجى اختيار المنطقة");
//         //     return false;
//         // }
//         return true;
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//
//         try {
//             await onSubmit({
//                 address: formData.address,
//                 city_id: formData.city,
//                 district_id: formData.district,
//                 postal_code: formData.postal_code,
//                 phone: formData.phone,
//                 is_default: formData.is_default ? 1 : 0,
//             });
//
//             setIsOpen(false);
//             mutate?.();
//         } catch (err) {
//             toast.error("حدث خطأ أثناء الحفظ");
//         }
//     };
//
//
//     if (!isOpen) return null;
//     if (isLoading) return <Loading />;
//     if (error) return <Error onRetry={() => refreshCities()} />;
//
//     return (
//         <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
//             <div className={styles.profileContainer} onClick={(e) => e.stopPropagation()}>
//                 <div className={styles.header}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
//                         {CloseIcon}
//                     </button>
//                 </div>
//
//                 <form onSubmit={handleSubmit}>
//                     <div className={styles.formGroup}>
//                         <label htmlFor="address" className={styles.inputLabel}>العنوان الكامل</label>
//                         <input id="address" name="address" value={formData.address} onChange={handleChange}
//                                className={styles.textInput}/>
//                     </div>
//
//                     <div className={styles.formGroup}>
//                         <label htmlFor="postal_code" className={styles.inputLabel}>الرمز البريدي</label>
//                         <input id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange}
//                                className={styles.textInput}/>
//                     </div>
//
//                     <div className={styles.formGroup}>
//                         <label htmlFor="phone" className={styles.inputLabel}>رقم الجوال</label>
//                         <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
//                                className={styles.textInput}/>
//                     </div>
//
//                     <div className={styles.locationGroup}>
//                         <div className={styles.selectWrapper}>
//                             <label htmlFor="city" className={styles.inputLabel}>المدينة</label>
//                             <select id="city" name="city" value={formData.city} onChange={handleChange}
//                                     className={styles.selectInput}>
//                                 <option value="" disabled hidden>اختر المدينة</option>
//                                 {cities.map(city => (
//                                     <option key={city.id} value={city.id}>{city.title}</option>
//                                 ))}
//                             </select>
//                         </div>
//
//                         {formData.city !== '' && (
//                             <motion.div
//                                 className={styles.selectWrapper}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: 20 }}
//                                 transition={{ duration: 0.5, ease: "easeOut" }}
//                             >
//                                 <label htmlFor="district" className={styles.inputLabel}>المنطقة / الدولة</label>
//                                 <select
//                                     id="district"
//                                     name="district"
//                                     value={formData.district}
//                                     onChange={handleChange}
//                                     className={styles.selectInput}
//                                 >
//                                     <option value="" disabled hidden>اختر المنطقة</option>
//                                     {districts?.data?.map(dist => (
//                                         <option key={dist.id} value={dist.id}>{dist.title}</option>
//                                     ))}
//                                 </select>
//                             </motion.div>
//                         )}
//
//                     </div>
//                     <div className={styles.formGroup}>
//                         <label className={styles.switchLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="is_default"
//                                 checked={formData.is_default}
//                                 onChange={(e) =>
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         is_default: e.target.checked,
//                                     }))
//                                 }
//                                 className={styles.switchInput}
//                             />
//                             <span className={styles.switchSlider}></span>
//                             <span className={styles.switchText}>اجعل هذا العنوان الافتراضي</span>
//                         </label>
//                     </div>
//
//
//                     <Line/>
//
//                     <div className={styles.buttonGroup}>
//                         <button type="submit" className={styles.saveButton}>حفظ التغييرات</button>
//                         <button type="button" onClick={() => setIsOpen(false)} className={styles.cancelButton}>إلغاء
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default React.memo(AddressFormAction);


// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
// import Line from "@/Components/Shared/Line/Line";
// import { CloseIcon } from "@/utils/Icons";
// import { toast } from "react-hot-toast";
// import { useTranslations } from "next-intl";
// import LocationPickerMap from "@/Components/AddressesList/AddressFormAction/LocationPickerMap/LocationPickerMap";
//
// const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit }) => {
//     const t = useTranslations('Addresses');
//
//     const [formData, setFormData] = useState({
//         name: '',
//         latitude: '',
//         longitude: '',
//         is_default: false,
//     });
//
//     useEffect(() => {
//         if (addressData) {
//             setFormData({
//                 name: addressData.name || '',
//                 latitude: addressData.latitude || '',
//                 longitude: addressData.longitude || '',
//                 is_default: !!addressData.is_default,
//             });
//         } else {
//             setFormData({
//                 name: '',
//                 latitude: '',
//                 longitude: '',
//                 is_default: false,
//             });
//         }
//     }, [addressData]);
//
//     const validateForm = () => {
//         if (!formData.name.trim()) {
//             toast.error(t("enterName"));
//             return false;
//         }
//         if (!formData.latitude || !formData.longitude) {
//             toast.error(t("selectLocation"));
//             return false;
//         }
//         return true;
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//
//         await onSubmit(formData);
//         setIsOpen(false);
//         mutate?.();
//     };
//
//     if (!isOpen) return null;
//     const defaultPosition = {
//         lat: addressData?.latitude || 33.3152,
//         lng: addressData?.longitude || 44.3661,
//     };
//     const [mapCoords, setMapCoords] = useState(() => {
//         return selectedAddress
//             ? {
//                 lat: selectedAddress.latitude || 33.3152,
//                 lng: selectedAddress.longitude || 44.3661,
//             }
//             : {
//                 lat: 33.3152,
//                 lng: 44.3661,
//             };
//     });
//
//     return (
//         <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
//             <div className={styles.profileContainer} onClick={(e) => e.stopPropagation()}>
//                 <div className={styles.header}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
//                         {CloseIcon}
//                     </button>
//                 </div>
//
//                 <form onSubmit={handleSubmit} className={styles.form}>
//
//                     <div className={styles.formGroup}>
//                         <label className={styles.inputLabel}>{t("labelName")}</label>
//                         <input
//                             id="address"
//                             name="address"
//                             type="text"
//                             value={formData.name}
//                             onChange={(e) => setFormData({...formData, name: e.target.value})}
//                             placeholder={t("placeholderName")}
//                             className={styles.textInput}
//                         />
//                     </div>
//                     <LocationPickerMap
//                         onSelect={(coords) => setMapCoords(coords)}
//                         defaultPosition={mapCoords}
//                     />
//                     {/* الخريطة */}
//                     {/*<div className={styles.mapWrapper}>*/}
//                     {/*    <LocationPickerMap*/}
//                     {/*        onLocationSelect={({ lat, lng }) => {*/}
//                     {/*            setFormData(prev => ({*/}
//                     {/*                ...prev,*/}
//                     {/*                latitude: lat,*/}
//                     {/*                longitude: lng*/}
//                     {/*            }));*/}
//                     {/*        }}*/}
//                     {/*        initialPosition={{*/}
//                     {/*            lat: addressData?.latitude || 33.3152,*/}
//                     {/*            lng: addressData?.longitude || 44.3661*/}
//                     {/*        }}*/}
//                     {/*    />*/}
//
//
//                     {/*    <div className={styles.mapPlaceholder}>{t("mapPlaceholder")}</div>*/}
//                     {/*</div>*/}
//
//                     <div className={styles.formGroup}>
//                         <label className={styles.switchLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="is_default"
//                                 checked={formData.is_default}
//                                 onChange={(e) =>
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         is_default: e.target.checked,
//                                     }))
//                                 }
//                                 className={styles.switchInput}
//                             />
//                             <span className={styles.switchSlider}></span>
//                             <span className={styles.switchText}>{t("setDefaultLabel")}</span>
//                         </label>
//                     </div>
//
//                     <Line/>
//
//                     <div className={styles.buttonGroup}>
//                         <button type="submit" className={styles.saveButton}>{t("save")}</button>
//                         <button type="button" className={styles.cancelButton} onClick={() => setIsOpen(false)}>
//                             {t("cancel")}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default React.memo(AddressFormAction);
// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
// import Line from "@/Components/Shared/Line/Line";
// import { CloseIcon } from "@/utils/Icons";
// import { toast } from "react-hot-toast";
// import { useTranslations } from "next-intl";
// import dynamic from 'next/dynamic';
//
// const LocationPickerMap = dynamic(
//     () => import('@/Components/AddressesList/AddressFormAction/LocationPickerMap/LocationPickerMap'),
//     { ssr: false, loading1: () => <p>جارٍ تحميل الخريطة…</p> }
// );
//
// const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit }) => {
//     const t = useTranslations('Addresses');
//
//     const defaultCoords = {
//         lat: addressData?.latitude || 33.3152,
//         lng: addressData?.longitude || 44.3661,
//     };
//
//     const [formData, setFormData] = useState({
//         name: '',
//         latitude: '',
//         longitude: '',
//         is_default: false,
//     });
//
//     const [mapCoords, setMapCoords] = useState(defaultCoords);
//
//     useEffect(() => {
//         if (addressData) {
//             setFormData({
//                 name: addressData.name || '',
//                 latitude: addressData.latitude || '',
//                 longitude: addressData.longitude || '',
//                 is_default: !!addressData.is_default,
//             });
//             setMapCoords({
//                 lat: addressData.latitude || 33.3152,
//                 lng: addressData.longitude || 44.3661,
//             });
//         } else {
//             setFormData({
//                 name: '',
//                 latitude: '',
//                 longitude: '',
//                 is_default: false,
//             });
//             setMapCoords(defaultCoords);
//         }
//     }, [addressData]);
//
//     const validateForm = () => {
//         if (!formData.name.trim()) {
//             toast.error(t("enterName"));
//             return false;
//         }
//         if (!formData.latitude || !formData.longitude) {
//             toast.error(t("selectLocation"));
//             return false;
//         }
//         return true;
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//
//         await onSubmit(formData);
//         setIsOpen(false);
//         mutate?.();
//     };
//
//     if (!isOpen) return null;
//
//     return (
//         <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
//             <div className={styles.profileContainer} onClick={(e) => e.stopPropagation()}>
//                 <div className={styles.header}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
//                         {CloseIcon}
//                     </button>
//                 </div>
//
//                 <form onSubmit={handleSubmit} className={styles.form}>
//                     <div className={styles.formGroup}>
//                         <label className={styles.inputLabel}>{t("labelName")}</label>
//                         <input
//                             id="address"
//                             name="address"
//                             type="text"
//                             value={formData.name}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             placeholder={t("placeholderName")}
//                             className={styles.textInput}
//                         />
//                     </div>
//
//                     <LocationPickerMap
//                         defaultPosition={mapCoords}
//                         onSelect={({ lat, lng }) => { /* ... */ }}
//                     />
//
//                     <div className={styles.formGroup}>
//                         <label className={styles.switchLabel}>
//                             <input
//                                 type="checkbox"
//                                 name="is_default"
//                                 checked={formData.is_default}
//                                 onChange={(e) =>
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         is_default: e.target.checked,
//                                     }))
//                                 }
//                                 className={styles.switchInput}
//                             />
//                             <span className={styles.switchSlider}></span>
//                             <span className={styles.switchText}>{t("setDefaultLabel")}</span>
//                         </label>
//                     </div>
//
//                     <Line />
//
//                     <div className={styles.buttonGroup}>
//                         <button type="submit" className={styles.saveButton}>{t("save")}</button>
//                         <button type="button" className={styles.cancelButton} onClick={() => setIsOpen(false)}>
//                             {t("cancel")}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default React.memo(AddressFormAction);
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
import Line from '@/Components/Shared/Line/Line';
import { CloseIcon } from '@/utils/Icons';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';

const LocationPickerMap = dynamic(
    () => import('@/Components/AddressesList/AddressFormAction/LocationPickerMap/LocationPickerMap'),
    { ssr: false, loading: () => <p>جارٍ تحميل الخريطة…</p> }
);

const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit,isDefault=false }) => {
    const t = useTranslations('Addresses');

    const defaultCoords = {
        lat: addressData?.latitude || 33.3152,
        lng: addressData?.longitude || 44.3661,
    };
    const [formData, setFormData] = useState({
        name: '',
        latitude: '',
        longitude: '',
        is_default: isDefault,
        exstra_address:''
    });
    const [mapCoords, setMapCoords] = useState(defaultCoords);

    useEffect(() => {
        if (addressData) {
            setFormData({
                name: addressData.name || '',
                // latitude: String(addressData.latitude ?? ''),
                // longitude: String(addressData.longitude ?? ''),
                // is_default: !!addressData.is_default,
            });
            setMapCoords({
                lat: addressData.latitude || defaultCoords.lat,
                lng: addressData.longitude || defaultCoords.lng,
            });
        } else {
            setFormData({ name: '', latitude: '', longitude: '', is_default: false,exstra_address:'' });
            setMapCoords(defaultCoords);
        }

    }, [addressData]);

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.custom(() => (
                <CustomToast
                    title={t('enterName')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        if (!addressData&&(!formData.latitude || !formData.longitude)) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectLocation')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;


        await onSubmit(formData);
        setFormData({
            name: '',
            latitude: '',
            longitude: '',
            is_default: false,
            exstra_address:''
        });
        // setIsOpen(false);
        // mutate?.();
        setMapCoords(
            defaultCoords
        );
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div
                style={{maxWidth:'900px',maxHeight:'730px' ,overflow:'auto'}}
                className={`${styles.profileContainer}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                        {CloseIcon}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>{t('labelName')}</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder={t('placeholderName')}
                            className={styles.textInput}
                        />
                    </div>
                    {!addressData &&
                        <LocationPickerMap
                            defaultPosition={mapCoords}

                            onSelect={({lat, lng}) => {
                                const latStr = String(lat);
                                const lngStr = String(lng);
                                setMapCoords({lat, lng});
                                setFormData((prev) => ({
                                    ...prev,
                                    latitude: latStr,
                                    longitude: lngStr,
                                }));
                            }}
                        />
                    }
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>{t('extraAddress')}</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.exstra_address}
                            onChange={(e) => setFormData({...formData, exstra_address: e.target.value})}
                            placeholder={t('placeholderExtra_address')}
                            className={styles.textInput}
                        />
                    </div>
                    {(!addressData && !isDefault) &&
                        <div className={styles.formGroup}>
                            <label className={styles.switchLabel}>
                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={formData.is_default}
                                    onChange={(e) =>
                                        setFormData((prev) => ({...prev, is_default: e.target.checked}))
                                    }
                                    className={styles.switchInput}
                                />
                                <span className={styles.switchSlider}></span>
                                <span className={styles.switchText}>{t('setDefaultLabel')}</span>
                            </label>
                        </div>
                    }

                    <Line/>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>
                            {t('save')}
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(AddressFormAction);
