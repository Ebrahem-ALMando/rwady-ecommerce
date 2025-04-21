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

    return (
        <div className={styles.profileSidebar}>
            <HeaderProfileSidebar />
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
