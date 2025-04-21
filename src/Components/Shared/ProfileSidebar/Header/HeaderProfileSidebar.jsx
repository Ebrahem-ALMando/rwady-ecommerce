import styles from './HeaderProfileSidebar.module.css';
import {LocitionIcon} from "@/utils/Icons";
import Image from "next/image";
import React from "react";

const HeaderProfileSidebar=(props)=>{
    return(
        <div className={styles.headerProfileSidebar}>

            <Image
                src={'/images/img_9.webp'}
                alt={"personal photo"}
                width={200}
                height={200}
                className={styles.personalPhoto}
                priority
                sizes="(max-width: 768px) 100vw, 200px"
            />
            <div className={styles.mainInfo}>
            <p>
                حسام عبدالله
            </p>
                <p>
                    hossamabdallah@mail.com
                </p>
                <p className={styles.location}>
                    {LocitionIcon}
                    العراق
                </p>

            </div>

        </div>
    )
}
export default HeaderProfileSidebar