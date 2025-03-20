"use client"
import styles from './Card.module.css';
import Select from "react-select";
import {LeftArrowIcon} from "@/utils/Icons";
const Card=props=>{
    return (
        <div className={`${styles.productCard} ${props.visible?'':styles.productCardState}`}>
            <div className={styles.productImg}>
                <img src="/images/Shopping/img.png"

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

            {props.visible &&
                <div className={styles.productDetails}>

                    {!props.isCanceled ?
                        <p className={styles.titleDetails}>
                            شاركنا تجرتك
                        </p> : ''
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
                                {LeftArrowIcon}
                    </span>

                        }
                    </div>

                </div>
            }
        </div>
    )
}
export default Card