import styles from './ImageCard.module.css'
import Image from "next/image";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
const ImageCard=({item})=>{

    return(
        <div className={styles.imageCard}>

            <SafeImage
                fallback="/images/Shopping/img.png"
                className={styles.image}
                src={item.image}
                alt={`${item.name} منتج `}
                width={250}
                height={180}
                decoding={"async"}
            />
            <span>
                x {item.quantity}
            </span>
            <div className={styles.details}>
                <h2>
                    {item.brand.name}
                </h2>
                <h1 title={item.name}>
                    {item.name?.length > 19 ? `${item.name?.slice(0, 31)}...` : item.name}
                </h1>
                <p >
                    {item.finalPrice}
                    {" "}
                     IQD

                </p>
            </div>
        </div>
    )
}
export default ImageCard