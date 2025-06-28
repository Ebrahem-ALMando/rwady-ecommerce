// import styles from './ImageCard.module.css'
// import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
// const ImageCard=({item,lang})=>{
//
//     return(
//         <div className={styles.imageCard}>
//
//             <SafeImage
//                 fallback="/images/Shopping/img.png"
//                 className={styles.image}
//                 src={item?.image}
//                 alt={`${item?.name} منتج `}
//                 width={250}
//                 height={180}
//                 decoding={"async"}
//             />
//             <span>
//                 x {item?.quantity}
//             </span>
//             <div className={styles.details}>
//                 <h2>
//                     {item?.brands[0]?.name}
//                 </h2>
//                 <h1 title={item?.name?.[lang]}>
//                     {item?.name?.length > 19 ? `${item?.name?.slice(0, 31)}...` : item?.name}
//                 </h1>
//                 <p >
//                     {item?.finalPrice}
//                     {" "}
//                      IQD
//
//                 </p>
//             </div>
//         </div>
//     )
// }
// export default ImageCard

import styles from './ImageCard.module.css';
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const ImageCard = ({ item, lang }) => {
    const brand = item?.brands?.[0]?.name || '';
    const localizedName = item?.name?.[lang] || item?.name || '';
    const displayName = localizedName.length > 40 ? localizedName.slice(0, 40) + "..." : localizedName;

    return (
        <div className={styles.checkoutImageCard}>
            <SafeImage
                fallback="/images/Shopping/img.png"
                className={styles.productImage}
                src={item?.image}
                alt={`منتج ${localizedName}`}
                width={80}
                height={80}
                decoding="async"
            />
            <div className={styles.productDetails}>
                <span className={styles.quantity}>x{item?.quantity}</span>
                {brand && <h3 className={styles.brand}>{brand}</h3>}
                <p className={styles.name} title={localizedName}>{displayName}</p>
                <p className={styles.price}>{item?.finalPrice} IQD</p>
            </div>
        </div>
    );
};

export default ImageCard;
