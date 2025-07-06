
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from ".././Footer.module.css";

const FooterSkeleton = () => {
    return (
        <footer className={`${styles.footer} ${styles.skeleton}`}>
            <div className={styles.socialLinks}>
                <p><Skeleton width={100} height={16}/></p>
                <div className={styles.socialIcons}>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} circle width={26} height={26} style={{marginRight: 10}}/>
                    ))}
                </div>
            </div>

            <div className={styles.links}>
                <p><Skeleton width={80} height={16}/></p>
                <ul>
                    {[...Array(6)].map((_, i) => (
                        <li key={i}><Skeleton width={120} height={14}/></li>
                    ))}
                </ul>
            </div>

            <div className={styles.contactInfo}>
                <p><Skeleton width={90} height={16}/></p>
                {[...Array(3)].map((_, i) => (
                    <p key={i}><Skeleton width={160} height={14}/></p>
                ))}
            </div>

            <div className={styles.downloadSection}>
                <Skeleton width={256} height={66} style={{marginBottom: "1rem"}}/>
                <p><Skeleton width={180} height={16}/></p>
                <div className={styles.downloadButtons}>
                    <Skeleton width={130} height={50} style={{borderRadius: "8px"}}/>
                    <Skeleton width={130} height={50} style={{borderRadius: "8px"}}/>
                </div>
            </div>

            <hr className={styles.footerLine}/>
            <div className={styles.footerBottom}>
                <Skeleton width={200} height={14}/>
            </div>
        </footer>
    );
};

export default FooterSkeleton;
