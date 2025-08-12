// "use client";
//
// import styles from './productOrderDetails.module.css';
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Line from "@/Components/Shared/Line/Line";
// import Card from "@/Components/Orders/Card/Card";
// import Link from "next/link";
// import {
//     LeftArrowIcon,
//     LocationUserIcon,
//     LocitionIcon,
//     PackageDeliveredIcon,
//     PackageIcon,
//     ShippingTruckIcon
// } from "@/utils/Icons";
// import RateBox from "@/Components/Orders/OrdersDetails/productOrderDetails/RateBox/RateBox";
// import useSWR from "swr";
// import { useParams } from "next/navigation";
// import { getOrder } from "@/api/services/getOrder";
// import {Hash,Package,MapPin } from "lucide-react";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
// import React from "react";
//
// const ProductOrderDetails = () => {
//     const { orderId, productId } = useParams();
//     const { data: order, error, isLoading } = useSWR(orderId ? `order-${orderId}` : null, () => getOrder(orderId));
//
//     if (!order || !order.products||isLoading) return <Loading/>;
//
//     if (error || !order) return <Error message="تعذر تحميل تفاصيل الطلب" />;
//
//     const productEntry = order.products.find(p => p.product.id === parseInt(productId));
//     const product = productEntry?.product;
//
//     if (!product) return <p style={{ textAlign: "center" }}>لم يتم العثور على المنتج ضمن هذا الطلب</p>;
//
//     const formattedDate = new Date(order.orderdate).toLocaleDateString("ar-EG", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//     }) + "، " + new Date(order.orderdate).toLocaleTimeString("ar-EG");
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <ProfileSidebar />
//             </div>
//             <div className={styles.details}>
//                 <div className={styles.header}>
//                     <Link href={'/orders'}>
//                         <h3>الطلبات</h3>
//                     </Link>
//                     <span>/</span>
//                     <h5>تفاصيل المنتج</h5>
//                 </div>
//
//                 <div className={styles.detailsSection}>
//                     <div className={styles.detailsInfo}>
//
//                         <div className={styles.box}>
//                             <div className={styles.stateBoxHeader}>
//                                 <span className={styles.iconGreen}>{PackageDeliveredIcon}</span>
//                                 <span className={styles.successText}>{order.statuslabel}</span>
//                                 <span className={styles.dateText}>{formattedDate}</span>
//                             </div>
//                             <Line />
//                             <div className={styles.contact}>
//                                 <p>هل لديك مشكلة مع هذا المنتج؟</p>
//                                 <button className={styles.contactBtn}>تواصل معنا</button>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.rateTitle}>
//                                 <p>شاركنا تجربتك</p>
//                             </div>
//                             <div className={styles.items}>
//                                 <RateBox icon={ShippingTruckIcon} text={"اكتب رأيك في الشحن"} buttonText={"قيم التوصيل"} />
//                                 <RateBox icon={PackageIcon} text={"اكتب رأيك في المنتج"} buttonText={"قيم المنتج"} />
//                                 <RateBox icon={LocationUserIcon} text={"اكتب رأيك في البائع"} buttonText={"قيم البائع"} />
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.productDetails}>
//                                 <p>بيانات المنتج</p>
//                             </div>
//                             <Card
//                                 isCanceled={order.statuslabel === "تم الإلغاء"}
//                                 orderStatus={order.statuslabel}
//                                 title={product.name}
//                                 brand={`ماركة ${product.brand?.name || "غير معروفة"}`}
//                                 image={product.main_img}
//                                 id={product.id}
//                             />
//                         </div>
//                     </div>
//
//                     <div className={styles.outherInfo}>
//                         <div className={styles.box}>
//                             <div className={styles.productNumber}>
//                                 <Hash size={18} className={styles.icon}/>
//                                 <p>رقم المنتج :</p>
//                                 <span className={styles.idHighlight}>{product.id}</span>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.address}>
//                                 <h4>عنوان التوصيل</h4>
//                                 <div className={styles.fullAddress}>
//                                     <MapPin size={18} className={styles.icon}/>
//                                     <p>{order.address || "العنوان غير متوفر حالياً"}</p>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <Link href={`/orders/${orderId}`} className={styles.orderSumm}>
//                                 <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
//                                     <Package size={18} className={styles.icon}/>
//                                     <p>ملخص الطلب</p>
//                                 </div>
//                                 <span>{LeftArrowIcon}</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductOrderDetails;
// "use client";
//
// import styles from './productOrderDetails.module.css';
// import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
// import Line from "@/Components/Shared/Line/Line";
// import Card from "@/Components/Orders/Card/Card";
// import Link from "next/link";
// import {
//     LeftArrowIcon,
//     LocationUserIcon,
//     LocitionIcon,
//     PackageDeliveredIcon,
//     PackageIcon,
//     ShippingTruckIcon
// } from "@/utils/Icons";
// import RateBox from "@/Components/Orders/OrdersDetails/productOrderDetails/RateBox/RateBox";
// import useSWR from "swr";
// import { useParams } from "next/navigation";
// import { getOrder } from "@/api/services/getOrder";
// import { Hash, Package, MapPin } from "lucide-react";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error from "@/Components/Shared/Error/Error";
// import React from "react";
// import {useLocale, useTranslations} from "next-intl";
// import {getProfile} from "@/api/services/auth/getProfile";
//
// const ProductOrderDetails = () => {
//     const { orderId, productId } = useParams();
//     const locale = useLocale();
//     const { data: profileData,isLoading:isLoadingProf } = useSWR("profileData", getProfile, {
//         revalidateOnFocus: false,
//     });
//     const { data, error, isLoading } = useSWR(orderId ? `order-${orderId}` : null, () => getOrder(orderId));
//     if (isLoading) return <Loading />;
//     if (error || !data?.data) return <Error message="تعذر تحميل تفاصيل الطلب" />;
//
//     const order = data.data;
//     const orderProducts = order.order_products || [];
//
//     const productEntry = orderProducts.find(p => p.product?.id === parseInt(productId));
//     const product = productEntry?.product;
//     const t = useTranslations("Orders");
//     if (!product) return <p style={{ textAlign: "center" }}>لم يتم العثور على المنتج ضمن هذا الطلب</p>;
//
//     const productName = product.name?.[locale] || "منتج غير معروف";
//     const productImage = product.media?.find(m => m.type === "image")?.url || "";
//     const brands = product.brands?.map(b => b.name?.[locale] || "ماركة") || [];
//
//     const formattedDate = new Date(order.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//     }) + "، " + new Date(order.created_at).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US");
//
//     const addressText = order.address?.address || "العنوان غير متوفر حالياً";
//     const statusLabel = order.status || "غير معروف";
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.sidebar}>
//                 <ProfileSidebar userData={profileData?.data ?? {}} />
//             </div>
//             <div className={styles.details}>
//                 <div className={styles.header}>
//                     <Link href={'/orders'}>
//                         <h3>{t("title")}</h3>
//                     </Link>
//                     <span>/</span>
//                     <h5>{t("orderDetails")}</h5>
//                 </div>
//
//                 <div className={styles.detailsSection}>
//                     <div className={styles.detailsInfo}>
//                         <div className={styles.box}>
//                             <div className={styles.stateBoxHeader}>
//                                 <span className={styles.iconGreen}>{PackageDeliveredIcon}</span>
//                                 <span className={styles.successText}>{statusLabel}</span>
//                                 <span className={styles.dateText}>{formattedDate}</span>
//                             </div>
//                             <Line />
//                             <div className={styles.contact}>
//                                 <p>هل لديك مشكلة مع هذا المنتج؟</p>
//                                 <button className={styles.contactBtn}>تواصل معنا</button>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.rateTitle}>
//                                 <p>شاركنا تجربتك</p>
//                             </div>
//                             <div className={styles.items}>
//                                 <RateBox
//                                     icon={ShippingTruckIcon}
//                                     text={t("details.rate.shipping")}
//                                     buttonText={t("details.rate.shippingBtn")}
//                                 />
//                                 <RateBox
//                                     icon={PackageIcon}
//                                     text={t("details.rate.product")}
//                                     buttonText={t("details.rate.productBtn")}
//                                 />
//                                 <RateBox
//                                     icon={LocationUserIcon}
//                                     text={t("details.rate.seller")}
//                                     buttonText={t("details.rate.sellerBtn")}
//                                 />
//
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.productDetails}>
//                                 <p>بيانات المنتج</p>
//                             </div>
//                             <Card
//                                 isCanceled={statusLabel === "تم الإلغاء"}
//                                 orderStatus={statusLabel}
//                                 title={productName}
//                                 brands={brands}
//                                 image={productImage}
//                                 id={product.id}
//                             />
//                         </div>
//                     </div>
//
//                     <div className={styles.outherInfo}>
//                         <div className={styles.box}>
//                             <div className={styles.productNumber}>
//                                 <Hash size={18} className={styles.icon} />
//                                 <p>رقم المنتج :</p>
//                                 <span className={styles.idHighlight}>{product.id}</span>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <div className={styles.address}>
//                                 <h4>عنوان التوصيل</h4>
//                                 <div className={styles.fullAddress}>
//                                     <MapPin size={18} className={styles.icon} />
//                                     <p>{addressText}</p>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className={styles.box}>
//                             <Link href={`/orders/${orderId}`} className={styles.orderSumm}>
//                                 <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                                     <Package size={18} className={styles.icon} />
//                                     <p>ملخص الطلب</p>
//                                 </div>
//                                 <span>{LeftArrowIcon}</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductOrderDetails;
"use client";

 import styles from './productOrderDetails.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import Card from "@/Components/Orders/Card/Card";
