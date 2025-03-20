import styles from './PaymentMethod.module.css'
import {CashIcon, CreditCardIcon} from "@/utils/Icons";

const PaymentMethod=props=>{
    return(
        <div className={styles.paymentRow}>
            <input
            type={"radio"}
            name={"radio-payment"}
            value={""}//
            className={styles.radioInput}
            // checked={props.isChecked}
             id={props.id}
            />

            <div className={styles.details}>
                <label htmlFor={props.id} className={"cursor-pointer"}>
                    <div>
                        <h2>
                            {props.name}
                        </h2>
                        <p>
                            {props.description}
                        </p>
                    </div>
                </label>
                <div>
                    {props.icon}
                </div>

            </div>

        </div>
    )
}
export default PaymentMethod