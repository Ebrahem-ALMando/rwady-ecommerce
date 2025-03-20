
'use client'
import { useState } from 'react';
import styles from './EditProfileForm.module.css';
import Line from "@/Components/Shared/Line/Line";
import {CloseIcon} from "@/utils/Icons";

const EditProfileForm = (props) => {

    const [formData, setFormData] = useState({
        fullName: 'حسام',
        lastName: 'عبدالله',
        email: 'hossamabdallah@mail.com',
        mobile: '5443330094',
        country: 'العراق',
        city: 'أبها'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setIsOpen(false);
    };

    return (
        <>
            {props.isOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => props.setIsOpen(false)}
                >
                    <div
                        className={styles.profileContainer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>تعديل المعلومات الشخصية</h2>
                            <button
                                className={styles.closeIcon}
                                 onClick={
                                     ()=>{
                                         props.setIsOpen(false)
                                     }
                                 }
                            >
                                {CloseIcon}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>الاسم الكامل</label>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>الأسم الأخير</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                />
                            </div>


                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.textInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.inputLabel}>رقم الجوال</label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.countryCode}>+966</span>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className={styles.textInput}

                                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                                        maxLength="12"
                                    />
                                </div>
                            </div>


                            <div className={styles.locationGroup}>
                                <div className={styles.selectWrapper}>
                                    <label className={styles.inputLabel}>الدولة</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={styles.selectInput}
                                    >
                                        <option value="العراق">العراق</option>
                                        <option value="السعودية">السعودية</option>
                                    </select>
                                </div>

                                <div className={styles.selectWrapper}>
                                    <label className={styles.inputLabel}>المدينة</label>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={styles.selectInput}
                                    >
                                        <option value="أبها">أبها</option>
                                        <option value="الرياض">الرياض</option>
                                    </select>
                                </div>
                            </div>
                            <Line/>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                >
                                    حفظ التغييرات
                                </button>
                                <button
                                    type="button"
                                    onClick={() => props.setIsOpen(false)}
                                    className={styles.cancelButton}
                                >
                                    إلغاء
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfileForm;