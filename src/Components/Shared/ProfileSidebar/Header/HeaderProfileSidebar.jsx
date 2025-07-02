// "use client"
// import styles from './HeaderProfileSidebar.module.css';
// import {LocitionIcon} from "@/utils/Icons";
// import Image from "next/image";
// import React from "react";
// import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
//
// const HeaderProfileSidebar=({data})=>{
//
//     console.log(data)
//     return(
//         <div className={styles.headerProfileSidebar}>
//
//             <SafeImage
//                 src={data.avatar}
//                 fallback={"/images/img_9.webp"}
//                 alt={"personal photo"}
//                 width={60}
//                 height={60}
//                 className={styles.personalPhoto}
//                 priority
//                 sizes="(max-width: 768px) 100vw, 200px"
//             />
//             <div className={styles.mainInfo}>
//             <p>
//                 {data.name||"اسم الحساب .."}
//             </p>
//                 <p>
//                     {data.email||"user@mail.com"}
//                 </p>
//                 {/*<p className={styles.location}>*/}
//                 {/*    {LocitionIcon}*/}
//                 {/*    {data.city}*/}
//                 {/*</p>*/}
//
//             </div>
//
//         </div>
//     )
// }
// export default HeaderProfileSidebar

"use client";
import styles from './HeaderProfileSidebar.module.css';
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import React from "react";
import { useTranslations } from "next-intl";
import ProfileImage from "@/Components/Profile/ProfileImage/ProfileImage";

const HeaderProfileSidebar = ({ data }) => {
    const t = useTranslations("Sidebar");
    const tProfile = useTranslations("Profile");

    return (
        <div className={styles.headerProfileSidebar}>
            <ProfileImage
                data={data}
                profile={data}
                t={tProfile}
            />
            <div className={styles.mainInfo}>
                <p>{data.name || t("defaultName")}</p>
                <p>{"00"+data.phone || t("defaultPhone")}</p>
            </div>
        </div>
    );
};

export default HeaderProfileSidebar;
