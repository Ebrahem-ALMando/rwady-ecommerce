import styles from "./NotificationContent.module.css";
import Link from "next/link";
import {useTranslations} from "next-intl";

const NotificationContent = ({orderId, color, text, isAnyDetails,lang }) => {
    const t = useTranslations("notification");

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
                        prefetch={true}
                        href={`/${lang}/orders/${orderId}`}
                        className="underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label={t('details')}
                    >
                        {t('details')}
                    </Link>
                </>
            )}
        </p>
    );
};

export default NotificationContent;
