import styles from './OrderDetailsSuccessful.module.css';
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Link from "next/link";
import {
    LocitionIcon,
    MasterCardIcon,
    PackageDeliveredIcon,
} from "@/utils/Icons";
import Card from "@/Components/Orders/Card/Card";
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import React from "react";
import Line from "@/Components/Shared/Line/Line";

const OrderDetailsSuccessful = (props) => {
    return (
        <div className={styles.container}>

            <div className={styles.sidebar}>
                <ProfileSidebar/>
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <Link href={'/orders'}>
                        <h3>
                            الطلبات
                        </h3>
                    </Link>
                    <span>
                        /
                    </span>
                    <h5>
                        تفاصيل المنتج
                    </h5>

                </div>
                <div className={styles.detailsSection}>
                    <div className={styles.detailsInfo}>

                        <div className={styles.box}>
                            <div className={styles.stateBoxHeader}>
                                <span>
                                    {PackageDeliveredIcon}
                                </span>
                                <span>
                           تم الطلب
                                </span>
                                <span>
                                  في الأحَد, ٢٤ نوفمبر, ١٢:٠٢ ص
                                </span>

                            </div>


                        </div>


                        <div className={styles.box}>
                            <div className={styles.title}>
                                <p>
                                    بيانات المنتج
                                </p>
                            </div>
                            <div>
                                <Card

                                    orderStatus={"تم التسليم"}
                                    title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                                    brand={"trendyol  ماركة  "}
                                />
                            </div>
                        </div>

                    </div>
                    <div className={styles.outherInfo}>
                        <OrderSummary
                            style={{marginTop: "0"}}
                            hideButtonCompleting
                        />
                        <div className={styles.boxDetails}>
                            <div className={styles.title}>
                                <p>
                                    تفاصيل الدفع
                                </p>
                            </div>
                            <Line/>
                            <div className={styles.cardDetails}>
                                <div>
                                    <span>
                                        {MasterCardIcon}
                                    </span>
                                    <span>
                                        xxxx  221  2698  2366  MasterCard
                                    </span>
                                </div>
                                <p>
                                    2250 IQD
                                </p>
                            </div>

                        </div>
                        <div className={styles.boxDetails}>
                            <div className={styles.address}>
                                <h4>
                                    عنوان الشحن
                                </h4>
                                <Line/>
                                <div className={styles.fullAddress}>
                                    <span>
                                        {LocitionIcon}
                                    </span>
                                    <p>
                                        المحلة -محلة ابوعلى مدخل المصرف, X5CX+PH - El Mahalla El Kubra - Gharbia
                                        Governorate,الغربية, مصر
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderDetailsSuccessful;
