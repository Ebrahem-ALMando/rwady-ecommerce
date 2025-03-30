import styles from './ProductsCategoryCard.module.css'
import {getDownSlider} from "@/api/services/downSliders";
import {getShipmentPolicies} from "@/api/services/shipmentPolicies";
import Error from "@/Components/Shared/Error/Error";
import Loading from "@/Components/Shared/Loading/Loading";
import {Suspense} from "react";
const ProductsCategoryCard = (props) => {
      const dataPromise = getDownSlider();
    return(
        <div className={styles.mainDiv}>
            <Suspense fallback={<Loading />} >
                    <CategoryData dataPromise={dataPromise}/>
            </Suspense>
        </div>
    )
}

export async function CategoryData({dataPromise}){

    let listSliderData = [];
    let error = null;
    let isError=false
    const getData=async ()=>{
        try {
            const listSlider = await dataPromise;
            listSliderData = Array.isArray(listSlider.data) ? listSlider.data : [listSlider.data] || [];
        } catch (err) {
            console.error("Error fetching terms:", err.message);
            error = err.message;
        }
    }
    await getData()

    if (error) {
        isError=true
    }

    return (
        <>
            {isError?
                (
                    <Error
                        message={"يرجى اعادة تحميل الصفحة"}
                    />
                )
                :
            <>

                    <div className={styles.rightDiv}>
                        <div className={styles.cardRightDiv}>
                            <h1 className={styles.title}>
                                منتجات
                                سامسونج
                            </h1>
                            <img
                                className={styles.img}
                                src={"/images/ProductsCategory/4.png"}
                                alt={"#"}
                                loading={"lazy"}
                            />
                        </div>
                        <div className={styles.cardRightDiv}>
                            <h1 className={styles.title}>
                                منتجات
                                أبل
                            </h1>
                            <img
                                className={styles.img}
                                src={"/images/ProductsCategory/3.png"}
                                alt={"#"}
                                loading={"lazy"}
                            />
                        </div>
                        <div className={styles.cardButtomRightDiv}>
                            <h1 className={styles.title}>
                                السماعات الصوتية
                                والالكترونيــــــــــــــــــــــات
                            </h1>
                            <img
                                className={styles.img}
                                src={"/images/ProductsCategory/2.png"}
                                alt={"#"}
                                loading={"lazy"}
                            />
                        </div>
                    </div>
                    <div className={styles.leftDiv}>
                        <div className={styles.cardLeftDiv}>
                            <div className={styles.itemDiv}>
                                <h1 className={styles.title}>
                                    أجهــــــــــــــــــــــــــــــــــــــــــــــزة
                                    الموبايـــــــــــــــــــــــــــــــــــــــــــــل
                                </h1>
                                <button className={styles.btnShop}>
                                    أبدأ تسوق الان
                                </button>
                            </div>
                            <img
                                className={styles.img}
                                src={"/images/ProductsCategory/1.png"}
                                alt={"#"}
                                loading={"lazy"}
                            />

                        </div>
                    </div>
       </>
        }
        </>
    )
}

export default ProductsCategoryCard