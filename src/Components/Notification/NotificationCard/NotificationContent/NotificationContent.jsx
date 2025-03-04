import styles from "./NotificationContent.module.css";
import Link from "next/link";

const NotificationContent=(props)=>{
    return(
        <>
            <p
                style={{
                    color:props.color
                }}
                className={styles.notificationText}>
                {props.text}
                {
                    props.isAnyDetails?
                    <span>
                         ,
                 <Link href="#" className="underline underline-offset-4">
                      تفاصيل الطلب
                 </Link>

                    </span>
                    :null
                }

            </p>
        </>
    )
}
export default NotificationContent