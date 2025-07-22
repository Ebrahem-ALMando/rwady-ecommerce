import { useTranslations } from "next-intl";
import styles from './CompleteProfile.module.css';
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
import Link from "next/link";

const CompleteProfile = ({ lang }) => {
    const t = useTranslations("notification");

    return (
        <div className={styles.completeProfile}>
            <NotificationCard
                // time="منذ ساعة"
                title={t("welcome_title")}
                color="#0741AD"
                text={t("welcome_message")}
            />
            <div className={styles.buttonAction}>
                <Link
                    prefetch={true}
                    href={`/${lang}/profile`}
                    className={styles.primaryBtn}
                    aria-label={t("complete_now")}
                >
                    {t("complete_now")}
                </Link>
                <button
                    className={styles.secondaryBtn}
                    aria-label={t("skip")}
                >
                    {t("skip")}
                </button>
            </div>
        </div>
    );
};

export default CompleteProfile;
