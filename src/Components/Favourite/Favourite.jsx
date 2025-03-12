import styles from './Favourite.module.css';
import ProductCardSlider from "@/Components/Shared/ProductCardSlider/ProductCardSlider";
import React from "react";
import {favouriteProducts} from "@/Data/Favourite";
const Favourite=(props)=>{
    return(
        <div className={styles.container}>
            <div className={styles.items}>
                {favouriteProducts.map((slide, index) => (
                    <ProductCardSlider key={index} product={slide} />
                ))}
            </div>
        </div>
    )
}
export default Favourite