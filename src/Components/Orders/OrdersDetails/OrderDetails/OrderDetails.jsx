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
import React from "react";
import Line from "@/Components/Shared/Line/Line";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { getOrder } from "@/api/services/getOrder";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import { useLocale } from "next-intl";

const OrderDetails = () => {
    const { orderId } = useParams();
    const locale = useLocale();
    const { data, error, isLoading } = useSWR(orderId ? `order-${orderId}` : null, () => getOrder(orderId));

    if (isLoading) return <Loading />;
    if (error || !data?.data) return <Error message="تعذر تحميل تفاصيل الطلب" />;

    const order = data.data||[];

    const formattedDate = new Date(order.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }) + "، " + new Date(order.created_at).toLocaleTimeString(locale === 'ar' ? 'ar-EG' : 'en-US');

    // const totalPrice = order.order_products.reduce((acc, p) => acc + (p.total || p.price * p.quantity), 0);
    const totalPrice = order.total_amount;

    const paymentAmount = order.total_amount_paid;
    const paymentMethod = order.payment_method || 'غير معروف';
    const address = order.address?.address || "العنوان غير متوفر حاليًا";
    const paymentStatus = order.paid_status?.status || "unpaid";
    const orderStatus = order.status;

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar />
            </div>

            <div className={styles.details}>
                <div className={styles.header}>
                    <Link href="/orders">
                        <h3>الطلبات</h3>
                    </Link>
                    <span>/</span>
                    <h5>تفاصيل الطلب</h5>
                </div>

                <div className={styles.detailsSection}>
                    <div className={styles.detailsInfo}>
                        <div className={styles.box}>
                            <div className={styles.stateBoxHeader}>
                                <span>{PackageDeliveredIcon}</span>
                                تم الطلب في <span>{formattedDate}</span>
                            </div>
                        </div>

                        <div className={styles.box}>
                            <div className={styles.title}>
                                <p>بيانات المنتجات</p>
                            </div>
                            <div>
                                    {order.order_products.map((p) => {
                                            const product = p.product || {};
                                            const title = product.name?.[locale] || "منتج غير معروف";


                                            const image = product.media?.find(m => m.type === "image")?.url || "/images/default-product.png";


                                            const brands = Array.isArray(product.brands)
                                                ? product.brands.map(b => b.name?.[locale] || "ماركة غير معروفة")
                                                : [];

                                            return (
                                                <Card
                                                    key={p.id}
                                                    id={p.product_id}
                                                    image={image}
                                                    title={title}
                                                    brands={brands}
                                                    link={`/orders/${order.id}/product/${p.product_id}`}
                                                />
                                            );
                                        })}

                                    </div>
                        </div>
                    </div>

                    <div className={styles.outherInfo}>
                        <OrderDetailsBox
                            id={order.id}
                            date={order.created_at}
                            status={orderStatus}
                            paymentStatus={paymentStatus}
                            total={totalPrice}
                        />

                        <div className={styles.boxDetails}>
                            <div className={styles.title}>
                                <p>تفاصيل الدفع</p>
                            </div>
                            <Line />
                            <div className={styles.cardDetails}>
                                <div>
                                    <span>{MasterCardIcon}</span>
                                    <span style={{ fontWeight: 400, fontSize: '14px' }}>
                                        {paymentMethod}
                                    </span>
                                </div>
                                <p style={{ color: '#0741AD', fontWeight: '600' }}>{paymentAmount} IQD</p>
                            </div>
                        </div>

                        <div className={styles.boxDetails}>
                            <div className={styles.address}>
                                <h4>عنوان الشحن</h4>
                                <Line />
                                <div className={styles.fullAddress}>
                                    <span>{LocitionIcon}</span>
                                    <p>{address}</p>
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