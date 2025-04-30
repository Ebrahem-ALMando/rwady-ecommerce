"use client";
import { usePathname, useRouter } from 'next/navigation';
import styles from './ProfileSidebar.module.css';
import { profileButtons } from "@/Data/ProfileButton";
import ButtonTap from "@/Components/Shared/ProfileSidebar/ButtonTap/ButtonTap";
import HeaderProfileSidebar from "@/Components/Shared/ProfileSidebar/Header/HeaderProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { logout } from "@/api/services/auth/logout";
import {logoutIcon} from "@/utils/Icons";
import useSWR from "swr";
import {getProfile} from "@/api/services/auth/getProfile";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import React from "react";

const ProfileSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const activeLink = pathname.split('/')[1];


    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res?.status_code === 200) {
                Cookies.remove("token");
                Cookies.remove("user_id");
                toast.success("تم تسجيل الخروج بنجاح");
                router.push("/sign-in");
            } else {
                toast.error("فشل في تسجيل الخروج");
                console.error("Logout failed:", res);
            }
        } catch (e) {
            toast.error("حدث خطأ أثناء تسجيل الخروج");
            console.error("Error during logout:", e.message);
        }
    };

    const { data, error, isLoading, mutate } = useSWR(
        "profileData",
        getProfile,
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
    return (
        <div className={styles.profileSidebar}>
            <HeaderProfileSidebar
                data={dataList}
            />
            <Line />
            {profileButtons.map((profileButton, index) => (
                <ButtonTap
                    key={index}
                    link={profileButton.link}
                    isSelect={activeLink === profileButton.link}
                    {...profileButton}
                />
            ))}
            <Line />
            <ButtonTap
                icon={
                    logoutIcon
                }
                text={"تسجيل الخروج"}
                link={"#"}
                isLogout={true}
                onClick={handleLogout}
            />
        </div>
    );
};

export default ProfileSidebar;
