import styles from './TitleSection.module.css';
import {leftArrow} from "@/utils/Icons";

const TitleSection = (props) => {
    return (
        <div className={styles.titleSection}>
            <h3 className={styles.title}>
                {props.title}
            </h3>
            <p className={styles.viewAll}>
                عرض الكل
                {leftArrow}
            </p>
        </div>
    );
};

export default TitleSection;
