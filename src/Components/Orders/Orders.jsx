import styles from './Orders.module.css'

import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import Card from "@/Components/Orders/Card/Card";

const Orders=props=>{
    return(
        <div className={styles.container}>

            <div className={styles.sidebar}>
                <ProfileSidebar/>
            </div>
            <div className={styles.orders}>
                <div className={styles.header}>
                    <h3>
                        الطلبات
                    </h3>
                    <div className={styles.filterSection}>
                        <div className={styles.selectWrapper}>

                            <select
                                name="orderName"
                                defaultValue=""
                                className={styles.selectInput}
                            >
                                <option value="" disabled hidden>اسم الطلب</option>
                                <option value="طلب1">طلب 1</option>
                                <option value="طلب2">طلب 2</option>
                            </select>

                        </div>
                        <div className={styles.selectWrapper}>

                            <select
                                name="orderDate"
                                defaultValue=""
                                className={styles.selectInput}
                            >
                                <option value="" disabled hidden>تاريخ الطلب</option>
                                <option value="17/3/2024">17/3/2024</option>
                                <option value="17/3/2025">17/3/2025</option>
                            </select>

                        </div>
                    </div>
                </div>
                <Line/>

                <Card
                orderStatus={"تم التسليم"}
                title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                brand={"trendyol  ماركة  "}

                />

                <Card
                    orderStatus={"تم الالغاء"}
                    isCanceled
                    title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                    brand={"trendyol  ماركة  "}

                />
                <Card
                    orderStatus={"تم التسليم"}
                    title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                    brand={"trendyol  ماركة  "}

                />

                <Card
                    orderStatus={"تم الالغاء"}
                    isCanceled
                    title={"بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"}
                    brand={"trendyol  ماركة  "}

                />

            </div>

        </div>
    );
}
export default Orders;