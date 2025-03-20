import styles from './OrderDetailsCancelled.module.css';
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
import RateBox from "@/Components/Orders/OrdersDetails/OrderDetailsCancelled/RateBox/RateBox";

const OrderDetailsCancelled = (props) => {
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
                                    تم التسليم
                                </span>
                                <span>
                         في الأحَد, ٢٤ نوفمبر, ١٢:٠٢ ص
                                </span>

                            </div>
                            <Line/>
                            <div className={styles.contact}>
                                <p
                                >
                                    هل لديك مشكلة مع هذا المنتج؟
                                </p>
                                <button>
                                    تواصل معنا
                                </button>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.rateTitle}>
                                <p>
                                    شاركنا تجربتك
                                </p>
                            </div>

                            <div className={styles.items}>
                                <RateBox
                                    icon={ShippingTruckIcon}
                                    text={"اكتب رأيك في الشحن"}
                                    buttonText={"قيم التوصيل"}
                                />
                                <RateBox
                                    icon={PackageIcon}
                                    text={"اكتب رأيك في المنتج"}
                                    buttonText={"قيم المنتج"}
                                />
                                <RateBox
                                    icon={LocationUserIcon}
                                    text={"اكتب رأيك في البائع"}
                                    buttonText={"قيم البائع"}
                                />
                            </div>
                        </div>

                        <div className={styles.box}>
                            <div className={styles.productDetails}>
                                <p >
                                    بيانات المنتج
                                </p>
                            </div>
                            <div >
                                <Card
                                    isCanceled
                                    orderStatus={"تم الإلغاء"}
                                    title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                                    brand={"trendyol  ماركة  "}
                                />
                            </div>
                        </div>

                    </div>
                    <div className={styles.outherInfo}>

                        <div className={styles.box}>
                            <div className={styles.productNumber}>
                                <p>
                                    رقم المنتج :
                                </p>
                                <span>
                                    2502325564
                                </span>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.address}>
                                <h4>
                                    عنوان التوصيل
                                </h4>
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
                        <div className={styles.box}>
                            <div className={styles.orderSumm}>
                                <p>
                                    ملخص الطلب
                                </p>
                                <span>
                                 {LeftArrowIcon}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderDetailsCancelled;
