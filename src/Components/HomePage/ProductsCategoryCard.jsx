import styles from './ProductsCategoryCard.module.css'
const ProductsCategoryCard = (props) => {
    return(
        <div className={styles.mainDiv}>

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
                    <div  className={styles.itemDiv}>
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
        </div>
    )
}
export default ProductsCategoryCard