"use client"
import styles from './HeaderProfileSidebar.module.css';
import {LocitionIcon} from "@/utils/Icons";
import Image from "next/image";
import React from "react";

const HeaderProfileSidebar=({data})=>{

    console.log(data)
    return(
        <div className={styles.headerProfileSidebar}>

            <Image
                src={data.img||"/images/img_9.webp"}
                alt={"personal photo"}
                width={200}
                height={200}
                className={styles.personalPhoto}
                priority
                sizes="(max-width: 768px) 100vw, 200px"
            />
            <div className={styles.mainInfo}>
            <p>
                {data.name||"اسم الحساب .."}
            </p>
                <p>
                    {data.email||"user@mail.com"}
                </p>
                <p className={styles.location}>
                    {LocitionIcon}
                    {data.city}
                </p>

            </div>

        </div>
    )
}
export default HeaderProfileSidebar