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
import React, { useState, useMemo } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import OrderCard from "@/Components/Orders/OrderCard/OrderCard";
import {useLocale, useTranslations} from "next-intl";
import { getProfile } from "@/api/services/auth/getProfile";
import OrdersSkeleton from "@/Components/Orders/OrderSkeleton/OrderSkeleton";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import Pagination from "@/Components/Shared/Pagination/Pagination";
import { FiX } from "react-icons/fi";
import DateRangePicker from "./DateRangePicker/DateRangePicker";

const Orders = () => {
    const t = useTranslations("Orders");
    // حالات الفلترة
    const [selectedStatus, setSelectedStatus] = useState("");
    const [dateRange, setDateRange] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(20);
    
    // بناء معاملات الطلب
    const requestParams = useMemo(() => {
        const params = {
            current_page: currentPage,
            per_page: perPage
        };
        
        if (selectedStatus) {
            params.status = selectedStatus;
        }
        
        if (dateRange) {
            const [startDate, endDate] = dateRange.split(' to ');
            if (startDate) {
                params.start_date = startDate;
            }
            if (endDate) {
                params.end_date = endDate;
            }
        }
        
        return params;
    }, [selectedStatus, dateRange, currentPage, perPage]);
    
    // طلب البيانات مع الفلترة
    const { data, isLoading, error, mutate } = useSWR(
        ["orderList", requestParams], 
        () => getOrders(requestParams)
    );

    const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });

    // دوال معالجة الفلترة
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفلتر
    };

    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleResetFilters = () => {
        setSelectedStatus("");
        setDateRange("");
        setCurrentPage(1);
    };

    // التحقق من وجود فلترة مطبقة
    const hasActiveFilters = selectedStatus || dateRange;

    // حالات الطلبات المتاحة
    const statusOptions = [
        { value: "pending", label: t("statusesType.pending") },
        { value: "in_progress", label: t("statusesType.in_progress") },
        { value: "shipping", label: t("statusesType.shipping") },
        { value: "completed", label: t("statusesType.completed") },
        { value: "cancelled", label: t("statusesType.cancelled") }
    ];

    if (error || data?.error) {
        return <ReloadWithError />;
    }

    const orders = data?.data || [];
    const paginationData = data?.pagination || data?.meta || {};
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
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.dateWrapper}>
                                    <DateRangePicker
                                        value={dateRange}
                                        onChange={handleDateRangeChange}
                                        placeholder={t("date_range_placeholder")}
                                        locale={locale}
                                    />
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        className={styles.resetButton}
                                        onClick={handleResetFilters}
                                        title={t("reset_filters")}
                                    >
                                        <FiX className={styles.resetIcon} />
                                        <span>{t("reset_filters")}</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <Line />

                        {orders?.length > 0 ? (
                            <>
                                {orders.map(order => {
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
                                })}
                                
                                {/* الباغنيشن */}
                                {/* {paginationData.last_page > 1 && (
                                    <Pagination
                                        currentPage={parseInt(paginationData.current_page) || 1}
                                        lastPage={parseInt(paginationData.last_page) || 1}
                                        perPage={parseInt(paginationData.per_page) || perPage}
                                        total={parseInt(paginationData.total) || 0}
                                        onPageChange={handlePageChange}
                                        className={styles.pagination}
                                        showInfo={true}
                                        loadingPage={isLoading}
                                    />
                                )} */}
                            </>
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
