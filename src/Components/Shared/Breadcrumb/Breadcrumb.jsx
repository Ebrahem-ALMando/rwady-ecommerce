import Link from "next/link";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ currentPage,isSubUrl,subName,subUrl }) => {
    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link href="/" className={styles.link}>الرئيسية</Link>
                {isSubUrl ?
                    <>
                        <span className={styles.separator}>/</span>
                        <Link href={subUrl} className={styles.link}>{subName}</Link>
                    </>
                    : ''
                }


                <span className={styles.separator}>/</span>
                <span className={styles.current}>{currentPage}</span>
            </nav>
        </div>
    );
};

export default Breadcrumb;
