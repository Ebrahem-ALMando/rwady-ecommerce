import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/Components/Notification/Notification.module.css";


const NotificationSkeletonItem = () => {
    return (
        <div style={{ padding: "1rem 0", borderBottom: "1px solid #ddd" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <Skeleton circle width={36} height={36} />
                    <Skeleton width={80} height={35} />
                </p>
                <Skeleton width={90} height={30} />
            </div>
            <p style={{ marginTop: "0.9rem" }}>
                <Skeleton width={`80%`} height={40} />
            </p>

        </div>
    );
};

const NotificationsSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={styles.notification}>

            {Array.from({ length: 4 }).map((_, i) => (
                <NotificationSkeletonItem key={i} />
            ))}
        </div>
        </div>
        </div>

    );
};

export default NotificationsSkeleton;
