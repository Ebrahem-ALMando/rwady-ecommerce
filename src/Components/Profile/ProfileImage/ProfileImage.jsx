import styles from "@/Components/Profile/Profile.module.css";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import React from "react";

const ProfileImage = ({data,profile,t}) =>
{
    return (
        <div className={styles.imageWrapper}>
            <SafeImage
                key={data.avatar}
                src={profile.avatar}
                fallback="/img_5.png"
                // fallback="/img_3.png"
                alt={t("profileImageAlt", {name: profile.name})}
                width={70}
                height={70}
                className={styles.profileImage}
                priority
                sizes="(max-width: 768px) 100vw, 70px"
            />
        </div>
    )
}
export default ProfileImage