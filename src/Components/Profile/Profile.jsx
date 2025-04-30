"use client";

import styles from './Profile.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import TextSection from "@/Components/Profile/TextSection/TextSection";
import React, {useState, useRef } from "react";
import EditProfileForm from "@/Components/Profile/EditProfileForm/EditProfileForm";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { editProfileIcon } from "@/utils/Icons";
import { updateProfile } from "@/api/services/auth/updateProfile";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {getProfile} from "@/api/services/auth/getProfile";

const Profile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const { data, error, isLoading, mutate } = useSWR(
        "profileData",
        getProfile,
        {
            revalidateIfStale: false,

            // onSuccess: () => console.log(" SWR fetched new data:", Date.now()),
            // onError: () => console.log(" SWR error fetching:", Date.now()),
        },

    );


    if (isLoading) return <Loading />;


    if (error) {
        return (
            <Error
                onRetry={() => {
                    mutate(undefined, { revalidate: true });
                }}
            />
        );
    }

    const dataList = data?.data || [];


    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            toast.error("الرجاء اختيار صورة أقل من 10 ميغا");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", dataList?.name || "");
        formData.append("email", dataList?.email || "");
        formData.append("phone", dataList?.phone || "");
        formData.append("city_id", dataList?.city_id || "");
        formData.append("district_id", dataList?.district_id || "");

        try {
            const res = await updateProfile(formData);

            if (res.status_code === 200) {
                toast.success("تم تحديث الصورة بنجاح");
                mutate(props.getData, { revalidate: true });
            } else {
                toast.error("فشل في تعديل الصورة");
            }
        } catch (err) {
            toast.error("حدث خطأ أثناء رفع الصورة");
        }
    };

    return (
        <div className={styles.container}>
            <EditProfileForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                profileData={dataList}
                mutate={mutate}
            />

            <div className={styles.sidebar}>
                <ProfileSidebar />
            </div>

            <div className={styles.profileCard}>
                <h3 className="text-xl md:text-2xl font-bold mt-4 mb-2 md:mt-8">
                    الملف الشخصي</h3>
                <Line/>
                <div className={styles.mainInfo}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={dataList?.img || "/images/img_9.webp"}
                            alt={`${dataList?.name || " صورة حساب المستخدم"}`}
                            width={200}
                            height={200}
                            className={styles.profileImage}
                            priority
                            sizes="(max-width: 768px) 100vw, 200px"
                        />

                        <div className={styles.imgAction}>
                            <p>الحد الأقصي لحجم الصورة هو 10 ميجا بايت</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <button type="button" onClick={handleImageClick}>
                                تغيير الصورة
                            </button>
                            <button type="button" onClick={() => toast("سيتم تفعيل لاحقًا")}>
                                إزالة الصورة
                            </button>
                        </div>
                    </div>

                    <div className={styles.personalInfo}>
                        <p>المعلومات الشخصية</p>
                        <button type="button" onClick={() => setIsOpen(true)}>
                            {editProfileIcon} تعديل
                        </button>
                    </div>

                    <div className={styles.info}>
                        <TextSection
                            title={"الأسم بالكامل"}
                            value={dataList?.name || "—"}
                        />
                        <TextSection
                            title={"البريد الالكتروني"}
                            value={dataList?.email || "—"}
                            isEmail
                        />
                        <TextSection
                            title={"رقم الجوال"}
                            value={dataList?.phone || "—"}
                        />
                        <TextSection
                            title={"المدينة"}
                            value={dataList?.city || "—"}
                        />
                        <TextSection
                            title={"الدولة"}
                            value={dataList?.district || "—"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
