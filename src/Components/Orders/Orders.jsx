// "use client";
//
// import styles from './Orders.module.css';
//
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Line from "@/Components/Shared/Line/Line";
// import useSWR from "swr";
// import { getOrders } from "@/api/services/listOrders";
// import React, {useEffect, useState} from "react";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
// import OrderCard from "@/Components/Orders/OrderCard/OrderCard";
// import {getTokenWithClient} from "@/utils/getTokenWithClient";
// import {useRouter} from "next/navigation";
//
// const Orders = (props) => {
//
//     const { data, isLoading, error, mutate } = useSWR("orderList", getOrders);
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
//         const date = new Date(dateStr);
//         return date.toLocaleDateString("en-CA");
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
//     const filteredOrders = data?.data?.filter(order => {
//         const matchesDate = selectedDate ? formatDate(order.orderdate) === selectedDate : true;
//         const matchesStatus = selectedStatus ? order.statuslabel === selectedStatus : true;
//         return matchesDate && matchesStatus;
//     });
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <ProfileSidebar />
//             </div>
//
//             <div className={styles.orders}>
//                 {isLoading ? (
//                     <Loading />
//                 ) : (
//                     <>
//                         <div className={styles.header}>
//                             <h3>الطلبات</h3>
//                             <div className={styles.filterSection}>
//
//                                 <div className={styles.selectWrapper}>
//                                     <select
//                                         name="orderStatus"
//                                         className={styles.selectInput}
//                                         value={selectedStatus}
//                                         onChange={handleStatusChange}
//                                     >
//                                         <option value="">كل الحالات</option>
//                                         {[...new Set(data?.data?.map(order => order.statuslabel))].map(status => (
//                                             <option key={status} value={status}>
//                                                 {status}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//
//
//                                 <div className={styles.selectWrapper}>
//                                     <select
//                                         name="orderDate"
//                                         className={styles.selectInput}
//                                         value={selectedDate}
//                                         onChange={handleDateChange}
//                                     >
//                                         <option value="">كل التواريخ</option>
//                                         {[...new Set(
//                                             data?.data?.map(order => formatDate(order.orderdate))
//                                         )].map(dateStr => (
//                                             <option key={dateStr} value={dateStr}>
//                                                 {new Date(dateStr).toLocaleDateString("ar-EG", {
//                                                     year: 'numeric',
//                                                     month: 'long',
//                                                     day: 'numeric',
//                                                     weekday: 'long'
//                                                 })}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <Line />
//
//
//                         {filteredOrders?.length > 0 ? (
//                             filteredOrders.map(order => (
//                                 <OrderCard
//                                     key={order.id}
//                                     id={order.id}
//                                     date={order.orderdate}
//                                     status={order.statuslabel}
//                                     isCanceled={order.statuslabel === "تم الإلغاء"}
//                                 />
//                             ))
//                         ) : (
//                             <p style={{ textAlign: "center", marginTop: "2rem" }}>لا توجد طلبات مطابقة للفلاتر</p>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Orders;


"use client";

import styles from './Orders.module.css';

import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import useSWR from "swr";
import { getOrders } from "@/api/services/listOrders";
import React, { useState } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import OrderCard from "@/Components/Orders/OrderCard/OrderCard";
import {useLocale, useTranslations} from "next-intl";
import { getProfile } from "@/api/services/auth/getProfile";
import OrdersSkeleton from "@/Components/Orders/OrderSkeleton/OrderSkeleton";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

const Orders = () => {
    const { data, isLoading, error, mutate } = useSWR("orderList", getOrders);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const t = useTranslations("Orders");

    const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-CA");
    };

    if (error || data?.error) {
        return <ReloadWithError />;
    }

    const orders = data?.data || [];


    const filteredOrders = orders?.filter(order => {
        const orderDate = formatDate(order.created_at);
        const statusLabel = order?.status;

        const matchesDate = selectedDate ? orderDate === selectedDate : true;
        const matchesStatus = selectedStatus ? statusLabel === selectedStatus : true;

        return matchesDate && matchesStatus;
    });

    const statusOptions = [...new Set(orders.map(order => order.status))];
    const getPaymentStatus = (order) => {

        if (typeof order?.paid_status === "string") {
            return order.paid_status;
        }

        if (typeof order?.paid_status === "object" && order.paid_status?.status) {
            return order.paid_status.status;
        }

        const paidInStatuses = order?.statuses?.find(s => s.status === "paid");
        return paidInStatuses ? "paid" : "unpaid";
    };

    const locale = useLocale();

    return (
        <div className={styles.container}>
            {isLoading||isLoadingProf ? (
                <OrdersSkeleton />
            ) : (
                <>
                    <div className={styles.sidebar}>
                        <ProfileSidebar userData={profileData?.data ?? {}} />
                    </div>

                    <div className={styles.orders}>
                        <div className={styles.header}>
                            <h3>{t("title")}</h3>
                            <div className={styles.filterSection}>

                                <div className={styles.selectWrapper}>
                                    <select
                                        name="orderStatus"
                                        className={styles.selectInput}
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="">{t("all_statuses")}</option>
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {t(`statuses.${status}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.selectWrapper}>
                                    <select
                                        name="orderDate"
                                        className={styles.selectInput}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                    >
                                        <option value="">{t("all_dates")}</option>
                                        {[...new Set(orders.map(order => formatDate(order.created_at)))].map(dateStr => (
                                            <option key={dateStr} value={dateStr}>
                                                {new Date(dateStr).toLocaleDateString(
                                                    locale === "ar" ? "ar-EG" : "en-US",
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        weekday: 'long'
                                                    }
                                                )}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <Line />

                        {filteredOrders?.length > 0 ? (
                            filteredOrders.map(order => {
                                const paymentStatus = getPaymentStatus(order);
                                return (
                                    <OrderCard
                                        key={order.id}
                                        id={order.id}
                                        date={order.created_at}
                                        status={order.status}
                                        paymentStatus={paymentStatus}
                                        isCanceled={order.status === "cancelled"}
                                        locale={locale}
                                    />
                                );
                            })
                        ) : (
                            <EmptyState message={t("no_orders")}/>

                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Orders;