import Link from "next/link";
import {
    LeftArrowIcon,
    LocationUserIcon,
    LocitionIcon,
    PackageDeliveredIcon,
    PackageIcon,
    ShippingTruckIcon
} from "@/utils/Icons";
import RateBox from "@/Components/Orders/OrdersDetails/productOrderDetails/RateBox/RateBox";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { getOrder } from "@/api/services/getOrder";
import { Hash, Package, MapPin } from "lucide-react";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import React from "react";
import {useLocale, useTranslations} from "next-intl";
import {getProfile} from "@/api/services/auth/getProfile";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";


const ProductOrderDetails = () => {
    const {orderId, productId} = useParams();
    const locale = useLocale();
    const t = useTranslations("Orders");
    const {data: profileData, isLoading: isLoadingProf} = useSWR("profileData", getProfile, {
        revalidateOnFocus: false,
    });
    const {data, error, isLoading} = useSWR(orderId ? `order-${orderId}` : null, () =>
        getOrder(orderId)
    );

    if (isLoading) return <Loading/>;
    if (error || !data?.data) return <Error message={t("details.loadError")}/>;

    const order = data.data;
    const orderProducts = order.order_products || [];
    const productEntry = orderProducts.find(p => p.product?.id === parseInt(productId));
    const product = productEntry?.product;

    if (!product) return  <EmptyState message={t("details.productNotFound")}/>;

    const productName = product.name?.[locale] || t("details.unknownProduct");
    const productImage = product.media?.find(m => m.type === "image")?.url || "";
    const brands = product.brands?.map(b => b.name?.[locale] || t("details.unknownBrand")) || [];

    const formattedDate =
        new Date(order.created_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }) +
        "، " +
        new Date(order.created_at).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US");


    const addressText =
        order?.address
            ? `${order.address.address || ""}، ${order.address.state || ""}، ${order.address.exstra_address || ""}`.trim().replace(/^،|،$/g, "") || t("details.noAddress")
            : t("details.noAddress");
    const statusLabel = t(`statuses.${order.status}`) || t("statuses.pending");

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar userData={profileData?.data ?? {}}/>
            </div>

            <div className={styles.details}>
                <div className={styles.header}>
                    <Link href={"/orders"}>
                        <h3>{t("title")}</h3>
                    </Link>
                    <span>/</span>
                    <h5>{t("details.viewProduct")}</h5>
                </div>

                <div className={styles.detailsSection}>
                    <div className={styles.detailsInfo}>
                        <div className={styles.box}>
                            <div className={styles.stateBoxHeader}>
                                <span className={styles.iconGreen}>{PackageDeliveredIcon}</span>
                                <span className={styles.successText}>{statusLabel}</span>
                                <span className={styles.dateText}>{formattedDate}</span>
                            </div>
                            <Line/>
                            <div className={styles.contact}>
                                <p>{t("details.haveProblem")}</p>
                                <button className={styles.contactBtn}>{t("details.contactUs")}</button>
                            </div>
                        </div>

                        {/* <div className={styles.box}>
                            <div className={styles.rateTitle}>
                                <p>{t("details.shareExperience")}</p>
                            </div>
                            <div className={styles.items}>
                                <RateBox
                                    icon={ShippingTruckIcon}
                                    text={t("details.rate.shipping")}
                                    buttonText={t("details.rate.shippingBtn")}
                                />
                                <RateBox
                                    icon={PackageIcon}
                                    text={t("details.rate.product")}
                                    buttonText={t("details.rate.productBtn")}
                                />
                                <RateBox
                                    icon={LocationUserIcon}
                                    text={t("details.rate.seller")}
                                    buttonText={t("details.rate.sellerBtn")}
                                />
                            </div>
                        </div> */}

                        <div className={styles.box}>
                            <div className={styles.productDetails}>
                                <p>{t("details.productData")}</p>
                            </div>
                            <Card
                                isCanceled={order.status === "cancelled" || order.status === "تم الإلغاء"}
                                orderStatus={statusLabel}
                                title={productName}
                                brands={brands}
                                image={productImage}
                                id={product.id}
                                t={t}
                            />
                        </div>
                    </div>

                    <div className={styles.outherInfo}>
                        <div className={styles.box}>
                            <div className={styles.productNumber}>
                                <Hash size={18} className={styles.icon}/>
                                <p>{t("details.productNumber")} :</p>
                                <span className={styles.idHighlight}>{product.id}</span>
                            </div>
                        </div>

                        <div className={styles.box}>
                            <div className={styles.address}>
                                <h4>{t("details.shippingAddress")}</h4>
                                <div className={styles.fullAddress}>
                                    <MapPin size={18} className={styles.icon}/>
                                    <p>{addressText}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.box}>
                            <Link prefetch={true} href={`/${locale}/orders/${orderId}`} className={styles.orderSumm}>
                                <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                                    <Package size={18} className={styles.icon}/>
                                    <p>{t("details.orderSummary")}</p>
                                </div>
                                <span>{LeftArrowIcon}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOrderDetails;
