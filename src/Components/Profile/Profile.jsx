"use client";
import styles from './Profile.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import TextSection from "@/Components/Profile/TextSection/TextSection";
import {useState} from "react";
import EditProfileForm from "@/Components/Profile/EditProfileForm/EditProfileForm";
import {Button} from "@heroui/react";

const Profile = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>

                <EditProfileForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                />

            <div className={styles.sidebar}>
                <ProfileSidebar/>
            </div>
            <div className={styles.profileCard}>
                <h3>
                    الملف الشخصي
                </h3>
                <Line/>
                <div className={styles.mainInfo}>
                    <div className={styles.imgContainer}>

                        <img src="/images/img_9.png" alt="Profile" className={styles.profileImage}/>
                        <div className={styles.imgAction}>
                            <p>
                                الحد الأقصي لحجم الصورة هو 10 ميجا بايت
                            </p>
                            <button>
                                تغيير الصورة
                            </button>
                            <button>
                                إزالة الصورة
                            </button>
                        </div>

                    </div>
                    <div className={styles.personalInfo}>
                        <p>
                            المعلومات الشخصية
                        </p>
                        <button
                            onClick={() => setIsOpen(true)}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.69332 13.0137C3.28666 13.0137 2.90666 12.8737 2.63332 12.6137C2.28666 12.287 2.11999 11.7937 2.17999 11.2604L2.42666 9.10036C2.47332 8.69369 2.71999 8.15369 3.00666 7.86036L8.47999 2.06702C9.84666 0.620358 11.2733 0.580358 12.72 1.94703C14.1667 3.31369 14.2067 4.74036 12.84 6.18703L7.36666 11.9804C7.08666 12.2804 6.56666 12.5604 6.15999 12.627L4.01332 12.9937C3.89999 13.0004 3.79999 13.0137 3.69332 13.0137ZM10.62 1.94036C10.1067 1.94036 9.65999 2.26036 9.20666 2.74036L3.73332 8.54036C3.59999 8.68036 3.44666 9.01369 3.41999 9.20703L3.17332 11.367C3.14666 11.587 3.19999 11.767 3.31999 11.8804C3.43999 11.9937 3.61999 12.0337 3.83999 12.0004L5.98666 11.6337C6.17999 11.6004 6.49999 11.427 6.63332 11.287L12.1067 5.49369C12.9333 4.61369 13.2333 3.80036 12.0267 2.66702C11.4933 2.15369 11.0333 1.94036 10.62 1.94036Z"
                                    fill="#0741AD"/>
                                <path
                                    d="M11.56 7.30022C11.5466 7.30022 11.5266 7.30022 11.5133 7.30022C9.4333 7.09356 7.75996 5.51356 7.43996 3.44689C7.39996 3.17356 7.58663 2.92023 7.85996 2.87356C8.1333 2.83356 8.38663 3.02023 8.4333 3.29356C8.68663 4.90689 9.9933 6.14689 11.62 6.30689C11.8933 6.33356 12.0933 6.58022 12.0666 6.85356C12.0333 7.10689 11.8133 7.30022 11.56 7.30022Z"
                                    fill="#0741AD"/>
                                <path
                                    d="M14 15.167H2C1.72667 15.167 1.5 14.9403 1.5 14.667C1.5 14.3937 1.72667 14.167 2 14.167H14C14.2733 14.167 14.5 14.3937 14.5 14.667C14.5 14.9403 14.2733 15.167 14 15.167Z"
                                    fill="#0741AD"/>
                            </svg>

                            تعديل
                        </button>

                    </div>
                    <div className={styles.info}>
                        <TextSection
                            title={"الأسم بالكامل"}
                            value={"حسام عبدالله"}
                        />
                        <TextSection
                            title={"البريد الالكتروني"}
                            value={"hossamabdallah@mail.com"}
                            isEmail
                        />
                        <TextSection
                            title={"رقم الجوال"}
                            value={"+966 330 114 22"}
                        />
                        <TextSection
                            title={"المدينة"}
                            value={"العراق"}
                        />
                        <TextSection
                            title={"الدولة"}
                            value={"مصر"}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
