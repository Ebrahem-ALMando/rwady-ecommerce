import styles from "./NotificationHeader.module.css";
import Icon from "@/Components/Notification/Icon";

const NotificationHeader = (props) => {
    return (
        <div className={styles.welcome}>
            <p className={styles.welcomeText}>
                <Icon/>
                {props.title}
            </p>
            <p className={styles.time}>
                {props.time}
            </p>
        </div>
    )
}
export default NotificationHeader;