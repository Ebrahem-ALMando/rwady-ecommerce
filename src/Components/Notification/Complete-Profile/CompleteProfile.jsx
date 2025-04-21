import styles from './CompleteProfile.module.css';
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";

const CompleteProfile = () => {
    return (
        <div className={styles.completeProfile}>
            <NotificationCard
                time="منذ ساعة"
                title="نورت RWADY!"
                color="#0741AD"
                text="أهلاً ومرحباً بك في موقع RWADY، قم بإكمال ملفك الشخصي وتصفح آخر العروض والطلبات الموجودة"
            />
            <div className={styles.buttonAction}>
                <button
                    className={styles.primaryBtn}
                    aria-label="الانتقال لإكمال الملف الشخصي"
                    // onClick={() => {
                    //
                    // }}
                >
                    إكمال الآن
                </button>
                <button
                    className={styles.secondaryBtn}
                    aria-label="تخطي إكمال الملف الشخصي حالياً"
                >
                    ليس الآن
                </button>
            </div>
        </div>
    );
};

export default CompleteProfile;
