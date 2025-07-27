"use client"
import styles from "./Notification.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import {useLocale, useTranslations} from "next-intl";
import useSWR from "swr";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {getNotifications} from "@/api/services/general/notifications/getNotifications";
import NotificationsSkeleton from "@/Components/Notification/NotificationsSkeleton/NotificationsSkeleton";
import {getProfile} from "@/api/services/auth/getProfile";
import {formatTime} from "@/utils/formatTime";
import {useEffect, useState} from "react";
import {readNotification} from "@/api/services/general/notifications/readNotification";
import { database } from "@/lib/firebase";
import EmptyNotificationBox from "@/Components/Notification/EmptyNotificationBox/EmptyNotificationBox";
// import { ref, onChildAdded } from "firebase/database";
const SKIP_PROFILE_KEY = "rwady_skip_complete_profile";
const SKIP_PROFILE_MINUTES = 10;

const Notification = () => {
    const t = useTranslations("notification");
    const time = useTranslations("time");
    const lang=useLocale()

    const { data, error, isLoading, mutate }
        = useSWR(
        [`notificationData`, lang],
        ([, lang]) => getNotifications(lang),
        {
            revalidateOnFocus: false,
        }
    );


    const { data: profileData } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });

    const profileDataList = profileData?.data ?? {};
    const userName = profileDataList?.name;
    const notificationList = data?.data ?? [];

    const [hideProfile, setHideProfile] = useState(false);

    useEffect(() => {
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

    useEffect(() => {
        if (!notificationList || notificationList.length === 0) return;

        const unreadIds = notificationList
            .filter((notif) => !notif.is_read)
            .map((notif) => notif.id);

        if (unreadIds.length === 0) return;

        Promise.all(unreadIds.map((id) => readNotification(id)))
            .then(() => {
                mutate();
            })
            .catch((err) => {
            });
    }, [notificationList]);
    // useEffect(() => {
    //     if (!profileDataList?.id) return;
    //
    //     const notiRef = ref(database, `notifications/${profileDataList.id}`);
    //     const unsubscribe = onChildAdded(notiRef, (snapshot) => {
    //         const newNoti = snapshot.val();
    //         console.log("إشعار جديد من Firebase:", newNoti);
    //         mutate(); // يشعل refetch
    //     });
    //
    //     return () => unsubscribe();
    // }, [profileDataList?.id, mutate]);

    const handleSkipProfile = () => {
        localStorage.setItem(SKIP_PROFILE_KEY, JSON.stringify({ ts: Date.now() }));
        setHideProfile(true);
    };

    if (isLoading) return <NotificationsSkeleton />;
    if (error) return <ReloadWithError />;




    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.notification}>
                    {!hideProfile && !userName && (
                        <>
                            <CompleteProfile
                                lang={lang}
                                onSkip={handleSkipProfile}
                            />
                            <Line />
                        </>
                    )}
                    {!notificationList||notificationList.length===0
                        ?
                        <EmptyNotificationBox />
                        :
                        <>
                            {notificationList.map((notif) => (
                                <div key={notif.id}>
                                    <NotificationCard
                                        orderId={notif?.metadata?.data?.order_id}
                                        title={notif.title}
                                        time={formatTime(notif.created_at,time)}
                                        text={notif.message}
                                        isAnyDetails={!!notif.notificationable_id}
                                        lang={lang}
                                    />
                                    <Line />
                                </div>
                            ))}
                        </>
                    }



                </div>
            </div>
        </div>
    );
};

export default Notification;
