import styles from './ImageCard.module.css'
import Image from "next/image";
const ImageCard=(props)=>{
    const title ="   بريتيجاردن بلوفر كاجوال كبير الحجم بقبة دائرية بدون طوق واكمام طويلة للنساء، بلوزة محبوكة مكتنزة"

    return(
        <div className={styles.imageCard}>
            <Image
                className={styles.image}
                src={"/images/Shopping/img.png"}
                alt={"imageTitle"}
                width={250}
                height={180}
            />
            <span>
                x 1
            </span>
            <div className={styles.details}>
                <h2>
                    trendyol ماركة
                </h2>
                <h1 title={title}>
                    {title.length > 19 ? `${title.slice(0, 31)}...` : title}
                </h1>
                <p>
                    50,000 IQD
                </p>
            </div>
        </div>
    )
}
export default ImageCard