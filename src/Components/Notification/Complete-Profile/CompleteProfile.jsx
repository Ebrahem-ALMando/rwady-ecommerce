import styles from './CompleteProfile.module.css'
import NotificationCard from "@/Components/Notification/NotificationCard/NotificationCard";
const CompleteProfile = () => {
    return(
        <div className={styles.completeProfile}>
            <NotificationCard
            time={"منذ ساعة"}
            title={"نورت RWADY!"}
            color={"#0741AD"}
            text={"اهلاً ومرحباً بك في موقع RWADY ، قم بإكمال ملفك الشخصي وتصفح آخر العروض والطلبات الموجودة"}
            />
            <div className={styles.buttonAction}>
                <button>
                    اكمال الآن
                </button>
                <button>
                    ليس الآن
                </button>
            </div>
        </div>
    )
}
export default CompleteProfile;