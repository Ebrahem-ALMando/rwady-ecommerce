import styles from './HeaderProfileSidebar.module.css';
import {LocitionIcon} from "@/utils/Icons";

const HeaderProfileSidebar=(props)=>{
    return(
        <div className={styles.headerProfileSidebar}>
            <img
                className={styles.personalPhoto}
                src={'/images/img_9.png'} alt={"personal photo"}/>
            <div className={styles.mainInfo}>
            <p>
                حسام عبدالله
            </p>
                <p>
                    hossamabdallah@mail.com
                </p>
                <p className={styles.location}>
                    {LocitionIcon}
                    العراق
                </p>

            </div>

        </div>
    )
}
export default HeaderProfileSidebar