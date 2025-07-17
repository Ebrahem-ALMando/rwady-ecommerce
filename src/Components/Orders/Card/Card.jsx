// "use client";
// import styles from './Card.module.css';
// import { Eye } from "lucide-react";
// import Link from "next/link";
// import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
//
// const Card = (props) => {
//     const slug = props.title?.replace(/\s+/g, '-').toLowerCase();
//
//     return (
//         <div className={`${styles.productCard} ${props.visible ? '' : styles.productCardState}`}>
//             <div className={styles.productImg}>
//                 <SafeImage
//                     src={props.image}
//                     fallback="/images/Shopping/img.png"
//                     alt={props.title}
//                     width={100}
//                     height={100}
//                     className={styles.productImage}
//                 />
//             </div>
//
//             <div className={styles.productItem}>
//                 <div className={styles.titleRow}>
//                     <h4 className={styles.title}>
//                         {props.title}
//                     </h4>
//
//                     {props.link && (
//                         <Link href={props.link} className={styles.viewProductBtn}>
//                             <Eye size={16} />
//                             <span>تفاصيل المنتج</span>
//                         </Link>
//                     )}
//
//                 </div>
//
//                 <p className={styles.brand}>
//                     {props.brand}
//                 </p>
//             </div>
//
//             {/* تم تعليق التفاعل القديم:
//             {props.visible && (
//                 <div className={styles.productDetails}>
//                     {!props.isCanceled ? (
//                         <p className={styles.titleDetails}>
//                             شاركنا تجربتك
//                         </p>
//                     ) : null}
//
//                     <div className={styles.buttons}>
//                         {!props.isCanceled ? (
//                             <>
//                                 <button>التوصيل</button>
//                                 <button>المنتج</button>
//                                 <button>البائع</button>
//                             </>
//                         ) : (
//                             <span>
//                                 <button>تابع الإرجاع</button>
//                                 {LeftArrowIcon}
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             )}
//             */}
//         </div>
//     );
// };
//
// export default Card;


"use client";
import styles from './Card.module.css';
import { Eye } from "lucide-react";
import Link from "next/link";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import { useTranslations } from "next-intl";

const Card = (props) => {
   const {t}=props
    const slug = props.title?.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className={`${styles.productCard} ${props.visible ? '' : styles.productCardState}`}>
            <div className={styles.productImg}>
                <SafeImage
                    src={props.image}
                    fallback="/FallbackProductImage.png"
                    alt={props.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={styles.productImage}
                />

            </div>

            <div className={styles.productItem}>
                <div className={styles.titleRow}>
                    <h4 className={styles.title}>{props.title}</h4>

                    {props.link && (
                        <Link prefetch={true} href={props.link} className={styles.viewProductBtn}>
                            <Eye size={16} />
                            <span>{t("details.viewProduct")}</span>
                        </Link>
                    )}
                </div>

                {Array.isArray(props.brands) && props.brands.length > 0 && (
                    <div className={styles.brandsRow}>
                        {props.brands.map((brand, index) => (
                            <span key={index} className={styles.brandBadge}>
                                {brand}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
