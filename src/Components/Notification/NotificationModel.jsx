"use client";
import styles from "./NotificationModel.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import "@/i18n";

const NotificationModel = ({ isShow, onClose }) => {
    const { t } = useTranslation("common");

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t("notification.dialog")}
            tabIndex={-1}
            className={`${styles.container} ${isShow ? styles.show : ''}`}
        >
            <div className={styles.items}>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label={t("notification.close")}
                >
                    &times;
                </button>

                <div className={styles.notification}>
                    <CompleteProfile />
                    <Line />

                    <NotificationCard
                        title={t("notification.ordersTitle")}
                        time={t("notification.oneHourAgo")}
                        text={t("notification.message")}
                        isAnyDetails
                    />
                    <Line />

                    <NotificationCard
                        title={t("notification.ordersTitle")}
                        time={t("notification.oneHourAgo")}
                        text={t("notification.message")}
                        isAnyDetails
                    />
                    <Line />

                    <Link href="/notification" className={styles.moreLink}>
                        {t("notification.showMore")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationModel;
