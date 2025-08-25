"use client";

import { useFirebaseMessaging } from "./useFirebaseMessaging";
// import { useAppDispatch } from "@/lib/redux/hooks";
// import { fetchNotifications } from "@/lib/redux/slices/notificationsSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useLocale } from "next-intl";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
/**
 * هذا الكمبوننت يستمع لأي إشعار وارد في foreground
 * ويعرض Toast وNotification API (إذا كان الإذن granted)
 * ويحدث قائمة الإشعارات مباشرة
 *
 * تمت إضافة console.log لاختبار الاستقبال (فقرة 4)
 */
export default function ForegroundNotificationListener() {
    // const dispatch = useAppDispatch();
    const { permission } = useFirebaseMessaging();
    const lang = useLocale();
    useEffect(() => {
        // استقبال الرسائل من service worker أو FCM مباشرة

        const handleMessage = (event) => {
            if (event.data && event.data.type === "NEW_NOTIFICATION") {
                const payload = event.data.payload;
                showNotification(payload);
            }
        };
        // dispatch(fetchNotifications({}));
        mutate(["notificationData", lang]);
        mutate("notificationDataCount");

        if (typeof window !== "undefined" && 'serviceWorker' in navigator) {

            navigator.serviceWorker?.addEventListener("message", handleMessage);
            return () => {
                navigator.serviceWorker?.removeEventListener("message", handleMessage);
            };
        };
        // }, []);
    }, [permission]);


    function showNotification(payload) {
        // Toast UI
        toast.custom(() => (
            <CustomToast
                title={payload.notification?.title || "إشعار جديد"}
                type="success"
            />
        ) ,{
            duration: 5000,
        });
        // Native Notification API
        if (permission === "granted") {
            new Notification(payload.notification?.title || "إشعار جديد", {
                body: payload.notification?.body,
                icon: "./logo.png",
                badge: "./logo.png",
            });
        }
        // تحديث قائمة الإشعارات
        mutate(["notificationData", lang]);
        mutate("notificationDataCount");

    }

    return null; // لا يعرض أي UI
} 