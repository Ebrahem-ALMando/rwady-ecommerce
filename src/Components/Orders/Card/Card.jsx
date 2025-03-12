"use client"
import styles from './Card.module.css';
import Select from "react-select";
const Card=props=>{
    return (
        <div className={styles.productCard}>
            <div className={styles.productImg}>
                <img src="./images/Shopping/img.png"

                     alt=""/>
            </div>
            <div className={styles.productItem}>
                <p className={styles.stateRow}>
                    <span
                        style={{
                                color:!props.isCanceled?'#07AD5D':'#F55157'}}
                    >
                       {props.orderStatus}
                    </span>
                    <span className={styles.date}>
                        في الأحَد, ٢٤ نوفمبر, ١٢:٠٢ ص
                    </span>

                </p>
                <h4 className={styles.title}>
                    {props.title}
                </h4>
                <p className={styles.brand}>
                    {props.brand}

                </p>

            </div>
            <div className={styles.productDetails}>

                {!props.isCanceled ?
                <p className={styles.titleDetails}>
                   شاركنا تجرتك
                </p>:''
                }
                <div className={styles.buttons}>

                    {!props.isCanceled ?

                        <>
                            <button>
                                التوصيل
                            </button>
                            <button>
                                المنتج
                            </button>
                            <button>
                                البائع
                            </button>
                        </>
                        :
                        <span>
                        <button>
                       تابع الارجاع
                        </button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.19986 11.9995C7.19986 11.2995 7.46986 10.5995 7.99986 10.0695L14.5199 3.54953C14.8099 3.25953 15.2899 3.25953 15.5799 3.54953C15.8699 3.83953 15.8699 4.31953 15.5799 4.60953L9.05986 11.1295C8.57986 11.6095 8.57986 12.3895 9.05986 12.8695L15.5799 19.3895C15.8699 19.6795 15.8699 20.1595 15.5799 20.4495C15.2899 20.7395 14.8099 20.7395 14.5199 20.4495L7.99986 13.9295C7.46986 13.3995 7.19986 12.6995 7.19986 11.9995Z"
                            fill="#6A6E83"/>
                        </svg>
                    </span>

                    }
                </div>

            </div>
        </div>
    )
}
export default Card