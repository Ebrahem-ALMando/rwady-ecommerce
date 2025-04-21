import styles from './DownloadWithLogo.module.css';
import Image from 'next/image';
import Link from "next/link";
import { DownloadIcon } from "@/utils/Icons";
import React from "react";

const DownloadAppWithLogo = ({ hideLogo }) => {
    return (
        <div className={styles.mainDiv}>
            {!hideLogo && (
                <div className={styles.logoContainer}>
                    <Link href="/" aria-label="العودة إلى الصفحة الرئيسية">
                        <Image
                            src="/logo.png"
                            alt="شعار موقع روادي"
                            width={200}
                            height={150}
                            priority
                            // layout="responsive"
                        />
                    </Link>
                </div>
            )}
            <button
                type="button"
                className={styles.downloadButton}
                aria-label="تحميل تطبيق روادي"
            >
                {DownloadIcon}
                حمل التطبيق
            </button>
        </div>
    );
};

export default DownloadAppWithLogo;
