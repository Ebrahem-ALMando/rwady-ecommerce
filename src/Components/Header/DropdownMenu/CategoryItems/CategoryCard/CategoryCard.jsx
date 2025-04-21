import styles from './CategoryCard.module.css';
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const CategoryCard = ({
                          link = "#",
                          logo = "/images/img_10.png",
                          title = "بدون اسم"
                      }) => {
    return (
        <Link
            href={link}
            className={styles.cardLink}
            aria-label={`رابط إلى ${title}`}
            prefetch={false}
        >
            <div className={styles.categoryCard}>
                <SafeImage
                    fallback="/images/img_10.png"
                    src={logo}
                    alt={`${title} Img`||"IMG"}
                    width={120}
                    height={120}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                />
                <h3 className={styles.name}>{title}</h3>
            </div>
        </Link>
    );
};

export default memo(CategoryCard);
