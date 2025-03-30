import styles from './PaymentMethod.module.css'
import {CashIcon, CreditCardIcon} from "@/utils/Icons";
import Image from "next/image";

const PaymentMethod=({item})=>{
    return(
        <div className={styles.paymentRow}>
            <input
            type={"radio"}
            name={"radio-payment"}
            value={""}//
            className={styles.radioInput}
            // checked={props.isChecked}
             id={item.id}
            />

            <div className={styles.details}>
                <label htmlFor={item.id} className={"cursor-pointer"}>
                    <div>
                        <h2>
                            {item.name}
                        </h2>
                        <p>
                            {item.description??"تتوفر خدمة الدفع بالأقساط الشهرية"}
                        </p>
                    </div>
                </label>
                <div>
                    <Image
                        src={item.ImageFullPath||"/img_1.png"}
                        alt={item.name}
                        width={30}
                        height={30}
                    />
                    {/*{props.icon}*/}
                </div>

            </div>

        </div>
    )
}
export default PaymentMethod