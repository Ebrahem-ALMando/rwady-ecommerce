import ProductImages from "@/Components/ProductDetails/ProductImages/ProductImages";
import styles from './ProductDetails.module.css'
import DetailsCard from "@/Components/ProductDetails/DetailsCard/DetailsCard";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";

const ProductDetails=props=>{
    const images = [
        { original: "/images/Products/p5.jpeg", thumbnail: "/images/Products/p5.jpeg" },
        { original: "/images/Shopping/img.png", thumbnail: "/images/Shopping/img.png" },
        { original: "/images/Shopping/img.png", thumbnail: "/images/Shopping/img.png" },
        { original: "/images/Shopping/img.png", thumbnail: "/images/Shopping/img.png" },
        { original: "/images/Shopping/img.png", thumbnail: "/images/Shopping/img.png" },
        { original: "/images/Shopping/img.png", thumbnail: "/images/Shopping/img.png" },
    ];
    return(
        <div className={styles.container}>
            <div className={styles.imaContainer}>
                <ProductImages images={images}/>
            </div>
            <div className={styles.detailsContainer}>
                <DetailsCard/>
            </div>


        </div>
    )

}
export default ProductDetails