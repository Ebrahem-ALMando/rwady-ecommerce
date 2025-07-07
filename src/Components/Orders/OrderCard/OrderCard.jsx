// "use client";
//
// import styles from "./OrderCard.module.css";
// import { useRouter } from "next/navigation";
// import { Clock, Hash, CheckCircle, XCircle } from "lucide-react";
//
// import Link from 'next/link';
// const OrderCard = ({ id, date, status, isCanceled }) => {
//     const router = useRouter();
//
//     const formatArabicDate = (dateStr) => {
//         const d = new Date(dateStr);
//         return d.toLocaleDateString("ar-EG", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         }) + "، " + d.toLocaleTimeString("ar-EG");
//     };
//
//     return (
//         <div className={styles.card}>
//             <div className={styles.info}>
//                 <p className={styles.line}>
//                     <Hash size={16} className={styles.icon} />
//                     رقم الطلب: {id}
//                 </p>
//                 <p className={styles.line}>
//                     <Clock size={16} className={styles.icon} />
//                     بتاريخ: {formatArabicDate(date)}
//                 </p>
//                 <p
//                     className={`${styles.line} ${styles.status}`}
//                     style={{ color: isCanceled ? "#F55157" : "#07AD5D" }}
//                 >
//                     {isCanceled ? <XCircle size={16} className={styles.icon} /> : <CheckCircle size={16} className={styles.icon} />}
//                     الحالة: {status}
//                 </p>
//             </div>
//
//             <div className={styles.actions}>
//                 <Link
//                     className={styles.detailsBtn}
//                     href={`/orders/${id}`}
//                 >
//                     تفاصيل <span className={styles.arrow}>➤</span>
//                 </Link>
//             </div>
//         </div>
//     );
// };
//
// export default OrderCard;


"use client";

import styles from "./OrderCard.module.css";
import { Clock, Hash, CheckCircle, XCircle, CreditCard, Info } from "lucide-react";
import Link from 'next/link';
import {useLocale, useTranslations} from "next-intl";

const OrderCard = ({ id, date, status, paymentStatus, isCanceled,locale }) => {
    const t = useTranslations("Orders");

    const formatDateTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }) + ", " + d.toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US");
    };

    const isRTL = locale === "ar";
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <p className={styles.line}>
                    <Hash size={16} className={styles.icon}/>
                    {t("order_number")}: {id}
                </p>

                <p className={styles.line}>
                    <Clock size={16} className={styles.icon}/>
                    {t("order_date")}: {formatDateTime(date)}
                </p>

                <p
                    className={`${styles.line} ${styles.status}`}
                    style={{
                        color:
                            status === "cancelled"
                                ? "#F55157"
                                : status === "pending"
                                    ? "#F5B300"
                                    : "#07AD5D"
                    }}
                >
                    {status === "cancelled" ? (
                        <XCircle size={16} className={styles.icon}/>
                    ) : (
                        <CheckCircle size={16} className={styles.icon}/>
                    )}
                    {t("order_status")}: {t(`statuses.${status}`) || status}
                </p>

                {paymentStatus && (
                    <p
                        className={`${styles.line} ${styles.status}`}
                        style={{color: paymentStatus === "paid" ? "#07AD5D" : "#F55157"}}
                    >
                        <CreditCard size={16} className={styles.icon}/>
                        {t("payment_status")}: {t(`statuses.${paymentStatus}`) || paymentStatus}
                    </p>
                )}


            </div>

            <div className={styles.actions}>
                <Link className={styles.detailsBtn} href={`/orders/${id}`}>
                    {t("details")}{" "}
                    <span
                        className={styles.arrow}
                        style={{
                            display: "inline-block",
                            transform: isRTL ? "rotateY(180deg)" : "none"
                        }}
                    >
                                ➤
  </span>
                </Link>

            </div>
        </div>
    );
};

export default OrderCard;
