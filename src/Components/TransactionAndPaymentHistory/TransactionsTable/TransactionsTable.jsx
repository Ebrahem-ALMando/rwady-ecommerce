import styles from "./TransactionsTable.module.css";
import Link from "next/link";
const TransactionsTable=(props)=> {
    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles.headerRow}>
                <th className={styles.headerCell}>رقم الطلب</th>
                <th className={styles.headerCell}>الــــــــــــــــخدمـــــــــــــــــــة</th>
                <th className={styles.headerCell}>التاريــــــــــــــــــــــــــــــــــــخ</th>
                <th className={styles.headerCell}>مبلغ المعاملة</th>
                <th className={styles.headerCell}>طريقة الدفع</th>
                <th className={styles.headerCell}>حالة المعاملة</th>
                <th className={styles.headerCell}>.....</th>
            </tr>
            </thead>
            <tbody>
            {props.orders.map((order,index) => (
                <tr
                    key={index}
                    className={`${styles.bodyRow} ${
                        index%2 === 0?
                            styles.evenRow
                            :
                            styles.oddRow
                    }`}
                >
                    <td className={styles.bodyCell}>{order.id}</td>
                    <td className={styles.bodyCell} title={order.service}>
                        {order.service.length > 19 ? `${order.service.slice(0, 19)}...` : order.service}
                    </td>

                    <td className={styles.bodyCell}>{order.date}</td>
                    <td className={styles.bodyCell}>{order.amount}</td>
                    <td className={styles.bodyCell}>{order.paymentMethod}</td>


                    <td className={`
                    ${styles.bodyCell}
                  `}>
                        <p className={`
                            ${styles.status}
                         ${
                            order.status === 'قيد التنفيذ'
                                ? styles.inProgress
                                : order.status === 'ناجحة'
                                    ? styles.success
                                    : order.status === 'فاشلة'
                                        ? styles.failed
                                        : styles.rejected

                        }
                        `}>
                              {order.status}
                        </p>


                    </td>
                    <td className={styles.bodyCell}>


                        <Link href={order.downloadLink}>
                            <button>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.6665 9.16634L9.99981 12.4997M9.99981 12.4997L13.3332 9.16634M9.99981 12.4997L9.99981 0.833008"
                                        stroke="#417AC8" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <path
                                        d="M15.2046 6.66699C16.1196 7.80832 16.6668 9.25708 16.6668 10.8337C16.6668 14.5156 13.6821 17.5003 10.0002 17.5003C6.31826 17.5003 3.3335 14.5156 3.3335 10.8337C3.3335 9.25708 3.88076 7.80832 4.79568 6.66699"
                                        stroke="#417AC8" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>

                                تحميل
                            </button>
                        </Link>

                    </td>

                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default TransactionsTable