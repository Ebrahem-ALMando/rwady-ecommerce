// import styles from "./TransactionsTable.module.css";
// import Link from "next/link";
// import {downloadOrderIcon} from "@/utils/Icons";
// import {Hash} from "lucide-react";
// const TransactionsTable=(props)=> {
//     return (
//         <table className={styles.table}>
//             <thead>
//             <tr className={styles.headerRow}>
//                 <th className={styles.headerCell}>رقم الطلـــــب</th>
//
//                 <th className={styles.headerCell}>التاريــــــــــــــــــــــــــــــــــــخ</th>
//                 <th className={styles.headerCell}>مبلغ المعاملة</th>
//                 <th className={styles.headerCell}>طريقة الدفع</th>
//                 <th className={styles.headerCell}>حالة المعاملة</th>
//                 <th className={styles.headerCell}>.....</th>
//             </tr>
//             </thead>
//             <tbody>
//             {props.orders.map((order,index) => (
//                 <tr
//                     key={index}
//                     className={`${styles.bodyRow} ${
//                         index%2 === 0?
//                             styles.evenRow
//                             :
//                             styles.oddRow
//                     }`}
//                 >
//                     <td className={styles.bodyCell}>
//                       <span className={styles.line}>
//                             <Hash size={16} className={styles.icon} />
//                           {order.id}
//                       </span>
//                     </td>
//
//
//                     <td className={styles.bodyCell}>{order.date}</td>
//                     <td className={styles.bodyCell}>{order.amount}</td>
//                     <td className={styles.bodyCell}>{order.paymentMethod}</td>
//
//
//                     <td className={`
//                     ${styles.bodyCell}
//                   `}>
//                         <p className={`
//                             ${styles.status}
//                          ${
//                             order.status === 'قيد التنفيذ'
//                                 ? styles.inProgress
//                                 : order.status === 'ناجحة'
//                                     ? styles.success
//                                     : order.status === 'فاشلة'
//                                         ? styles.failed
//                                         : styles.rejected
//
//                         }
//                         `}>
//                               {order.status}
//                         </p>
//
//
//                     </td>
//                     <td className={styles.bodyCell}>
//
//                         <Link href={order.downloadLink}>
//                             <button>
//                                 {downloadOrderIcon}
//                                 تحميل
//                             </button>
//                         </Link>
//
//                     </td>
//
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     )
// }
// export default TransactionsTable


import styles from "./TransactionsTable.module.css";
import Link from "next/link";
import { downloadOrderIcon } from "@/utils/Icons";
import { Hash } from "lucide-react";
import { useTranslations } from "next-intl";

const TransactionsTable = ({ orders }) => {
    const t = useTranslations("Transactions");

    const getStatusClass = (statusKey) => {
        switch (statusKey) {
            case "pending":
                return styles.inProgress;
            case "completed":
                return styles.success;
            case "failed":
                return styles.failed;
            default:
                return styles.rejected;
        }
    };

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.headerRow}>
                    <th className={styles.headerCell}>{t("table.orderId")}</th>
                    <th className={styles.headerCell}>{t("table.date")}</th>
                    <th className={styles.headerCell}>{t("table.amount")}</th>
                    <th className={styles.headerCell}>{t("table.method")}</th>
                    <th className={styles.headerCell}>{t("table.status")}</th>
                    <th className={styles.headerCell}>{t("table.actions")}</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr
                        key={index}
                        className={`${styles.bodyRow} ${
                            index % 2 === 0 ? styles.evenRow : styles.oddRow
                        }`}
                    >
                        <td className={styles.bodyCell}>
              <span className={styles.line}>
                <Hash size={16} className={styles.icon}/>
                  {order.id}
              </span>
                        </td>
                        <td className={styles.bodyCell}>{order.date}</td>
                        <td className={styles.bodyCell}>{order.amount}</td>
                        <td className={styles.bodyCell}>{order.paymentMethod}</td>
                        <td className={styles.bodyCell}>
                            <p className={`${styles.status} ${getStatusClass(order.statusKey)}`}>
                                {order.statusLabel}
                            </p>
                        </td>
                        <td className={styles.bodyCell}>
                            <Link href={order.downloadLink}>
                                <button>
                                    {downloadOrderIcon}
                                    {t("table.download")}
                                </button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    );
};

export default TransactionsTable;
