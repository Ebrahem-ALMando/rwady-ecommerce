'use client'
import styles from './Checkout.module.css'
import Address from "@/Components/Checkout/AddressSection/Address";
import Order from "@/Components/Checkout/Order/Order";
import Payment from "@/Components/Checkout/Payment/Payment";
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import React, {useState} from "react";
import AddressForm from "@/Components/Checkout/AddressForm/AddressForm";

const Checkout=props=>{
    const [isOpen, setIsOpen] = useState(false);
    return(
        <section className={styles.checkoutSection}>
            <div className={styles.container}>
                <AddressForm
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <div className={styles.items}>
                    <h2 className={styles.titleSection}>
                        عنوان الشحن
                    </h2>
                    <Address
                        isDefault={true}

                        onClick={()=>setIsOpen(true)}
                    />
                    <h2 className={styles.titleSection}>
                        طلبك
                    </h2>
                    <Order/>
                    <h2 className={styles.titleSection}>
                        الدفع
                    </h2>
                    <Payment/>
                </div>
                <div className={styles.processSummary}>
                    <OrderSummary/>
                </div>
            </div>
        </section>
    )
}
export default Checkout;