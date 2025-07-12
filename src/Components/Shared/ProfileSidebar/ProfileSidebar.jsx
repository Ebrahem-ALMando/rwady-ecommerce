"use client";

import styles from './ProfileSidebar.module.css';
import { profileButtons } from "@/Data/ProfileButton";
import ButtonTap from "@/Components/Shared/ProfileSidebar/ButtonTap/ButtonTap";
import HeaderProfileSidebar from "@/Components/Shared/ProfileSidebar/Header/HeaderProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import { logoutIcon } from "@/utils/Icons";
import { useLogoutHandler } from "@/hooks/useLogoutHandler";
import { useTranslations } from "next-intl";
import {usePathname} from "@/i18n/navigation";


const ProfileSidebar = ({ userData,mutate }) => {
    const pathname = usePathname();
    const activeLink = pathname.split('/')[1];
    console.log(activeLink)
    const handleLogout = useLogoutHandler(mutate);
    const t = useTranslations("Sidebar");

    return (
        <div className={styles.profileSidebar}>
            <HeaderProfileSidebar data={userData || {}} />
            <Line />
            {profileButtons.map((btn, i) => (
                <ButtonTap
                    key={i}
                    icon={btn.icon}
                    link={btn.link}
                    text={t(`buttons.${btn.key}`)}
                    isSelect={activeLink === btn.link}
                />
            ))}
            <Line />
            <ButtonTap
                icon={logoutIcon}
                text={t("logout")}
                link={"#"}
                isLogout={true}
                onClick={handleLogout}
            />
        </div>
    );
};

export default ProfileSidebar;
