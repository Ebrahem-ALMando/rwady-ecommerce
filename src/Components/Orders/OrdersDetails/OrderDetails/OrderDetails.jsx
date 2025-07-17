// "use client";
//
// import styles from './OrderDetails.module.css';
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Link from "next/link";
// import {
//     LocitionIcon,
//     MasterCardIcon,
//     PackageDeliveredIcon,
// } from "@/utils/Icons";
// import Card from "@/Components/Orders/Card/Card";
// import OrderDetailsBox from "@/Components/Orders/OrdersDetails/OrderDetails/OrderDetailsBox/OrderDetailsBox";
// import React from "react";
// import Line from "@/Components/Shared/Line/Line";
// import useSWR from "swr";
// import { useParams } from "next/navigation";
// import { getOrder } from "@/api/services/getOrder";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
//
// const OrderDetails = () => {
//     const { orderId } = useParams();
//     const { data, error, isLoading } = useSWR(orderId ? `order-${orderId}` : null, () => getOrder(orderId));
//
//     if (isLoading) return <Loading />;
//     if (error || !data) return <Error message="تعذر تحميل تفاصيل الطلب" />;
//
//     const formattedDate = new Date(data.orderdate).toLocaleDateString("ar-EG", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//     }) + "، " + new Date(data.orderdate).toLocaleTimeString("ar-EG");
//
//     const totalPrice = data.products.reduce((acc, p) => acc + (p.total || 0), 0);
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <ProfileSidebar />
//             </div>
//
//             <div className={styles.details}>
//                 <div className={styles.header}>
//                     <Link href="/orders">
//                         <h3>الطلبات</h3>
//                     </Link>
//                     <span>/</span>
//                     <h5>تفاصيل الطلب</h5>
//                 </div>
//
//                 <div className={styles.detailsSection}>
//                     <div className={styles.detailsInfo}>
//
//                         <div className={styles.box}>
//                             <div className={styles.stateBoxHeader}>
//                                 <span>{PackageDeliveredIcon}</span>
//                                 تم الطلب
//                                 في
//                                 <span>{formattedDate}</span>
//                             </div>
//                         </div>
//
//
//                         <div className={styles.box}>
//                             <div className={styles.title}>
//                                 <p>بيانات المنتج</p>
//                             </div>
//                             <div>
//                                 {data.products.map((p, i) => (
//                                     <Card
//                                         key={p.product.id}
//                                         id={p.product.id}
//                                         image={p.product.main_img}
//                                         title={p.product.name}
//                                         brand={`ماركة ${p.product.brand?.name || "غير معروفة"}`}
//                                         link={`/orders/${data.id}/product/${p.product.id}`}
//                                     />
//
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className={styles.outherInfo}>
//
//                         <OrderDetailsBox
//                             id={data.id}
//                             date={data.orderdate}
//                             status={data.statuslabel}
//                             total={totalPrice}
//                         />
//
//
//                         <div className={styles.boxDetails}>
//                             <div className={styles.title}>
//                                 <p>تفاصيل الدفع</p>
//                             </div>
//                             <Line/>
//
//                         <div className={styles.cardDetails}>
//                             <div>
//                                 <span>{MasterCardIcon}</span>
//                                 <span style={{fontWeight: 400, fontSize: '14px'}}>
//                                         xxxx 221 2698 2366 {data.payment_method?.name || "غير معروف"}
//                                     </span>
//                             </div>
//                             <p style={{color: '#0741AD', fontWeight: '600'}}>{totalPrice} IQD</p>
//                         </div>
//
//                     </div>
//
//
//                     <div className={styles.boxDetails}>
//                         <div className={styles.address}>
//                             <h4>عنوان الشحن</h4>
//                             <Line/>
//                             <div className={styles.fullAddress}>
//                                 <span>{LocitionIcon}</span>
//                                 <p>{data.address || "العنوان غير متوفر حاليًا"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
// </div>
// )
//     ;
// };
//
// export default OrderDetails;


"use client";

import styles from './OrderDetails.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Link from "next/link";
import {
    LocitionIcon,
    MasterCardIcon,
    PackageDeliveredIcon,
} from "@/utils/Icons";
import Card from "@/Components/Orders/Card/Card";
import OrderDetailsBox from "@/Components/Orders/OrdersDetails/OrderDetails/OrderDetailsBox/OrderDetailsBox";
import React, {useState} from "react";
import Line from "@/Components/Shared/Line/Line";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { getOrder } from "@/api/services/getOrder";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import {useLocale, useTranslations} from "next-intl";

import {toast} from "react-hot-toast";
import {confirmOtp} from "@/api/services/orders/confirmOtp";
import OtpInput from "@/Components/Orders/OrdersDetails/OrderDetails/OtpInput/OtpInput";
import {getProfile} from "@/api/services/auth/getProfile";


