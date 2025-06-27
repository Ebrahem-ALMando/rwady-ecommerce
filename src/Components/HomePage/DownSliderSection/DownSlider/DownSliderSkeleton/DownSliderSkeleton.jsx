'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '.././DownSlider.module.css';


const DownSliderSkeleton = () => {
    const skeletonCard = (styleClass = '') => (
        <div className={`${styles[styleClass]} ${styles.skeletonCard}`}>
            <div className={styles.innerCard}>
                <div className={styles.title}>
                    <Skeleton height={20} width={`80%`} />
                </div>
                <div className={styles.img}>
                    <Skeleton height={100} width={100} />
                </div>
            </div>
        </div>
    );
    const baseColor = "#e0e0e0";
    const highlightColor = "#f1f0f0";
    return (
        <div className={styles.mainDiv}>
            <div className={styles.rightDiv}>
                {skeletonCard('cardRightDiv')}
                {skeletonCard('cardRightDiv')}
                {skeletonCard('cardButtomRightDiv')}
            </div>

            <div className={`${styles.leftDiv}`}>
                <div className={`${styles.cardLeftDiv} ${styles.skeletonCard}`}>
                    <div className={styles.itemDiv}>
                        <div className={styles.title}>
                            <Skeleton height={20} width={`90%`} />
                        </div>
                        <Skeleton  className={styles.btnShop} height={50} width={`70%`}  baseColor={baseColor} highlightColor={highlightColor}/>
                    </div>
                    <div className={styles.img}>
                        <Skeleton height={150} width={150} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownSliderSkeleton;
