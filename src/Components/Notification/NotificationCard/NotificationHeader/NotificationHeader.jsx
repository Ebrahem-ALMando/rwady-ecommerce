import styles from "./NotificationHeader.module.css";
import Icon from "@/Components/Notification/Icon";

const NotificationHeader = ({ title = "", time = "" }) => {
    return (
        <div className={styles.welcome}>
            <p className={styles.welcomeText}>
                <Icon />
                {title}
            </p>
            <p className={styles.time}>
                {time}
            </p>
        </div>
    );
};

export default NotificationHeader;
