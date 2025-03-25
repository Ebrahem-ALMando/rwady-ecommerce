import styles from './DownloadWithLogo.module.css';
import Image from 'next/image';
import Link from "next/link";
import {DownloadIcon, ProfileIcon} from "@/utils/Icons";
import React from "react";

const DownloadAppWithLogo = ({hideLogo}) => {
    return (
        <div className={styles.mainDiv}>
            {!hideLogo &&
                <div className={styles.logoContainer}>
                <Link href='/'>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        layout="responsive"
                        width={200}
                        height={150}
                    />
                </Link>
            </div>}
            <button className={styles.downloadButton}>
                {DownloadIcon}
                حمل التطبيق
            </button>
        </div>
    );
};

export default DownloadAppWithLogo;
