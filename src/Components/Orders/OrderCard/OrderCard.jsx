"use client";

import styles from "./OrderCard.module.css";
import { useRouter } from "next/navigation";
import { Clock, Hash, CheckCircle, XCircle } from "lucide-react";

import Link from 'next/link';
const OrderCard = ({ id, date, status, isCanceled }) => {
    const router = useRouter();

    const formatArabicDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }) + "، " + d.toLocaleTimeString("ar-EG");
    };

    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <p className={styles.line}>
                    <Hash size={16} className={styles.icon} />
                    رقم الطلب: {id}
                </p>
                <p className={styles.line}>
                    <Clock size={16} className={styles.icon} />
                    بتاريخ: {formatArabicDate(date)}
                </p>
                <p
                    className={`${styles.line} ${styles.status}`}
                    style={{ color: isCanceled ? "#F55157" : "#07AD5D" }}
                >
                    {isCanceled ? <XCircle size={16} className={styles.icon} /> : <CheckCircle size={16} className={styles.icon} />}
                    الحالة: {status}
                </p>
            </div>

            <div className={styles.actions}>
                <Link
                    className={styles.detailsBtn}
                    href={`/orders/${id}`}
                >
                    تفاصيل <span className={styles.arrow}>➤</span>
                </Link>
            </div>
        </div>
    );
};

export default OrderCard;
