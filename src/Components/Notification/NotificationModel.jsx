import styles from "./NotificationModel.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";

const NotificationModel = ({ isShow, onClose }) => {
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="نافذة الإشعارات"
            tabIndex={-1}
            className={`${styles.container} ${isShow ? styles.show : ''}`}>
            <div className={styles.items}>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="إغلاق الإشعارات"
                >
                    &times;
                </button>
                <div className={styles.notification}>
                    <CompleteProfile />
                    <Line />
                    <NotificationCard
                        title="الطلبات"
                        time="منذ ساعة"
                        text="تم قبول طلبك بنجاح من خلال إدارة RWADY"
                        isAnyDetails
                    />
                    <Line />
                    <NotificationCard
                        title="الطلبات"
                        time="منذ ساعة"
                        text="تم قبول طلبك بنجاح من خلال إدارة RWADY"
                        isAnyDetails
                    />
                    <Line />
                    <Link href="/notification" className={styles.moreLink}>
                        عرض المزيد
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationModel;
