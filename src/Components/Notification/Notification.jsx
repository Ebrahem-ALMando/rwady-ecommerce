import styles from "./Notification.module.css";
import CompleteProfile from "@/Components/Notification/Complete-Profile/CompleteProfile";
import Line from "@/Components/Shared/Line/Line";
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";

const Notification = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.notification}>
                    <CompleteProfile/>
                    <Line/>
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
                    />
                    <Line/>
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
                    />
                    <Line/>
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
                    />
                    <Line/>
                    <NotificationCard
                        title={"الطلبات"}
                        time={"منذ ساعة"}
                        text={"تم قبول طلبك بنجاح من خلال إدارة RWADY "}
                        isAnyDetails={true}
                    />

                </div>
            </div>
        </div>
    )
}
export default Notification