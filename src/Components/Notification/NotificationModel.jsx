import styles from "./NotificationModel.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";

const NotificationModel = (props) => {
    return (
        <div className={`${styles.container} ${props.isShow ? styles.show : ''}`}>
            <div className={styles.items}>
                <button
                    className={styles.closeBtn}
                    onClick={props.onClose}
                    aria-label="إغلاق الإشعارات"
                >
                    &times;
                </button>
                <div className={styles.notification}>
                    <CompleteProfile />
                    <Line />
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
                    />
                    <Line />
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
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