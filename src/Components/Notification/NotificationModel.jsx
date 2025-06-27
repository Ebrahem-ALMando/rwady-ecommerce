"use client";
import styles from "./NotificationModel.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";
import {useTranslations} from "next-intl";


const NotificationModel = ({ isShow, onClose }) => {
    const  t  = useTranslations("notification");

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t("dialog")}
            tabIndex={-1}
            className={`${styles.container} ${isShow ? styles.show : ''}`}
        >
            <div className={styles.items}>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label={t("close")}
                >
                    &times;
                </button>

                <div className={styles.notification}>
                    <CompleteProfile />
                    <Line />

                    <NotificationCard
                        title={t("ordersTitle")}
                        time={t("oneHourAgo")}
                        text={t("message")}
                        isAnyDetails
                    />
                    <Line />

                    <NotificationCard
                        title={t("ordersTitle")}
                        time={t("oneHourAgo")}
                        text={t("message")}
                        isAnyDetails
                    />
                    <Line />

                    <Link href="/notification" className={styles.moreLink}>
                        {t("showMore")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationModel;
