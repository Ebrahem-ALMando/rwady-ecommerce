import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import {useLocale, useTranslations} from "next-intl";

const Breadcrumb = ({ currentPage,isSubUrl,subName,subUrl }) => {
    const t=useTranslations('Breadcrumb');
    const  lang=useLocale()
    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <Link prefetch={true} href={`/${lang}/`} className={styles.link}>{t("home")}</Link>
                {isSubUrl ?
                    <>
                        <span className={styles.separator}>/</span>
                        <Link  prefetch={true} href={subUrl} className={styles.link}>{subName}</Link>
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
