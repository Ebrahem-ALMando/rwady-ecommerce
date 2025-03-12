
'use client'
import { useState } from 'react';
import styles from './EditProfileForm.module.css';
import Line from "@/Components/Shared/Line/Line";

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
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"
                                        fill="#0741AD"
                                    />
                                </svg>
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