const OrderDetails = () => {
    const { orderId } = useParams();
    const locale = useLocale();
    const { data, error, isLoading, mutate } = useSWR(orderId ? `order-${orderId}` : null, () => getOrder(orderId));
    const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [otpError, setOtpError] = useState(null);
    const t = useTranslations("Orders");

    if (isLoading) return <Loading />;
    if  (error || !data?.data) return <Error message={t("error_loading")} />;

    const order = data.data || {};

    const formattedDate =
        new Date(order.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }) +
        "، " +
        new Date(order.created_at).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US");

    // const totalPrice = order.order_products.reduce((acc, p) => acc + (p.total || p.price * p.quantity), 0);


    const totalPrice = order.total_amount;
    const paymentAmount = order.total_amount_paid;
    const paymentMethod = order.payment_method || 'غير معروف';
    const address = order.address?.address || "العنوان غير متوفر حاليًا";
    const paymentStatus = order.paid_status?.status || "unpaid";
    const orderStatus = order.status;
    const shouldShowOtpInput = order.payment_method === "installment" &&
        order.metadata?.validate_plan &&
        !order.metadata?.verify_otp &&
        !order.metadata?.otp_verified;

    const handleVerifyOtp = async () => {
        setVerifying(true);
        setOtpError(null);
        try {
            const result = await confirmOtp(order.id, otp);
            if (result.error) {
                setOtpError(result.message || t("otp.failed"));
            } else {
                toast.success(t("otp.success"));
                mutate();
            }
        } catch (e) {
            setOtpError(t("otp.error"));
        } finally {
            setVerifying(false);
        }
    };
    const addressText =
        order?.address
            ? `${order.address.address || ""}، ${order.address.state || ""}، ${order.address.exstra_address || ""}`.trim().replace(/^،|،$/g, "") || t("details.noAddress")
            : t("details.noAddress");
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar userData={profileData?.data ?? {}} />
            </div>

            <div className={styles.details}>
                <div className={styles.header}>
                    <Link href={`/${locale}/orders`}>
                        <h3>{t("title")}</h3>
                    </Link>
                    <span>/</span>
                    <h5>{t("details.title")}</h5>
                </div>

                <div className={styles.detailsSection}>
                    <div className={styles.detailsInfo}>
                        <div className={styles.box}>
                            <div className={styles.stateBoxHeader}>
                                <span>{PackageDeliveredIcon}</span>
                                {t("order_date")} <span>{formattedDate}</span>
                            </div>
                        </div>

                        <div className={styles.box}>
                            <div className={styles.title}>
                                <p>{t("details.products")}</p>
                            </div>
                            <div>
                                {order.order_products.map((p) => {
                                    const product = p.product || {};
                                    const title = product.name?.[locale] || t("unknown_product");
                                    const image =
                                        product.media?.find((m) => m.type === "image")?.url ||
                                        "/images/default-product.png";
                                    const brands = Array.isArray(product.brands)
                                        ? product.brands.map((b) => b.name?.[locale] || t("unknown_brand"))
                                        : [];

                                    return (
                                        <Card
                                            key={p.id}
                                            id={p.product_id}
                                            image={image}
                                            title={title}
                                            brands={brands}
                                            link={`/orders/${order.id}/product/${p.product_id}`}
                                            t={t}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    <div className={styles.outherInfo}>

                        <OrderDetailsBox
                            id={order?.id}
                            code={order?.code}
                            createdAt={order?.created_at}
                            status={order?.status}
                            paidStatus={order?.paid_status?.status}
                            paymentMethod={order?.payment_method}
                            paymentFees={order?.payment_fees}
                            totalAmount={order?.total_amount}
                            totalAmountPaid={order?.total_amount_paid}
                            notes={order?.notes}
                            paymentSessionId={order?.payment_session_id}
                            otpVerified={order?.metadata?.otp_verified}
                            validatePlanMessage={order?.metadata?.validate_plan?.data?.message}
                            address={order?.address}
                            products={order?.order_products}
                            t={t}
                        />
                        {shouldShowOtpInput && (
                            <OtpInput
                                otp={otp}
                                setOtp={setOtp}
                                verifying={verifying}
                                handleVerifyOtp={handleVerifyOtp}
                                otpError={otpError}
                                t={t}
                            />
                        )}
                        <div className={styles.boxDetails}>
                            <div className={styles.title}>
                                <p>{t("details.paymentMethod")}</p>
                            </div>
                            <Line/>
                            <div className={styles.cardDetails}>
                                <div>
                                    <span>{MasterCardIcon}</span>
                                    <span style={{fontWeight: 400, fontSize: "14px"}}>
                                    {t(`paymentMethods.${order?.payment_method}`) || order?.payment_method}
                                  </span>
                                </div>
                                <p style={{color: "#0741AD", fontWeight: "600"}}>
                                    {order?.total_amount_paid} IQD
                                </p>
                            </div>
                        </div>


                        <div className={styles.boxDetails}>
                            <div className={styles.address}>
                                <h4>{t("details.shippingAddress")}</h4>
                                <Line/>
                                <div className={styles.fullAddress}>
                                    <span>{LocitionIcon}</span>
                                    <p>{addressText}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;