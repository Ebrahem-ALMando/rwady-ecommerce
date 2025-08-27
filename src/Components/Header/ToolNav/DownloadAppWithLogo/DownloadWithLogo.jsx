'use client'
import styles from './DownloadWithLogo.module.css';
import Image from 'next/image';
import Link from "next/link";
import { DownloadIcon } from "@/utils/Icons";
import React from "react";
import {useTranslations} from "next-intl";



const DownloadAppWithLogo =  ({ hideLogo,lang,downloadApp }) => {
    const  t  = useTranslations("downloadApp");
   
        return (
        <div className={styles.mainDiv}>
            {!hideLogo && (
                <div className={styles.logoContainer}>
                    <Link href={`/${lang}`} aria-label={t("homeLabel")}>
                        <Image
                            src="/logo.png"
                            alt={t("logoAlt")}
                            width={200}
                            height={150}
                            priority
                        />
                    </Link>
                </div>
            )}
            <button
                type="button"
                className={styles.downloadButton}
                aria-label={t("aria")}
                onClick={() => {
                    console.log(downloadApp);
                    if(downloadApp){
                        window.open(downloadApp, "_blank");
                    }
                }}
            >
                {DownloadIcon}
                {t("button")}
            </button>
        </div>
    );
};

export default DownloadAppWithLogo;

