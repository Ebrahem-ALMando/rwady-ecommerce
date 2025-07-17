// 'use client'
//
// import React, { useState } from "react";
// import useSWR from "swr";
// import { getOrders } from "@/api/services/listOrders";
//
// import TransactionsTable from "@/Components/TransactionAndPaymentHistory/TransactionsTable/TransactionsTable";
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Line from "@/Components/Shared/Line/Line";
// import Error from "@/Components/Shared/Error/Error";
// import styles from "./TransactionAndPaymentHistory.module.css";
// import {getTransaction} from "@/api/services/transaction/getTransaction";
//
// const TransactionAndPaymentHistory = () => {
//     const { data, isLoading, error, mutate } = useSWR("transactionList", getTransaction);
//     const [selectedDate, setSelectedDate] = useState("");
//     const [selectedStatus, setSelectedStatus] = useState("");
//
//     const handleDateChange = (e) => {
//         setSelectedDate(e.target.value);
//     };
//
//     const handleStatusChange = (e) => {
//         setSelectedStatus(e.target.value);
//     };
//
//     const formatDate = (dateStr) => {
//         if (!dateStr) return "—";
//         const date = new Date(dateStr);
//         return date.toLocaleDateString("en-CA");
//     };
//
//     const filteredOrders = (data?.data || []).filter(order => {
//         const matchesDate = selectedDate ? formatDate(order.orderdate) === selectedDate : true;
//         const matchesStatus = selectedStatus ? order.statuslabel === selectedStatus : true;
//         return matchesDate && matchesStatus;
//     });
//
//     const formatOrders = (orders) => {
//         return orders.map(order => ({
//             id: order.id,
//             date: formatDate(order.orderdate),
//             amount: "—",
//             paymentMethod: order.payment_method?.name ?? "غير معروف",
//             status:
//                 order.payment_status === 0 ? "قيد التنفيذ"
//                     : order.payment_status === 1 ? "ناجحة"
//                         : order.payment_status === 2 ? "فاشلة"
//                             : "مرفوضة",
//             downloadLink: `/orders/${order.id}`
//         }));
//     };
//
//     if (error) {
//         return (
//             <Error
//                 onRetry={() => {
//                     mutate(undefined, { revalidate: true });
//                 }}
//             />
//         );
//     }
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <ProfileSidebar />
//             </div>
//             <div className={styles.transactions}>
//                 <div className={styles.header}>
//                     <h3>الحركة المالية / الدفعات</h3>
//                 </div>
//                 <Line />
//                 <div className={styles.filterSection}>
//                     <div className={styles.selectWrapper}>
//                         <label className={styles.inputLabel}>حالة الطلب</label>
//                         <select
//                             name="orderStatus"
//                             className={styles.selectInput}
//                             value={selectedStatus}
//                             onChange={handleStatusChange}
//                         >
//                             <option value="">كل الحالات</option>
//                             {[...new Set(data?.data?.map(order => order.statuslabel))]
//                                 .filter(Boolean)
//                                 .map(status => (
//                                     <option key={status} value={status}>
//                                         {status}
//                                     </option>
//                                 ))}
//                         </select>
//                     </div>
//                     <div className={styles.selectWrapper}>
//                         <label className={styles.inputLabel}>الفترة</label>
//                         <select
//                             name="orderDate"
//                             className={styles.selectInput}
//                             value={selectedDate}
//                             onChange={handleDateChange}
//                         >
//                             <option value="">كل التواريخ</option>
//                             {[...new Set(data?.data?.map(order => formatDate(order.orderdate)))]
//                                 .filter(Boolean)
//                                 .map(dateStr => (
//                                     <option key={dateStr} value={dateStr}>
//                                         {new Date(dateStr).toLocaleDateString("ar-EG", {
//                                             year: 'numeric',
//                                             month: 'long',
//                                             day: 'numeric',
//                                             weekday: 'long'
//                                         })}
//                                     </option>
//                                 ))}
//                         </select>
//                     </div>
//                 </div>
//
//                 {isLoading ? (
//                     <div>جاري التحميل...</div>
//                 ) : (
//                     <TransactionsTable orders={formatOrders(filteredOrders)} />
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default TransactionAndPaymentHistory;
"use client";
import { useState } from "react";
import useSWR from "swr";
import { useTranslations, useLocale } from "next-intl";
import TransactionsTable from "@/Components/TransactionAndPaymentHistory/TransactionsTable/TransactionsTable";
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import styles from "./TransactionAndPaymentHistory.module.css";
import {getTransaction} from "@/api/services/transaction/getTransaction";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import {getProfile} from "@/api/services/auth/getProfile";
import Loading from "@/Components/Shared/Loading/Loading";


const TransactionAndPaymentHistory = () => {
    const t = useTranslations("Transactions");
    const locale = useLocale();
    const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    const { data, isLoading, error } = useSWR("transactionList", getTransaction, {
        revalidateOnFocus: false,
    });
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US");
    };


    const filteredTransactions = (data?.data || []).filter((transaction) => {
        const matchesDate = selectedDate ? formatDate(transaction.created_at) === selectedDate : true;
        const matchesStatus = selectedStatus ? transaction.status === selectedStatus : true;
        return matchesDate && matchesStatus;
    });


    const formatTransactions = (transactions) =>
        transactions.map((item) => ({
            id: item.id,
            date: formatDate(item.created_at),
            amount: item.amount ? `${item.amount} IQD` : "—",
            paymentMethod: item.method ?? t("unknownMethod"),
            statusKey: item.status,
            statusLabel: t(`status.${item.status}`),
            downloadLink: `/${locale}/orders/${item.order_id}`,
        }));


    if (error) return <ReloadWithError />;


    // const uniqueStatuses = [...new Set(data?.data?.map((item) => item.status))].filter(Boolean);
    const uniqueStatuses = [];


    // const uniqueDates = [...new Set(data?.data?.map((item) => formatDate(item.created_at)))].filter(Boolean);
    const uniqueDates = []

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar userData={profileData?.data ?? {}} />
            </div>

            <div className={styles.transactions}>
                <div className={styles.header}>
                    <h3>{t("title")}</h3>
                </div>
                <Line />
                <div className={styles.filterSection}>
                    <div className={styles.selectWrapper}>
                        <label className={styles.inputLabel}>{t("filter.status")}</label>
                        <select
                            name="transactionStatus"
                            className={styles.selectInput}
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="">{t("filter.allStatuses")}</option>
                            {uniqueStatuses.map((status) => (
                                <option key={status} value={status}>
                                    {status === "pending"
                                        ? t("status.pending")
                                        : status === "completed"
                                            ? t("status.completed")
                                            : status === "failed"
                                                ? t("status.failed")
                                                : status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.selectWrapper}>
                        <label className={styles.inputLabel}>{t("filter.date")}</label>
                        <select
                            name="transactionDate"
                            className={styles.selectInput}
                            value={selectedDate}
                            onChange={handleDateChange}
                        >
                            <option value="">{t("filter.allDates")}</option>
                            {uniqueDates.map((dateStr) => (
                                <option key={dateStr} value={dateStr}>
                                    {new Date(dateStr).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        weekday: "long",
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <Loading/>
                ) : (
                    <TransactionsTable orders={formatTransactions(filteredTransactions)} />
                )}
            </div>
        </div>
    );
};


export default TransactionAndPaymentHistory;
