"use client";
import {AnimatePresence,motion} from 'framer-motion'
import ProductCardSkeleton
    from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSkeleton/ProductCardSkeleton";
import styles from "./ProductSliderSkeleton.module.css";
const ProductSliderSkeleton = ({count=8}) => {

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0,
                staggerChildren: 0.03,
            },
        },
    };

    return (
        <div style={{ margin: 'auto auto 2rem auto', width: '95%',paddingTop:'20px' }}>
            <AnimatePresence>
                <motion.div variants={containerVariants} initial="hidden" animate="visible">

                    <div className={styles.skeletonWrapper}>
                        <div className={`${styles.cardWrapper} ${styles.show4}`}>
                            <ProductCardSkeleton/>
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show3}`}>
                            <ProductCardSkeleton/>
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show2}`}>
                            <ProductCardSkeleton/>
                        </div>
                        <div className={`${styles.cardWrapper} ${styles.show1}`}>
                            <ProductCardSkeleton/>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ProductSliderSkeleton;
