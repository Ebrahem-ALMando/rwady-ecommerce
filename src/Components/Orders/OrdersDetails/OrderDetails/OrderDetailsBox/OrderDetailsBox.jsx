import styles from "./OrderDetailsBox.module.css";
import { Clock, Hash, BadgeCheck,DollarSign } from "lucide-react";

const OrderDetailsBox = ({ id, date, status, total }) => {
    const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }) + "، " + new Date(date).toLocaleTimeString("ar-EG");

    return (
        <div className={styles.box}>
            <h4 className={styles.title}>تفاصيل الطلب</h4>
            <div className={styles.row}>
                <Hash size={16}/> <span>رقم الطلب:</span> <strong>{id}</strong>
            </div>
            <div className={styles.row}>
                <Clock size={16}/> <span>التاريخ:</span> <strong>{formattedDate}</strong>
            </div>
            <div className={styles.row}>
                <BadgeCheck size={16}/> <span>الحالة:</span> <strong
                style={{color: status === "تم الإلغاء" ? "#F55157" : "#07AD5D"}}>{status}</strong>
            </div>
            <div className={styles.row}>
                <DollarSign size={16} className={styles.icon}/>
                <span>القيمة:</span>
                <strong>{total} IQD</strong>
            </div>

        </div>
    );
};

export default OrderDetailsBox;
