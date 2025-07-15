import styles from './TitleSection.module.css';
import {leftArrow} from "@/utils/Icons";
import Link from "next/link";
import {useTranslations} from "next-intl";


const TitleSection = ({initTitle="الاسم فارغ",initLink="#",show_title,title,can_show_more,show_more,lang}) => {
    const t=useTranslations("titleSection");
    return (
        <div className={styles.titleSection}>
            {show_title &&
                <h3 className={styles.title}>
                    {title||initTitle}
                </h3>
            }
            {can_show_more&&
                <Link href={`/${lang}/${show_more||initLink}`} prefetch={true}>
                    <p className={styles.viewAll}>
                        {t("viewAll")}
                        <span  className={lang==='en'?styles.arrowIconRotate:''}>
                            {leftArrow}
                        </span>
                    </p>
                </Link>
            }

        </div>
    );
};

export default TitleSection;
