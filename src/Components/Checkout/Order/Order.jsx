'use client'
import styles from './Order.module.css'
import {CallIcon, FillLocitionIcon, LocitionIcon, UserIcon} from "@/utils/Icons";
import Line from "@/Components/Shared/Line/Line";
import ImageCard from "@/Components/Checkout/Order/ImageCard";
import useCart from "@/hooks/useCart";
const Order=props=>{
    const {cart}=useCart()
    return(
        <div className={styles.order}>
            <div className={styles.header}>
                <h2>
                    شحنة رقم 1 من 1
                </h2>
            </div>
            <Line
                styles={{ width: "93%",borderTop:"2px solid #E6EAEE" }}
            />
            <div className={styles.details}>
                {cart.map((item,index)=>(
                    <ImageCard
                    key={index}
                    item={item}
                    />
                ))}
                {/*<ImageCard/>*/}
                {/*<ImageCard/>*/}
                {/*<ImageCard/>*/}
            </div>
        </div>
    )
}
export default Order;