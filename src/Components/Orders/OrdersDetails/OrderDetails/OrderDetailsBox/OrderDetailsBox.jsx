// import styles from "./OrderDetailsBox.module.css";
// import { Clock, Hash, BadgeCheck,DollarSign } from "lucide-react";
//
// const OrderDetailsBox = ({ id, date, status, total }) => {
//     const formattedDate = new Date(date).toLocaleDateString("ar-EG", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     }) + "، " + new Date(date).toLocaleTimeString("ar-EG");
//
//     return (
//         <div className={styles.box}>
//             <h4 className={styles.title}>تفاصيل الطلب</h4>
//             <div className={styles.row}>
//                 <Hash size={16}/> <span>رقم الطلب:</span> <strong>{id}</strong>
//             </div>
//             <div className={styles.row}>
//                 <Clock size={16}/> <span>التاريخ:</span> <strong>{formattedDate}</strong>
//             </div>
//             <div className={styles.row}>
//                 <BadgeCheck size={16}/> <span>الحالة:</span> <strong
//                 style={{color: status === "تم الإلغاء" ? "#F55157" : "#07AD5D"}}>{status}</strong>
//             </div>
//             <div className={styles.row}>
//                 <DollarSign size={16} className={styles.icon}/>
//                 <span>القيمة:</span>
//                 <strong>{total} IQD</strong>
//             </div>
//
//         </div>
//     );
// };
//
// export default OrderDetailsBox;
import styles from "./OrderDetailsBox.module.css";
import {
    Clock,
    Hash,
    BadgeCheck,
    DollarSign,
    MapPin,
    CreditCard,
    CheckCircle,
    AlertCircle,
    FileText,
    Package,
    ClipboardList
} from "lucide-react";

const OrderDetailsBox = ({
                             id,
                             code,
                             createdAt,
                             status,
                             paidStatus,
                             paymentMethod,
                             paymentFees,
                             totalAmount,
                             totalAmountPaid,
                             notes,
                             paymentSessionId,
                             otpVerified,
                             validatePlanMessage,
                             address,
                             products,
                             t
                         }) => {
    const locale = t.locale || "ar"; // assuming t.locale or fallback
    const formattedDate = new Date(createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }) + "، " + new Date(createdAt).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US");

    // Helper to map status color (you can customize)
    const statusColor = status === "تم الإلغاء" || paidStatus === "failed" ? "#F55157" : "#07AD5D";

    return (
        <div className={styles.box}>
            <h4 className={styles.title}>{t("details.title") || "تفاصيل الطلب"}</h4>

            <div className={styles.row}>
                <Hash size={16} /> <span>{t("details.orderId") || "رقم الطلب:"}</span> <strong>{id}</strong>
            </div>

            <div className={styles.row}>
                <ClipboardList size={16} /> <span>{t("details.orderCode") || "كود الطلب:"}</span> <strong>{code}</strong>
            </div>

            {/*<div className={styles.row}>*/}
            {/*    <Clock size={16} /> <span>{t("details.date") || "التاريخ:"}</span> <strong>{formattedDate}</strong>*/}
            {/*</div>*/}

            <div className={styles.row}>
                <Package size={16} /> <span>{t("details.status") || "حالة الطلب:"}</span>
                <strong style={{ color: statusColor }}>{t(`statuses.${status}`) || status}</strong>
            </div>

            <div className={styles.row}>
                <BadgeCheck size={16} /> <span>{t("details.paymentStatus") || "حالة الدفع:"}</span>
                <strong style={{ color: paidStatus === "paid" ? "#07AD5D" : "#F55157" }}>
                    {paidStatus ? t(`paymentStatuses.${paidStatus}`) : t("paymentStatuses.unpaid") || "غير مدفوع"}
                </strong>
            </div>

            {/*<div className={styles.row}>*/}
            {/*    <CreditCard size={16} /> <span>{t("details.paymentMethod") || "طريقة الدفع:"}</span> <strong>{t(`paymentMethods.${paymentMethod}`) || paymentMethod || "غير معروف"}</strong>*/}
            {/*</div>*/}

            <div className={styles.row}>
                <DollarSign size={16} /> <span>{t("details.paymentFees") || "رسوم الدفع:"}</span> <strong>{paymentFees ?? "..."} IQD</strong>
            </div>

            <div className={styles.row}>
                <DollarSign size={16} /> <span>{t("details.totalAmount") || "المبلغ الكلي:"}</span> <strong>{totalAmount ?? "..."} IQD</strong>
            </div>

            <div className={styles.row}>
                <DollarSign size={16} /> <span>{t("details.totalPaid") || "المبلغ المدفوع:"}</span> <strong>{totalAmountPaid ?? "..."} IQD</strong>
            </div>

            {notes && (
                <div className={styles.row}>
                    <FileText size={16} /> <span>{t("details.notes") || "ملاحظات:"}</span> <strong>{notes}</strong>
                </div>
            )}

            {/*{paymentSessionId && (*/}
            {/*    <div className={styles.row}>*/}
            {/*        <AlertCircle size={16} /> <span>{t("details.paymentSessionId") || "رمز جلسة الدفع:"}</span> <strong>{paymentSessionId}</strong>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{otpVerified !== undefined && (*/}
            {/*    <div className={styles.row}>*/}
            {/*        <CheckCircle size={16} /> <span>{t("details.otpStatus") || "حالة التحقق (OTP):"}</span>*/}
            {/*        <strong>{otpVerified ? (t("details.otpVerified") || "تم التحقق") : (t("details.otpPending") || "بانتظار التحقق")}</strong>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{validatePlanMessage && (*/}
            {/*    <div className={styles.row}>*/}
            {/*        <AlertCircle size={16} /> <span>{t("details.validatePlanMessage") || "ملاحظات خطة الدفع:"}</span>*/}
            {/*        <strong>{validatePlanMessage}</strong>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{address && (*/}
            {/*    <>*/}
            {/*        <h4 className={styles.title}>{t("details.shippingAddress") || "عنوان الشحن"}</h4>*/}
            {/*        <div className={styles.row}>*/}
            {/*            <MapPin size={16} />*/}
            {/*            <span>{address.address}, {address.city}, {address.state}, {address.country}</span>*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*)}*/}

            {/*{products && products.length > 0 && (*/}
            {/*    <>*/}
            {/*        <h4 className={styles.title}>{t("details.products") || "المنتجات"}</h4>*/}
            {/*        <ul className={styles.productList}>*/}
            {/*            {products.map((p) => {*/}
            {/*                const name = p.product?.name?.[locale] || p.product?.name?.en || "منتج غير معروف";*/}
            {/*                const quantity = p.quantity || 1;*/}
            {/*                const price = p.price || 0;*/}
            {/*                return (*/}
            {/*                    <li key={p.id} className={styles.productItem}>*/}
            {/*                        <strong>{name}</strong> — {t("details.quantity") || "الكمية"}: {quantity} — {t("details.price") || "السعر"}: {price} IQD*/}
            {/*                    </li>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </ul>*/}
            {/*    </>*/}
            {/*)}*/}
        </div>
    );
};

export default OrderDetailsBox;
