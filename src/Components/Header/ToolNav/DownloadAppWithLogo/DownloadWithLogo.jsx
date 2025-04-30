"use client";
import styles from './DownloadWithLogo.module.css';
import Image from 'next/image';
import Link from "next/link";
import { DownloadIcon } from "@/utils/Icons";
import React from "react";
import { useTranslation } from "next-i18next";
import "@/i18n";

const DownloadAppWithLogo = ({ hideLogo }) => {
    const { t } = useTranslation("common");

    return (
        <div className={styles.mainDiv}>
            {!hideLogo && (
                <div className={styles.logoContainer}>
                    <Link href="/" aria-label={t("downloadApp.homeLabel")}>
                        <Image
                            src="/logo.png"
                            alt={t("downloadApp.logoAlt")}
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
                aria-label={t("downloadApp.aria")}
            >
                {DownloadIcon}
                {t("downloadApp.button")}
            </button>
        </div>
    );
};

export default DownloadAppWithLogo;
