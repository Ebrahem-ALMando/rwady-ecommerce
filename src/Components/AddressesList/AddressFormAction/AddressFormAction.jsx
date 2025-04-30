'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
import Line from "@/Components/Shared/Line/Line";
import { CloseIcon } from "@/utils/Icons";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { getCities } from "@/api/services/location/getCities";
import { getDistricts } from "@/api/services/location/getDistricts";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { motion } from 'framer-motion';
import {log} from "next/dist/server/typescript/utils";
const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit }) => {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        district: '',
        postal_code: '',
        phone: '',
        is_default: false,
    });

    const [districts, setDistricts] = useState([]);

    const { data: citiesData, error, isLoading, mutate: refreshCities } =
        useSWR("cities", getCities,{

            revalidateOnFocus:false
        });
    const cities = citiesData?.data || [];


    useEffect(() => {
        if (formData.city) {
            getDistricts(formData.city)
                .then(res => setDistricts(res))
                .catch(() => toast.error("فشل في تحميل المناطق"));
        }
        console.log(districts)
    }, [formData.city]);


    useEffect(() => {
        if (addressData) {
            setFormData({
                address: addressData.address || '',
                city: addressData.city_id || '',
                // district: addressData.district_id || '',
                // district: addressData.district_id || '',
                postal_code: addressData.postal_code || '',
                phone: addressData.phone || '',
                is_default: addressData.is_default || false,
            });

            if (addressData.city_id) {
                getDistricts(addressData.city_id)
                    .then(res => setDistricts(res.data))
                    .catch(() => toast.error("فشل في تحميل المناطق"));
            }
        } else {
            setFormData({
                address: '',
                city: '',
                district: '',
                postal_code: '',
                phone: '',
                is_default: false,
            });
            setDistricts([]);
        }
    }, [addressData]);



    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "city") {
            try {
                const res = await getDistricts(value);
                setDistricts(res.data);
                setFormData(prev => ({ ...prev, district: '' }));
            } catch {
                toast.error("فشل في تحميل المناطق");
            }
        }
    };

    const validateForm = () => {
        if (!formData.address.trim()) {
            toast.error("يرجى إدخال العنوان الكامل");
            return false;
        }
        if (!formData.city) {
            toast.error("يرجى اختيار المدينة");
            return false;
        }
        // if (!formData.district) {
        //     toast.error("يرجى اختيار المنطقة");
        //     return false;
        // }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await onSubmit({
                address: formData.address,
                city_id: formData.city,
                district_id: formData.district,
                postal_code: formData.postal_code,
                phone: formData.phone,
                is_default: formData.is_default ? 1 : 0,
            });

            setIsOpen(false);
            mutate?.();
        } catch (err) {
            toast.error("حدث خطأ أثناء الحفظ");
        }
    };


    if (!isOpen) return null;
    if (isLoading) return <Loading />;
    if (error) return <Error onRetry={() => refreshCities()} />;

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div className={styles.profileContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                        {CloseIcon}
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.inputLabel}>العنوان الكامل</label>
                        <input id="address" name="address" value={formData.address} onChange={handleChange}
                               className={styles.textInput}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="postal_code" className={styles.inputLabel}>الرمز البريدي</label>
                        <input id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange}
                               className={styles.textInput}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.inputLabel}>رقم الجوال</label>
                        <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                               className={styles.textInput}/>
                    </div>

                    <div className={styles.locationGroup}>
                        <div className={styles.selectWrapper}>
                            <label htmlFor="city" className={styles.inputLabel}>المدينة</label>
                            <select id="city" name="city" value={formData.city} onChange={handleChange}
                                    className={styles.selectInput}>
                                <option value="" disabled hidden>اختر المدينة</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.title}</option>
                                ))}
                            </select>
                        </div>

                        {formData.city !== '' && (
                            <motion.div
                                className={styles.selectWrapper}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <label htmlFor="district" className={styles.inputLabel}>المنطقة / الدولة</label>
                                <select
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled hidden>اختر المنطقة</option>
                                    {districts?.data?.map(dist => (
                                        <option key={dist.id} value={dist.id}>{dist.title}</option>
                                    ))}
                                </select>
                            </motion.div>
                        )}

                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.switchLabel}>
                            <input
                                type="checkbox"
                                name="is_default"
                                checked={formData.is_default}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_default: e.target.checked,
                                    }))
                                }
                                className={styles.switchInput}
                            />
                            <span className={styles.switchSlider}></span>
                            <span className={styles.switchText}>اجعل هذا العنوان الافتراضي</span>
                        </label>
                    </div>


                    <Line/>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>حفظ التغييرات</button>
                        <button type="button" onClick={() => setIsOpen(false)} className={styles.cancelButton}>إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(AddressFormAction);
