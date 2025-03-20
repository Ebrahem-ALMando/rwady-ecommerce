import styles from './Payment.module.css'
import Line from "@/Components/Shared/Line/Line";
import ImageCard from "@/Components/Checkout/Order/ImageCard";
import {CashIcon, CreditCardIcon} from "@/utils/Icons";
import PaymentMethod from "@/Components/Checkout/Payment/PaymentMethod/PaymentMethod";

const Payment=props=>{
    return(
        <div className={styles.payment}>
            <PaymentMethod
                name={"  بطاقة الائتمان"}
                description={"تتوفر خدمة الدفع بالأقساط الشهرية"}
                icon={CreditCardIcon}

                id={"CreditCardIcon"}

            />
            <Line
                styles={{ width: "93%",borderTop:"2px solid #E6EAEE" }}
            />
            <PaymentMethod
                name={"الدفع نقدا عند الاستلام"}
                description={"قد يتم فرض رسوم إضافية"}
                icon={CashIcon}
                id={"CashIcon"}
            />
        </div>
    )
}
export default Payment;