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
import {paymentOptions} from "@/Data/paymentOptions";

const Payment=({handleChecked,selected,lang })=>{

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



    // const Data = listPaymentsData?.data || [];
    const Data = paymentOptions ;
    return (
        <div className={styles.payment}>
            {Data.map((item, index) => {
                const isSelected =
                    selected?.method === item.payment_method &&
                    selected?.type === item.type &&
                    selected?.id === item.id;

                return (
                    <div key={index}>
                        <PaymentMethod
                            handleChecked={() =>
                                handleChecked(item.id, item.type, item.payment_method)
                            }
                            item={item}
                            isSelected={isSelected}
                            id={`CreditCardIcon-${index}`}
                            lang={lang}
                        />
                        <Line
                            styles={{width: "93%", borderTop: "2px solid #E6EAEE"}}
                        />
                    </div>
                );
            })}
        </div>
    )
}
export default Payment;