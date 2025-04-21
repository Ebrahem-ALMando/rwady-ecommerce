import styles from './CategoryCard.module.css';
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const CategoryCard = ({
                          link = "#",
                          logo = "/placeholder.jpg",
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
                <Image
                    src={logo || "/placeholder.jpg"}
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
