import styles from "./NotificationContent.module.css";
import Link from "next/link";

const NotificationContent = ({ color, text, isAnyDetails }) => {
    return (
        <p
            className={styles.notificationText}
            style={{ color: color || "#333" }}
            aria-label="محتوى الإشعار"
        >
            {text}
            {isAnyDetails && (
                <>
                    ،{" "}
                    <Link
                        href="#"
                        className="underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="تفاصيل الطلب"
                    >
                        تفاصيل الطلب
                    </Link>
                </>
            )}
        </p>
    );
};

export default NotificationContent;
