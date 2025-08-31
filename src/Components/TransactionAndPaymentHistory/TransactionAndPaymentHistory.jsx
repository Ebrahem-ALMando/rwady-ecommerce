
"use client";
import { useState, useMemo } from "react";
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
import { FiX } from "react-icons/fi";
import DateRangePicker from "@/Components/Orders/DateRangePicker";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";


const TransactionAndPaymentHistory = () => {
    const t = useTranslations("Transactions");
    const locale = useLocale();
    
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

    const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    
    // طلب البيانات مع الفلترة
    const { data, isLoading, error } = useSWR(
        ["transactionList", requestParams], 
        () => getTransaction(requestParams),
        {
            revalidateOnFocus: false,
        }
    );

    // دوال معالجة الفلترة
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير الفلتر
    };

    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSelectedStatus("");
        setDateRange("");
        setCurrentPage(1);
    };

    // التحقق من وجود فلترة مطبقة
    const hasActiveFilters = selectedStatus || dateRange;

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US");
    };

    // حالات الدفع المتاحة
    const paymentStatusOptions = [
        { value: "paid", label: t("status.paid") },
        { value: "unpaid", label: t("status.unpaid") },
        { value: "failed", label: t("status.failed") },
        { value: "pending", label: t("status.pending") },
        { value: "completed", label: t("status.completed") }
    ];

    if (error || data?.error) return <ReloadWithError />;

    const transactions = data?.data || [];

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

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar userData={profileData?.data ?? {}} />
            </div>

            <div className={styles.transactions}>
                <div className={styles.header}>
                    <h3>{t("title")}</h3>
                    </div>
                {/* <Line /> */}
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
                                {paymentStatusOptions.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.dateWrapper}>
                            <label className={styles.inputLabel}>{t("filter.date")}</label>
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
               
                <Line />
                {isLoading ? (
                <div style={{ marginTop: "2rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {[...Array(8)].map((_, idx) => (
                            <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "4px", width: "100%" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "4px", width: "100%" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "4px", width: "100%" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "4px", width: "100%" }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ height: "24px", background: "#e5e7eb", borderRadius: "4px", width: "100%" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                    
                    transactions?.length > 0 ? (
                        <TransactionsTable orders={formatTransactions(transactions)} />
                    ) : (
                       <EmptyState message={t("no_transactions")}/>
                    )
                )}
            </div>
        </div>
    );
};


export default TransactionAndPaymentHistory;
