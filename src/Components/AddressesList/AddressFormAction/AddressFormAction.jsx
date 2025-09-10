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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { getCities } from '@/api/services/general/Addresses/getCities';
import { useLocale } from 'next-intl';
import SearchableSelect from '@/Components/Shared/SearchableSelect/SearchableSelect';
const LocationPickerMap = dynamic(
    () => import('@/Components/AddressesList/AddressFormAction/LocationPickerMap/LocationPickerMap'),
    { ssr: false, loading: () => <p>جارٍ تحميل الخريطة…</p> }
);

const phoneUtil = PhoneNumberUtil.getInstance();

const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit, isDefault = false, countriesData, phone }) => {
    const t = useTranslations('Addresses');
    const lang = useLocale ();
    const defaultCoords = {
        lat: addressData?.latitude || 33.3152,
        lng: addressData?.longitude || 44.3661,
    };
    
    const [formData, setFormData] = useState({
        name: '',
        phone: phone || '',
        country: '',
        city: '',
        latitude: '33.3152',
        longitude: '44.3661',
        is_default: isDefault,
        extra_address: ''
    });
    
    const [mapCoords, setMapCoords] = useState(defaultCoords);
    const [showExtraAddress, setShowExtraAddress] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);

    // دالة التحقق من صحة رقم الهاتف
    const validatePhoneNumber = (phone) => {
        try {
            const parsed = phoneUtil.parse(`+${phone}`);
            return phoneUtil.isValidNumber(parsed);
        } catch {
            return false;
        }
    };

    // تحميل المحافظات عند تغيير الدولة
    const loadCities = async (countryId) => {
        if (!countryId) {
            setCities([]);
            return;
        }
        
        setLoadingCities(true);
        try {
            const citiesResponse = await getCities(countryId);
            if (!citiesResponse?.error && citiesResponse?.data) {
                setCities(citiesResponse.data);
            }
        } catch (error) {
            console.error('Error loading cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    useEffect(() => {
        if (addressData) {
            setFormData({
                name: addressData.name || '',
                phone: addressData.phone || phone || '',
                country: addressData.country_id || '',
                city: addressData.city_id || '',
                latitude: addressData.latitude || '33.3152',
                longitude: addressData.longitude || '44.3661',
                is_default: !!addressData.is_default,
                extra_address: addressData.extra_address || ''
            });
            setMapCoords({
                lat: addressData.latitude || defaultCoords.lat,
                lng: addressData.longitude || defaultCoords.lng,
            });
            
            // تحميل المحافظات إذا كان هناك دولة مختارة
            if (addressData.country_id) {
                loadCities(addressData.country_id);
            }
        } else {
            // تحديد الدولة الأولى افتراضياً إذا كانت متاحة
            const defaultCountryId = countriesData && countriesData.length > 0 ? countriesData[0].id : '';
            
            setFormData({ 
                name: '', 
                phone: phone || '',
                country: defaultCountryId, 
                city: '', 
                latitude: '', 
                longitude: '', 
                is_default: false, 
                extra_address: '' 
            });
            setMapCoords(defaultCoords);
            setCities([]);
            
            // تحميل المحافظات للدولة الافتراضية
            if (defaultCountryId) {
                loadCities(defaultCountryId);
            }
        }
    }, [addressData, phone, countriesData]);

    // تحميل المحافظات عند تغيير الدولة
    useEffect(() => {
        if (formData.country) {
            loadCities(formData.country);
            // إعادة تعيين المحافظة عند تغيير الدولة (فقط إذا لم يكن تعديل عنوان موجود)
            if (!addressData) {
                setFormData(prev => ({ ...prev, city: '' }));
            }
        } else {
            setCities([]);
        }
    }, [formData.country, addressData]);

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
        
        if (!formData.phone.trim()) {
            toast.custom(() => (
                <CustomToast
                    title={t('enterPhone')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!validatePhoneNumber(formData.phone)) {
            toast.custom(() => (
                <CustomToast
                    title={t('invalidPhone')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.country) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectCountry')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.city) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectCity')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        // التحقق من الخريطة فقط إذا كان المستخدم قد اختار إظهارها
        if (showMap && (!formData.latitude || !formData.longitude)) {
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

        // إعداد البيانات للإرسال
        const submitData = {
            name: formData.name,
            phone: `+${formData.phone}`,
            country: parseInt(formData.country),
            city: parseInt(formData.city),
            is_default: formData.is_default,
            address: '.'
        };

        // إضافة العنوان الإضافي فقط إذا كان مفعلاً
        if (showExtraAddress && formData.extra_address.trim()) {
            submitData.extra_address = formData.extra_address;
        }

        // إضافة الإحداثيات فقط إذا كان المستخدم قد اختار إظهار الخريطة
        if (showMap && formData.latitude && formData.longitude) {
            submitData.latitude = formData.latitude;
            submitData.longitude = formData.longitude;
        }

        await onSubmit(submitData);
        
        // إعادة تعيين النموذج مع تحديد الدولة الأولى افتراضياً
        const defaultCountryId = countriesData && countriesData.length > 0 ? countriesData[0].id : '';
        
        setFormData({
            name: '',
            phone: phone || '',
            country: defaultCountryId,
            city: '',
            latitude: '',
            longitude: '',
            is_default: false,
            extra_address: ''
        });
        setShowExtraAddress(false);
        setShowMap(false);
        setCities([]);
        setMapCoords(defaultCoords);
        
        // تحميل المحافظات للدولة الافتراضية
        if (defaultCountryId) {
            loadCities(defaultCountryId);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div
                style={{maxWidth:'700px',maxHeight:'600px' ,overflow:'auto'}}
                className={`${styles.profileContainer}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                        {CloseIcon}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* اسم العنوان */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>{t('labelName')}</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder={t('placeholderName')}
                            className={styles.textInput}
                        />
                    </div>

                    {/* رقم الهاتف */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>{t('phone')}</label>
                        <PhoneInput
                            country={'iq'}
                            preferredCountries={['iq']}
                            enableSearch
                            value={formData.phone}
                            onChange={(value) => {
                                setFormData({...formData, phone: value});
                            }}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                dir: 'ltr',
                                placeholder: t('phonePlaceholder'),
                            }}
                            containerStyle={{
                                direction: 'ltr',
                                width: '100%',
                                borderRadius: '8px',
                                border: '2px solid #e1e5e9',
                                padding: '0px',
                                paddingLeft: '10px',
                            }}
                            inputStyle={{
                                width: '100%',
                                height: '48px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                paddingLeft: '60px',
                                paddingRight: '10px',
                                boxShadow: 'none',
                                textAlign: 'start',
                            }}
                            buttonStyle={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                borderRadius: '8px 0 0 8px',
                            }}
                            dropdownStyle={{
                                textAlign: 'right',
                                direction: 'rtl',
                                maxHeight: '200px',
                                overflowY: 'auto',
                            }}
                        />
                    </div>

                    {/* الدولة والمحافظة */}
                    <div className={styles.locationGroup}>
                        <div className={styles.selectWrapper}>
                            <label className={styles.inputLabel}>{t('country')}</label>
                            <SearchableSelect
                                options={countriesData?.map(country => ({
                                    id: country.id,
                                    name: country.name?.[lang] || country.name
                                })) || []}
                                value={formData.country}
                                onChange={(value) => setFormData({...formData, country: value, city: ''})}
                                placeholder={t('selectCountry')}
                                searchPlaceholder={t('searchCountry')}
                            />
                        </div>

                        <div className={styles.selectWrapper}>
                            <label className={styles.inputLabel}>{t('city')}</label>
                            <SearchableSelect
                                options={cities?.map(city => ({
                                    id: city.id,
                                    name: city.name?.[lang] || city.name
                                })) || []}
                                value={formData.city}
                                onChange={(value) => setFormData({...formData, city: value})}
                                placeholder={loadingCities ? t('loadingCities') : t('selectCity')}
                                disabled={!formData.country}
                                loading={loadingCities}
                                searchPlaceholder={t('searchCity')}
                            />
                        </div>
                    </div>

                    {/* العنوان الإضافي - Checkbox */}
                    <div className={styles.formGroup}>
                        <label className={styles.switchLabel}>
                            <input
                                type="checkbox"
                                checked={showExtraAddress}
                                onChange={(e) => setShowExtraAddress(e.target.checked)}
                                className={styles.switchInput}
                            />
                            <span className={styles.switchSlider}></span>
                            <span className={styles.switchText}>{t('addExtraDetails')}</span>
                        </label>
                    </div>

                    {showExtraAddress && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>{t('extraAddress')}</label>
                            <input
                                id="extra_address"
                                name="extra_address"
                                type="text"
                                value={formData.extra_address}
                                onChange={(e) => setFormData({...formData, extra_address: e.target.value})}
                                placeholder={t('placeholderExtra_address')}
                                className={styles.textInput}
                            />
                        </div>
                    )}

                    {/* الخريطة - Checkbox */}
                    <div className={styles.formGroup}>
                        <label className={styles.switchLabel}>
                            <input
                                type="checkbox"
                                checked={showMap}
                                onChange={(e) => setShowMap(e.target.checked)}
                                className={styles.switchInput}
                            />
                            <span className={styles.switchSlider}></span>
                            <span className={styles.switchText}>{t('addMapLocation')}</span>
                        </label>
                    </div>

                    {showMap && (
                        <div className={styles.formGroup}>
                            <div style={{borderRadius: '8px', overflow: 'hidden'}}>
                                <LocationPickerMap
                                    defaultPosition={mapCoords}
                                    height="250px"
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
                            </div>
                        </div>
                    )}

                    {/* العنوان الافتراضي */}
                    {(!addressData && !isDefault) && (
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
                    )}

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
