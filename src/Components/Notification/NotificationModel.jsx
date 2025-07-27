"use client";
import styles from "./NotificationModel.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import useSWR from "swr";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {getNotifications} from "@/api/services/general/notifications/getNotifications";
import NotificationsSkeleton from "@/Components/Notification/NotificationsSkeleton/NotificationsSkeleton";
import {getProfile} from "@/api/services/auth/getProfile";
import {formatTime} from "@/utils/formatTime";
import {useEffect, useState} from "react";
import EmptyNotificationBox from "@/Components/Notification/EmptyNotificationBox/EmptyNotificationBox";


const SKIP_PROFILE_KEY = "rwady_skip_complete_profile";
const SKIP_PROFILE_MINUTES = 10;

const NotificationModel = ({ isShow, onClose, lang }) => {
    const t = useTranslations("notification");
    const time = useTranslations("time");
    const locale = lang || useLocale();

    const { data, error, isLoading } = useSWR(
        [`notificationData`, locale],
        ([, locale]) => getNotifications(locale),
        { revalidateOnFocus: false }
    );
    const { data: profileData } = useSWR("profileData", getProfile, { revalidateOnFocus: false });
    const profileDataList = profileData?.data ?? {};
    const userName = profileDataList?.name;
    const notificationList = data?.data ?? [];
    const firstFive = notificationList.slice(0, 5);

    const [hideProfile, setHideProfile] = useState(false);

    useEffect(() => {
        // تحقق من وجود ختم زمني في localStorage
        const skipData = localStorage.getItem(SKIP_PROFILE_KEY);
        if (skipData) {
            const { ts } = JSON.parse(skipData);
            if (Date.now() - ts < SKIP_PROFILE_MINUTES * 60 * 1000) {
                setHideProfile(true);
            } else {
                localStorage.removeItem(SKIP_PROFILE_KEY);
            }
        }
    }, []);

    const handleSkipProfile = () => {
        localStorage.setItem(SKIP_PROFILE_KEY, JSON.stringify({ ts: Date.now() }));
        setHideProfile(true);
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t("dialog")}
            tabIndex={-1}
            className={`${styles.container} ${isShow ? styles.show : ''}`}
        >
            <div className={styles.items}>
                <div className={styles.header}>
                    <span className={styles.title}>{t("dialog")}</span>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label={t("close")}
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.notification}>
                    {!hideProfile && !userName && <><CompleteProfile lang={locale} onSkip={handleSkipProfile} /><Line /></>}
                    {isLoading ? (
                        <NotificationsSkeleton />
                    ) : error ? (
                        <ReloadWithError />
                    ) : !firstFive.length ? (
                        <EmptyNotificationBox onClose={onClose} />
                    ) : (
                        <>
                            {firstFive.map((notif) => (
                                <div key={notif.id}>
                                    <NotificationCard
                                        orderId={notif?.metadata?.data?.order_id}
                                        title={notif.title}
                                        time={formatTime(notif.created_at, time)}
                                        text={notif.message}
                                        isAnyDetails={!!notif.notificationable_id}
                                        lang={locale}
                                    />
                                    <Line />
                                </div>
                            ))}
                            <Link prefetch={true} href={`/${locale}/notification`}
                            onClick={onClose}
                            className={styles.moreLink}>
                                {t("showMore")}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModel;
