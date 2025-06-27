"use client"
import styles from './Payment.module.css'
import Line from "@/Components/Shared/Line/Line";
import ImageCard from "@/Components/Checkout/Order/ImageCard";
import {CashIcon, CreditCardIcon} from "@/utils/Icons";
import PaymentMethod from "@/Components/Checkout/Payment/PaymentMethod/PaymentMethod";
import {getTerms} from "@/api/services/terms";
import Error from "@/Components/Shared/Error/Error";
import {getListPayments} from "@/api/services/listPayments";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";

const Payment=({handleChecked})=>{

    // const { data:listPaymentsData, error, isLoading, mutate } = useSWR(
    //     "list-payments",
    //     getListPayments
    // );
    //
    //
    // const hasError = error;
    //
    // if (isLoading) return <Loading />;
    // if (hasError)
    //     return (
    //         <Error
    //             onRetry={() =>
    //                 mutate(undefined, {
    //                     revalidate: true,
    //                 })
    //             }
    //         />
    //     );
    const mockPayments = [
        {
            id: 1,
            name: "الدفع عند الاستلام",
            type: "cash",
            icon: "CashIcon",
            active: true
        },
        {
            id: 2,
            name: "تحويل بنكي",
            type: "externel",
            icon: "CreditCardIcon",
            active: true
        },
    ];

    // const Data = listPaymentsData?.data || [];
    const Data = mockPayments;

    return(
        <div className={styles.payment}>
            {
                Data.map((item,index)=>(
                    // item.active&&
                        <div  key={index}>
                            <PaymentMethod
                                handleChecked={handleChecked}
                                item={item}
                                id={`CreditCardIcon-${index}`}

                            />
                            <Line
                                styles={{ width: "93%",borderTop:"2px solid #E6EAEE" }}
                            />
                        </div>
                ))
            }

        </div>
    )
}
export default Payment;