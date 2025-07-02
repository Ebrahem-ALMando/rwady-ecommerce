import styles from './PaymentMethod.module.css'
import {CashIcon, CreditCardIcon} from "@/utils/Icons";
import Image from "next/image";
import {useState} from "react";

const PaymentMethod=({item,handleChecked,isSelected,lang})=>{

    const select=()=>{
        handleChecked(item.id,item.payment_method)
    }
    return (
        <div className={styles.paymentRow}>
            <input
                type="radio"
                name="radio-payment"
                className={styles.radioInput}
                onChange={select}
                checked={isSelected}
                id={item.id}
            />

            <div className={styles.details}>
                <label htmlFor={item.id} className="cursor-pointer">
                    <div>
                        <h2>{item.name[lang]}</h2>
                        {/*<p>{item.description[lang]}</p>*/}
                    </div>
                </label>
                <div>
                    {item.icon}
                </div>
            </div>
        </div>
        // <div className={styles.paymentRow}>
        //     <input
        //         type="radio"
        //         name="radio-payment"
        //         id={item.id}
        //         className={styles.radioInput}
        //         checked={isSelected}
        //         onChange={select}
        //     />
        //
        //
        //     <div className={styles.details}>
        //         <label htmlFor={item.id} className={"cursor-pointer"}>
        //             <div>
        //                 <h2>
        //                     <h2>{item.name[lang]}</h2>
        //
        //                 </h2>
        //                 <p>
        //                     {/*{item.description[lang]}*/}
        //                     {/*بطاقة بنكية*/}
        //                     {/*{item.description??"تتوفر خدمة الدفع بالأقساط الشهرية"}*/}
        //                 </p>
        //             </div>
        //         </label>
        //         <div>
        //             <span className={styles.icon}>
        //                 {item.icon}
        //             </span>
        //             {/*<Image*/}
        //             {/*    src={item.ImageFullPath||"/img_1.png"}*/}
        //             {/*    alt={item.name}*/}
        //             {/*    width={30}*/}
        //             {/*    height={30}*/}
        //             {/*/>*/}
        //             {/*{props.icon}*/}
        //         </div>
        //
        //     </div>
        //
        // </div>
    )
}
export default PaymentMethod