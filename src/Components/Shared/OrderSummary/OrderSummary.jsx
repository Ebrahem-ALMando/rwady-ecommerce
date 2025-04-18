// "use server"
import styles from "./OrderSummary.module.css";
import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
import React from "react";

import axios from "axios";
import {data} from "framer-motion/m";

const OrderSummary=props=>{
    // const testPostRequest = async () => {
    //     try {
    //         const response = await fetch("https://rawady.brainsoftsolutions.com/api/checkcoupon", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ code: "rrf" })
    //         });
    //
    //         const data = await response.json();
    //         console.log("Response:", data);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };
    //
    // const test = async () => {
    //     const formData = new FormData();
    //     formData.append("nameCategoryData", "صنف جديد");
    //     formData.append("descriptionCategoryData", "test");
    //    await  axios
    //         .post("https://dentalcareteam.org/Creativity-Platform/api/store/category/data", formData)
    //         .then((response) => {
    //             console.log("Response:", response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // };
    // const handleCouponCheck = async () => {
    //     const couponCode = "rrf";
    //
    //     try {
    //         const result = await checkCoupon(couponCode);
    //
    //         if (result?.isValid) {
    //             console.log("✅ الكوبون صالح، الخصم:", result.discount);
    //         } else {
    //             console.log("❌ الكوبون غير صالح");
    //         }
    //     } catch (error) {
    //         console.error("خطأ في التحقق من الكوبون:", error.message);
    //     }
    // };
    return (
        <div
            style={props.style}
            className={styles.summary}>
            <h3 className={styles.titleSummary}>
                ملخص الطلب
            </h3>

            <hr className={styles.line}/>
            <p>
                هل لديك كود خصم
            </p>

            <div className={styles.inputContainer}>
                <input
                    className={styles.inputCoupon}
                    type="text"
                    placeholder="أدخل كود الخصم"
                    maxLength={15}
                />
                <svg
                    className={styles.iconInput}
                    width="30" height="30" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M2.08301 9.99998C2.08301 6.26803 2.08301 4.40205 3.24238 3.24268C4.40175 2.08331 6.26772 2.08331 9.99967 2.08331C13.7316 2.08331 15.5976 2.08331 16.757 3.24268C17.9163 4.40205 17.9163 6.26803 17.9163 9.99998C17.9163 13.7319 17.9163 15.5979 16.757 16.7573C15.5976 17.9166 13.7316 17.9166 9.99967 17.9166C6.26772 17.9166 4.40175 17.9166 3.24238 16.7573C2.08301 15.5979 2.08301 13.7319 2.08301 9.99998Z"
                          fill="#F55157"/>
                    <path
                        d="M7.63418 2.70815C7.97927 2.70026 8.25262 2.41412 8.24473 2.06903C8.23684 1.72394 7.9507 1.45059 7.60561 1.45848C5.41446 1.50858 3.86868 1.70531 2.78684 2.78715C1.705 3.86898 1.50827 5.41476 1.45817 7.60592C1.45028 7.951 1.72364 8.23715 2.06872 8.24504C2.41381 8.25293 2.69996 7.97958 2.70785 7.63449C2.759 5.39727 2.98528 4.35647 3.67072 3.67103C4.35616 2.98559 5.39696 2.75931 7.63418 2.70815Z"
                        fill="#F55157"/>
                    <path
                        d="M12.3937 1.45848C12.0487 1.45059 11.7625 1.72394 11.7546 2.06903C11.7467 2.41412 12.0201 2.70026 12.3652 2.70815C14.6024 2.75931 15.6432 2.98559 16.3286 3.67103C17.0141 4.35647 17.2404 5.39727 17.2915 7.63449C17.2994 7.97958 17.5855 8.25293 17.9306 8.24504C18.2757 8.23715 18.5491 7.951 18.5412 7.60592C18.4911 5.41476 18.2944 3.86898 17.2125 2.78715C16.1307 1.70531 14.5849 1.50858 12.3937 1.45848Z"
                        fill="#F55157"/>
                    <path
                        d="M18.5412 12.394C18.5491 12.0489 18.2757 11.7628 17.9306 11.7549C17.5855 11.747 17.2994 12.0204 17.2915 12.3655C17.2404 14.6027 17.0141 15.6435 16.3286 16.3289C15.6432 17.0144 14.6024 17.2407 12.3652 17.2918C12.0201 17.2997 11.7467 17.5858 11.7546 17.9309C11.7625 18.276 12.0487 18.5494 12.3937 18.5415C14.5849 18.4914 16.1307 18.2947 17.2125 17.2128C18.2944 16.131 18.4911 14.5852 18.5412 12.394Z"
                        fill="#F55157"/>
                    <path
                        d="M2.70785 12.3655C2.69996 12.0204 2.41381 11.747 2.06872 11.7549C1.72364 11.7628 1.45028 12.049 1.45817 12.394C1.50827 14.5852 1.705 16.131 2.78684 17.2128C3.86868 18.2947 5.41446 18.4914 7.60561 18.5415C7.9507 18.5494 8.23684 18.276 8.24473 17.9309C8.25262 17.5858 7.97927 17.2997 7.63418 17.2918C5.39696 17.2407 4.35616 17.0144 3.67072 16.3289C2.98528 15.6435 2.759 14.6027 2.70785 12.3655Z"
                        fill="#F55157"/>
                    <path
                        d="M6.66619 5.83331C6.20595 5.83331 5.83286 6.20641 5.83286 6.66665C5.83286 7.12688 6.20595 7.49998 6.66619 7.49998H6.67367C7.13391 7.49998 7.50701 7.12688 7.50701 6.66665C7.50701 6.20641 7.13391 5.83331 6.67367 5.83331H6.66619Z"
                        fill="#F55157"/>
                    <path
                        d="M12.4995 13.3333C12.4995 12.8731 12.8726 12.5 13.3329 12.5H13.3403C13.8006 12.5 14.1737 12.8731 14.1737 13.3333C14.1737 13.7936 13.8006 14.1666 13.3403 14.1666H13.3329C12.8726 14.1666 12.4995 13.7936 12.4995 13.3333Z"
                        fill="#F55157"/>
                    <path
                        d="M13.775 7.10859C14.019 6.86451 14.019 6.46878 13.775 6.2247C13.5309 5.98063 13.1351 5.98063 12.8911 6.2247L6.2244 12.8914C5.98032 13.1354 5.98032 13.5312 6.2244 13.7753C6.46848 14.0193 6.8642 14.0193 7.10828 13.7753L13.775 7.10859Z"
                        fill="#F55157"/>
                </svg>
                <button className={styles.buttonInput}
                // onClick={handleCouponCheck}
                >إضافة</button>
            </div>

            <RowTextWithNumber
                title={"مجموع المنتجات"}
                value={"2000 IQD"}
                colorValue={"#0741AD"}
            />
            <RowTextWithNumber
                title={"كوبون"}
                value={"250 IQD"}
                colorValue={"#F55157"}
            />
            <RowTextWithNumber
                title={"رسوم الشحن"}
                value={"200 IQD"}
                colorValue={"#0741AD"}
            />
            <hr className={styles.line}/>
            <RowTextWithNumber
                title={"الإجمالى"}
                value={"2250 IQD"}
                colorTitle={"#000"}
                weightTitle={"500"}
                sizeValue={"18px"}
                colorValue={"#0741AD"}
            />
            <RowTextWithNumber
                title={"الاسعار شاملة للضريبة"}
                star={"*"}
                colorTitle={"#A5A5A5"}
                sizeTitle={"14px"}
                weightTitle={"400"}
            />

            {!props.hideButtonCompleting &&
                <button className={styles.completeProcess}>
                    إتمام الطلب
                </button>
            }
        </div>
    )
}
export default OrderSummary