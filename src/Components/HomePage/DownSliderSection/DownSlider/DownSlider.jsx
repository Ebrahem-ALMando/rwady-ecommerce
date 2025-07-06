'use client';

import styles from './DownSlider.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import { useTranslations } from 'next-intl';
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const groupItems = (items, size = 4) => {
    const groups = [];
    for (let i = 0; i < items.length; i += size) {
        groups.push(items.slice(i, i + size));
    }
    return groups;
};

const DownSlider = ({ downSliderData, initialError = false, lang }) => {
    const t = useTranslations('downSlider');
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);
    const ITEMS_PER_GROUP = 4;

    useEffect(() => {
        if (Array.isArray(downSliderData)) {
            const availableItems = downSliderData.filter(item => item.availability);
            setItems(availableItems);
        }
    }, [downSliderData]);



    useEffect(() => {
        if (items.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 60000);
        return () => clearInterval(interval);
    }, [items]);
;

    if (initialError) return <ReloadWithError />;

    const isRotating = items.length > ITEMS_PER_GROUP;
    const total = isRotating ? ITEMS_PER_GROUP : items.length;

    const currentGroup = [];
    for (let i = 0; i < total; i++) {
        const index = isRotating ? (activeIndex + i) % items.length : i;
        currentGroup.push(items[index]);
    }



    const getTitle = (item) => item?.name?.[lang] || '...';
    const getImage = (item) => item?.image_url || '/placeholder.png';

    return (
        <div className={styles.mainDiv}>
            <div className={styles.rightDiv}>
                {[0, 1].map((i) => (
                    <div className={styles.cardRightDiv} key={i}>
                        <Link href={currentGroup[i]?.link || '#'} className={styles.fullLink} aria-label={getTitle(currentGroup[i])}>
                            <div className={styles.innerCard}>
                                <h1 className={styles.title}>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={getTitle(currentGroup[i])}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {getTitle(currentGroup[i])}
                                        </motion.span>
                                    </AnimatePresence>
                                </h1>
                                <Image
                                    className={styles.img}
                                    src={getImage(currentGroup[i])}
                                    alt={getTitle(currentGroup[i])}
                                    width={300}
                                    height={200}
                                    loading="lazy"
                                />
                            </div>
                        </Link>
                    </div>
                ))}

                <div className={styles.cardButtomRightDiv}>
                    <Link href={currentGroup[2]?.link || '#'} className={styles.fullLink} aria-label={getTitle(currentGroup[2])}>
                        <div className={styles.innerCard}>
                            <h1 className={styles.title}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={getTitle(currentGroup[2])}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {getTitle(currentGroup[2])}
                                    </motion.span>
                                </AnimatePresence>
                            </h1>
                            <Image
                                className={`${styles.img} ${styles.bottomImg}`}
                                src={getImage(currentGroup[2])}
                                alt={getTitle(currentGroup[2])}
                                width={200}
                                height={150}
                                loading="lazy"
                            />
                        </div>
                    </Link>
                </div>
            </div>

            <div className={styles.leftDiv}>
                <Link href={currentGroup[3]?.link || '#'} className={styles.fullLink} aria-label={getTitle(currentGroup[3])}>
                    <div className={styles.cardLeftDiv}>
                        <div className={styles.itemDiv}>
                            <h1 className={styles.title}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={getTitle(currentGroup[3])}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {getTitle(currentGroup[3])}
                                    </motion.span>
                                </AnimatePresence>
                            </h1>
                            {currentGroup[3]?.link &&
                                <button className={styles.btnShop}>
                                    {t('startShopping')}
                                </button>}

                        </div>
                        <SafeImage
                            className={styles.img}
                            src={getImage(currentGroup[3])}
                            fallback="/FallbackProductImage.png"
                            alt={getTitle(currentGroup[3])}
                            width={200}
                            height={200}
                            loading="lazy"
                            // priority={i === 0}
                        />

                        {/*<Image*/}
                        {/*    className={styles.img}*/}
                        {/*    src={getImage(currentGroup[3])}*/}
                        {/*    alt={getTitle(currentGroup[3])}*/}
                        {/*    width={300}*/}
                        {/*    height={300}*/}
                        {/*    loading1="lazy"*/}
                        {/*/>*/}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DownSlider;
