import styles from './PaymentMethod.module.css'
import {CashIcon, CreditCardIcon} from "@/utils/Icons";
import Image from "next/image";
import {useState} from "react";

const PaymentMethod=({item,handleChecked})=>{

    const checked=()=>{
        handleChecked(item.id,item.payment_method)
    }
    return(
        <div className={styles.paymentRow}>
            <input
            type={"radio"}
            name={`radio-payment`}
            value={""}//
            className={styles.radioInput}
            onClick={checked}
             id={item.id}
            />

            <div className={styles.details}>
                <label htmlFor={item.id} className={"cursor-pointer"}>
                    <div>
                        <h2>
                            {item.name}
                        </h2>
                        <p>
                            بطاقة بنكية
                            {/*{item.description??"تتوفر خدمة الدفع بالأقساط الشهرية"}*/}
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