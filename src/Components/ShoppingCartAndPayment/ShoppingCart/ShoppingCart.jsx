"use client"
import styles from './ShoppingCart.module.css'
import React, {useState} from "react";
import Select from "react-select";
import RowTextWithNumber from "@/Components/ShoppingCartAndPayment/ShoppingCart/RowTextWithNumber";
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import {DeleteIcon, deleteIcon} from "@/utils/Icons";
import DeleteButton from "@/Components/Shared/Buttons/DeleteButton/DeleteButton";


const Carts=[
    {
        img:"./images/Shopping/img.png",
        title:'بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة',
        brand:"trendyol  ماركة  ",
        price:"‏50,000 IQD",
        discount:'خصم 30%',
        oldPrice:'‏50,000 IQD',
        deliveryType:'توصيل مجانى',
        quenty:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
        ]
    },
    {
        img:"./images/Shopping/img.png",
        title:'بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة',
        brand:"trendyol  ماركة  ",
        price:"‏50,000 IQD",
        discount:'خصم 30%',
        oldPrice:'‏50,000 IQD',
        deliveryType:'توصيل مجانى',
        quenty:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
        ]
    },
    {
        img:"./images/Shopping/img.png",
        title:'بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة',
        brand:"trendyol  ماركة  ",
        price:"‏50,000 IQD",
        discount:'خصم 30%',
        oldPrice:'‏50,000 IQD',
        deliveryType:'توصيل مجانى',
        quenty:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
        ]
    },
    {
        img:"./images/Shopping/img.png",
        title:'بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة',
        brand:"trendyol  ماركة  ",
        price:"‏50,000 IQD",
        discount:'خصم 30%',
        oldPrice:'‏50,000 IQD',
        deliveryType:'توصيل مجانى',
        quenty:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
        ]
    }
]



