"use client";

import styles from './CategoryCard.module.css';
import Link from "next/link";
import { memo, useEffect, useRef } from "react";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const CategoryCard = ({
                          id,
                          link = "#",
                          logo = "/images/img_10.png",
                          title = "بدون اسم",
                          setSelectedChild,
                          selectedChild,
                          category,

                      }) => {
    const cardRef = useRef(null);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        }, { threshold: 0.1 });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);


    const handleChange = () => {
        setSelectedChild(category)
    }
    return (
        // <Link
        //     href={link}
        //     className={styles.cardLink}
        //     aria-label={`رابط إلى ${title}`}
        //     prefetch={false}
        // >
            <div onClick={handleChange} className={`${styles.categoryCard} 
            ${id===selectedChild?.id?styles.select:''}
            
            `} ref={cardRef}>
                <div className={styles.imageWrapper}>
                    <SafeImage
                        fallback="/images/img_10.png"
                        src={logo||"/images/img_10.png"}
                        alt={`${title} Img` || "IMG"}
                        width={120}
                        height={120}
                        className={styles.image}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <h3 className={styles.name}>{title}</h3>
                <span className={styles.hoverEffect}></span>
            </div>
        // </Link>
    );
};

export default memo(CategoryCard);