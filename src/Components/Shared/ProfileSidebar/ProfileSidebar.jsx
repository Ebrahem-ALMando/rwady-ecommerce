"use client"
import { usePathname } from 'next/navigation'
import styles from './ProfileSidebar.module.css'
import {profileButtons} from "@/Data/ProfileButton";
import ButtonTap from "@/Components/Shared/ProfileSidebar/ButtonTap/ButtonTap";
import HeaderProfileSidebar from "@/Components/Shared/ProfileSidebar/Header/HeaderProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
const ProfileSidebar = (props) => {
    const pathname = usePathname()
    const activeLink = pathname.split('/').pop()

    return(
        <div className={styles.profileSidebar}>
            <HeaderProfileSidebar/>
            <Line/>
            {profileButtons.map((profileButton,index) => (
                <ButtonTap
                    key={index}
                    link={profileButton.link}
                    isSelect={activeLink === profileButton.link}
                    {...profileButton}
                />
            ))}
            <Line/>
            <ButtonTap
                icon={
                    (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.4399 15.3704C17.2499 15.3704 17.0599 15.3004 16.9099 15.1504C16.6199 14.8604 16.6199 14.3804 16.9099 14.0904L18.9399 12.0604L16.9099 10.0304C16.6199 9.74043 16.6199 9.26043 16.9099 8.97043C17.1999 8.68043 17.6799 8.68043 17.9699 8.97043L20.5299 11.5304C20.8199 11.8204 20.8199 12.3004 20.5299 12.5904L17.9699 15.1504C17.8199 15.3004 17.6299 15.3704 17.4399 15.3704Z"
                                fill="#DE1F1F"/>
                            <path
                                d="M19.9298 12.8096H9.75977C9.34977 12.8096 9.00977 12.4696 9.00977 12.0596C9.00977 11.6496 9.34977 11.3096 9.75977 11.3096H19.9298C20.3398 11.3096 20.6798 11.6496 20.6798 12.0596C20.6798 12.4696 20.3398 12.8096 19.9298 12.8096Z"
                                fill="#DE1F1F"/>
                            <path
                                d="M11.7598 20.75C6.60977 20.75 3.00977 17.15 3.00977 12C3.00977 6.85 6.60977 3.25 11.7598 3.25C12.1698 3.25 12.5098 3.59 12.5098 4C12.5098 4.41 12.1698 4.75 11.7598 4.75C7.48977 4.75 4.50977 7.73 4.50977 12C4.50977 16.27 7.48977 19.25 11.7598 19.25C12.1698 19.25 12.5098 19.59 12.5098 20C12.5098 20.41 12.1698 20.75 11.7598 20.75Z"
                                fill="#DE1F1F"/>
                        </svg>
                    )
                }
                text={"تسجيل الخروج"}
                link={"#"}
                isLogout={true}
            />
        </div>
    )
}
export default ProfileSidebar