const ShoppingCart=()=>{
    const [isHeart, setIsHeart] = useState(false)
    const handleHeartClick = () => {
        setIsHeart(prevState => !prevState);
    };
    return(
        <div className={styles.mainDiv}>

                <div  className={styles.products}>
                    <h2 className={styles.titlePage}>
                          <span className={styles.item}>
                            (  4  items)
                        </span>
                        عربة التسوق

                    </h2>
                    {Carts.map((Cart, index) => (
                        <div key={index} className={styles.productCard}>
                                <div className={styles.productImg}>
                            <img src="./images/Shopping/img.png"

                                 alt=""/>
                         </div>
                         <div className={styles.productItem}>
                            <h4 className={styles.title}>
                                {Cart.title}
                            </h4>
                            <p className={styles.brand}>
                                {Cart.brand}

                            </p>
                            <div className={styles.actionButton}>
                                <DeleteButton
                                icon={DeleteIcon}
                                />
                                <button className={styles.heart}
                                        onClick={() => {
                                            handleHeartClick()
                                        }}
                                >
                                    <svg
                                        className={isHeart ? styles.heartSVG : ''}
                                        width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.44 3.59998C14.63 3.59998 13.01 4.47998 12 5.82998C10.99 4.47998 9.37 3.59998 7.56 3.59998C4.49 3.59998 2 6.09998 2 9.18998C2 10.38 2.19 11.48 2.52 12.5C4.1 17.5 8.97 20.49 11.38 21.31C11.72 21.43 12.28 21.43 12.62 21.31C15.03 20.49 19.9 17.5 21.48 12.5C21.81 11.48 22 10.38 22 9.18998C22 6.09998 19.51 3.59998 16.44 3.59998Z"

                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles.productDetails}>
                            <p className={styles.price}>
                                {Cart.price}
                            </p>

                            <p className={styles.oldPrice}>
                            <span className={styles.discount}>
                                {Cart.discount}
                            </span>
                                <del>
                                    {Cart.oldPrice}
                                </del>
                            </p>
                            <p className={styles.freeDelivery}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                          d="M22 15.7632V13C22 9.41015 19.0899 6.5 15.5 6.5H14.9991C14.9931 5.41249 14.9449 4.82353 14.5607 4.43934C14.1213 4 13.4142 4 12 4L2 4L2 15C2 15.9346 2 16.4019 2.20096 16.75C2.33261 16.978 2.52197 17.1674 2.75 17.299C3.07973 17.4894 3.53576 17.4891 4.37741 17.4885L4.50003 17.4885C4.50623 16.1131 5.62313 15 7 15C8.37786 15 9.49538 16.1147 9.49999 17.4915C11.0797 17.4923 12.846 17.493 14.5 17.4934C14.5036 16.1157 15.6215 15 17 15C18.3782 15 19.4959 16.1152 19.5 17.4924C20.2286 17.4916 20.6704 17.4904 20.6855 17.4885C21.3669 17.4036 21.9036 16.8669 21.9885 16.1855C22 16.0931 22 15.9831 22 15.7632Z"
                                          fill="#0741AD"/>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M13.5463 4.79847C13.1994 4.75183 12.7286 4.75024 12.0003 4.75024L2.00031 4.75024C1.5861 4.75024 1.25031 4.41445 1.25031 4.00024C1.25031 3.58603 1.5861 3.25024 2.00031 3.25024L12.0497 3.25023C12.7145 3.2502 13.2874 3.25017 13.7462 3.31184C14.2378 3.37794 14.7091 3.527 15.0913 3.90925C15.4735 4.2915 15.6226 4.76276 15.6887 5.2544C15.7094 5.40832 15.7231 5.57509 15.7323 5.75388C19.629 5.87636 22.7503 9.07379 22.7503 13.0002L22.7503 15.8031C22.7504 15.9834 22.7505 16.1385 22.733 16.2785C22.6056 17.3005 21.8006 18.1056 20.7786 18.233C20.6385 18.2504 20.4835 18.2503 20.3032 18.2503L20.1633 18.2502C19.8248 19.6836 18.5371 20.7502 17.0003 20.7502C15.4635 20.7502 14.1759 19.6836 13.8373 18.2502L10.1633 18.2502C9.82476 19.6836 8.5371 20.7502 7.00031 20.7502C5.46214 20.7502 4.17355 19.6817 3.83637 18.2464C3.65478 18.2427 3.48826 18.2357 3.33766 18.2221C3.00848 18.1922 2.68252 18.1262 2.37531 17.9488C2.03327 17.7513 1.74923 17.4673 1.55175 17.1252C1.37439 16.818 1.30833 16.4921 1.27849 16.1629C1.25028 15.8516 1.2503 15.4723 1.25031 15.0325L1.25031 12.7502C1.25031 12.336 1.5861 12.0002 2.00031 12.0002C2.41453 12.0002 2.75031 12.336 2.75031 12.7502L2.75031 15.0002C2.75031 15.4813 2.75103 15.792 2.77237 16.0275C2.79278 16.2526 2.8272 16.3344 2.85079 16.3752C2.91662 16.4893 3.0113 16.5839 3.12531 16.6498C3.16618 16.6733 3.24791 16.7078 3.47306 16.7282C3.57729 16.7376 3.69627 16.743 3.83825 16.7461C4.17832 15.3148 5.46499 14.2502 7.00031 14.2502C8.5371 14.2502 9.82477 15.3169 10.1633 16.7502L13.8373 16.7502C13.9254 16.3771 14.0779 16.0288 14.2823 15.7177C14.2615 15.6489 14.2503 15.5759 14.2503 15.5002L14.2503 7.00024C14.2503 6.27193 14.2487 5.80115 14.2021 5.45427C14.1583 5.12896 14.0877 5.027 14.0306 4.96991C13.9735 4.91282 13.8716 4.8422 13.5463 4.79847ZM20.2635 16.7502L20.1633 16.7502C19.8248 15.3169 18.5371 14.2502 17.0003 14.2502C16.5574 14.2502 16.1351 14.3388 15.7503 14.4993L15.7503 7.25558C18.81 7.38646 21.2503 9.90836 21.2503 13.0002L21.2503 15.7634C21.2503 16.0059 21.2489 16.0585 21.2446 16.093C21.2021 16.4337 20.9337 16.702 20.5931 16.7445C20.5585 16.7488 20.506 16.7502 20.2635 16.7502ZM17.0003 19.2502C16.0343 19.2502 15.2511 18.4675 15.2503 17.5017L15.2503 17.5002C15.2503 16.5337 16.0338 15.7502 17.0003 15.7502C17.9668 15.7502 18.7503 16.5337 18.7503 17.5002C18.7503 18.4667 17.9668 19.2502 17.0003 19.2502ZM7.00031 19.2502C6.03423 19.2502 5.25098 18.4674 5.25031 17.5015L5.25031 17.5002C5.25031 16.5337 6.03381 15.7502 7.00031 15.7502C7.96681 15.7502 8.75031 16.5337 8.75031 17.5002C8.75031 18.4667 7.96681 19.2502 7.00031 19.2502Z"
                                          fill="#0741AD"/>
                                    <path
                                        d="M2.00031 6.25023C1.5861 6.25023 1.25031 6.58602 1.25031 7.00023C1.25031 7.41445 1.5861 7.75023 2.00031 7.75023L8.00031 7.75023C8.41452 7.75023 8.75031 7.41445 8.75031 7.00024C8.75031 6.58602 8.41452 6.25023 8.00031 6.25023L2.00031 6.25023Z"
                                        fill="#0741AD"/>
                                    <path
                                        d="M2.00031 9.25023C1.5861 9.25023 1.25031 9.58602 1.25031 10.0002C1.25031 10.4144 1.5861 10.7502 2.00031 10.7502L6.00031 10.7502C6.41452 10.7502 6.75031 10.4144 6.75031 10.0002C6.75031 9.58602 6.41452 9.25024 6.00031 9.25024L2.00031 9.25023Z"
                                        fill="#0741AD"/>
                                </svg>

                                {Cart.deliveryType}


                            </p>
                            <div className={styles.quenty}>
                                الكمية
                                <Select
                                    options={Cart.quenty}
                                    placeholder="1"
                                    className={styles.select}
                                    components={{
                                        DropdownIndicator: () => (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        ),
                                    }}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            textAlign: 'center',
                                            background: '#f2f5fb'
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: '#0741ad !important',
                                            opacity: '0.8',
                                        }),

                                    }}
                                    instanceId="unique-select"

                                />
                            </div>

                        </div>
                    </div>
                    ))}
                </div>

            <div className={styles.processSummary}>
                <OrderSummary/>
            </div>
        </div>
    )
}
export default ShoppingCart;