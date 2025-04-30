'use client';

import React, { useEffect, useState } from 'react';
import styles from './EditProfileForm.module.css';
import Line from "@/Components/Shared/Line/Line";
import { CloseIcon } from "@/utils/Icons";
import { toast } from "react-hot-toast";
import { updateProfile } from "@/api/services/auth/updateProfile";
import useSWR from "swr";
import { getCities } from "@/api/services/location/getCities";
import { getDistricts } from "@/api/services/location/getDistricts";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";

const EditProfileForm = (props) => {
    const [formData, setFormData] = useState({
        fullName: props.profileData?.name || '',
        email: props.profileData?.email || '',
        phone: props.profileData?.phone || '',
        city: props.profileData?.city_id || '',
        district: props.profileData?.district_id || '',
    });


    const [districts, setDistricts] = useState([]);
    const { data: citiesData, error, isLoading, mutate } = useSWR("cities", getCities);

    useEffect(() => {
        if (props.profileData?.city_id) {
            setFormData(prev => ({
                ...prev,
                city: props.profileData.city_id || '',
                district: props.profileData.district_id || '',
            }));

            getDistricts(props.profileData.city_id)
                .then(res => setDistricts(res.data))
                .catch(() => toast.error("فشل في تحميل المناطق"));
        }
    }, [props.profileData?.city_id]);



    const cities = citiesData?.data || [];

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
        if (!formData.fullName.trim() || formData.fullName.length < 3) {
            toast.error("الرجاء إدخال الاسم الكامل (3 أحرف على الأقل)");
            return false;
        }
        if (!formData.email.trim() || !formData.email.includes("@") || !formData.email.includes(".")) {
            toast.error("الرجاء إدخال بريد إلكتروني صالح");
            return false;
        }
        // if (!formData.city) {
        //     toast.error("يرجى اختيار المدينة");
        //     return false;
        // }
        // if (!formData.district) {
        //     toast.error("يرجى اختيار المنطقة");
        //     return false;
        // }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const profileData = new FormData();
        profileData.append("name", formData.fullName);
        profileData.append("email", formData.email);
        profileData.append("phone", formData.phone);
        profileData.append("city_id", formData.city);
        profileData.append("district_id", formData.district);

        try {
            const res = await updateProfile(profileData);
            if (res.status_code === 200) {
                toast.success("تم تحديث البيانات بنجاح");
                props.mutate();
                props.setIsOpen(false);
            } else {
                toast.error("فشل في التحديث");
            }
        } catch {
            toast.error("حدث خطأ أثناء التحديث");
        }
    };

    return props.isOpen && (
        <div className={styles.modalOverlay} onClick={() => props.setIsOpen(false)}>
            <div className={styles.profileContainer} role="dialog" aria-modal="true" aria-labelledby="profileEditTitle" onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 id="profileEditTitle" className={styles.title}>تعديل المعلومات الشخصية</h2>
                    <button className={styles.closeIcon} onClick={() => props.setIsOpen(false)} aria-label="إغلاق النافذة">
                        {CloseIcon}
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.inputLabel}>الاسم الكامل</label>
                        <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={styles.textInput} />
                    </div>
                    {/*<div className={styles.formGroup}>*/}
                    {/*    <label className={styles.inputLabel}>الأسم الأخير</label>*/}
                    {/*    <input*/}
                    {/*        name="lastName"*/}
                    {/*        value={formData.lastName}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        className={styles.textInput}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.inputLabel}>البريد الإلكتروني</label>
                        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className={styles.textInput} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.inputLabel}>رقم الجوال</label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.countryCode}>+966</span>
                            <input id="phone" type="tel" name="phone" value={formData.phone} className={styles.textInput} disabled aria-disabled="true" />
                        </div>
                    </div>

                    <div className={styles.locationGroup}>
                        <div className={styles.selectWrapper}>
                            <label htmlFor="city" className={styles.inputLabel}>المدينة</label>
                            <select id="city" name="city" value={formData.city} onChange={handleChange} className={styles.selectInput}>
                                <option value="" disabled hidden>اختر المدينة</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.selectWrapper}>
                            <label htmlFor="district" className={styles.inputLabel}>المنطقة / الدولة</label>
                            <select id="district" name="district" value={formData.district} onChange={handleChange} className={styles.selectInput}>
                                <option value="" disabled hidden>اختر المنطقة</option>
                                {districts?.map(dist => (
                                    <option key={dist.id} value={dist.id}>{dist.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Line />

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton} aria-label="حفظ التغييرات">حفظ التغييرات</button>
                        <button type="button" onClick={() => props.setIsOpen(false)} className={styles.cancelButton} aria-label="إلغاء">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(EditProfileForm);
