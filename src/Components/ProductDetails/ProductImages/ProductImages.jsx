// "use client";
// import { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, FreeMode } from "swiper/modules";
// import Lightbox from "yet-another-react-lightbox";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/free-mode";
// import "yet-another-react-lightbox/styles.css";
// import Image from "next/image";
// import { Maximize2 } from "lucide-react";
// import styles from "./ProductImages.module.css";
// import './ProductImages.css';
//
// const ProductImages = ({ images }) => {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [lightboxOpen, setLightboxOpen] = useState(false);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const mainSwiperRef = useRef(null);
//     const [swiperDirection, setSwiperDirection] = useState("vertical");
//
//     useEffect(() => {
//         const handleResize = () => {
//             setSwiperDirection(window.innerWidth < 768 ? "horizontal" : "vertical");
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);
//
//     return (
//         <div className={styles.container}>
//             <Swiper
//                 ref={mainSwiperRef}
//                 spaceBetween={10}
//                 navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
//                 thumbs={{ swiper: thumbsSwiper }}
//                 modules={[Navigation, Thumbs, FreeMode]}
//                 className={styles.mainSwiper}
//                 onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
//             >
//                 {images.map((img, index) => (
//                     <SwiperSlide key={index}>
//                         <Image
//                             src={img.url}
//                             alt={`صورة المنتج رقم ${index + 1}`}
//                             width={500}
//                             height={500}
//                             className="object-cover w-full h-full"
//                             priority={index === 0}
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//
//             <Swiper
//                 simulateTouch={false}
//                 onSwiper={setThumbsSwiper}
//                 spaceBetween={12}
//                 slidesPerView={4}
//                 direction={swiperDirection}
//                 modules={[Thumbs, FreeMode]}
//                 freeMode={true}
//                 watchSlidesProgress={true}
//                 className={styles.thumbnailSwiper}
//             >
//                 {images.map((img, index) => (
//                     <SwiperSlide
//                         key={index}
//                         className={`${styles.thumbnailSlide} ${currentIndex === index ? styles.active : ""}`}
//                         onClick={() => mainSwiperRef.current?.swiper.slideTo(index)}
//                     >
//                         <Image
//                             src={img.url}
//                             alt={`صورة مصغرة رقم ${index + 1}`}
//                             width={120}
//                             height={120}
//                             className="object-cover w-full h-full"
//                         />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//
//             <button
//                 aria-label="تكبير الصورة"
//                 className={styles.maximizeButton}
//                 onClick={() => setLightboxOpen(true)}
//             >
//                 <Maximize2 size={24} />
//             </button>
//
//             <Lightbox
//                 className={styles.lightbox}
//                 open={lightboxOpen}
//                 close={() => setLightboxOpen(false)}
//                 index={currentIndex}
//                 slides={images.map((img, index) => ({ key: index, src: img.url }))}
//                 carousel={{ finite: true }}
//                 controller={{ closeOnBackdropClick: true }}
//             />
//         </div>
//     );
// };
//
// export default ProductImages;

"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/free-mode";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Maximize2, PlayCircle } from "lucide-react";
import styles from "./ProductImages.module.css";
import './ProductImages.css';
import { useTranslations } from "next-intl";

const ProductImages = ({ images }) => {
    const t = useTranslations('ProductDetails');
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const mainSwiperRef = useRef(null);
    const [swiperDirection, setSwiperDirection] = useState("vertical");

    useEffect(() => {
        const handleResize = () => {
            setSwiperDirection(window.innerWidth < 768 ? "horizontal" : "vertical");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const extractYouTubeId = (url) => {
        const regExp = /(?:youtube\.com.*(?:\\?|&)v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };
    const getYouTubeThumbnail = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
    };

    return (
        <div className={styles.container}>
            <Swiper
                ref={mainSwiperRef}
                spaceBetween={10}
                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs, FreeMode]}
                className={styles.mainSwiper}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
                {images.map((media, index) => (
                    <SwiperSlide key={index}>
                        {media.type === "video" && media.source === "link" ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeId(media.url)}`}
                                className="w-full h-full rounded-md"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : media.type === "video" ? (
                            <video
                                src={media.url}
                                controls
                                className="w-full h-full object-cover bg-black rounded-md"
                                preload="metadata"
                            />
                        ) : (
                            <Image
                                src={media.url}
                                alt={t("mediaAlt", { index: index + 1 })}
                                width={500}
                                height={500}
                                className="object-cover w-full h-full"
                                priority={index === 0}
                            />
                        )}

                    </SwiperSlide>
                ))}
            </Swiper>


            <Swiper
                simulateTouch={false}
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                direction={swiperDirection}
                modules={[Thumbs, FreeMode]}
                freeMode={true}
                watchSlidesProgress={true}
                className={styles.thumbnailSwiper}
            >
                {images.map((media, index) => (
                    <SwiperSlide
                        key={index}
                        className={`${styles.thumbnailSlide} ${currentIndex === index ? styles.active : ""}`}
                        onClick={() => mainSwiperRef.current?.swiper.slideTo(index)}
                    >
                        {media.type === "video" ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={
                                        media.source === "link"
                                            ? getYouTubeThumbnail(media.url) || "/images/video-placeholder.jpg"
                                            : media.thumbnail || "/images/video-placeholder.jpg"
                                    }
                                    alt={t("videoThumbnailAlt", { index: index + 1 })}
                                    width={500}
                                    height={500}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={48} className="text-white" />
                                </div>
                            </div>
                        ) : (
                            <Image
                                src={media.url}
                                alt={t("mediaAlt", { index: index + 1 })}
                                width={500}
                                height={500}
                                className="object-cover w-full h-full"
                            />
                        )}

                    </SwiperSlide>
                ))}
            </Swiper>
            {!(images[currentIndex].source === "link" && images[currentIndex].type === "video") && (
                <div className={styles.max}>
                    <button
                        aria-label={t("maximize")}
                        className={styles.maximizeButton}
                        onClick={() => setLightboxOpen(true)}
                    >
                        <Maximize2 size={24}/>
                    </button>
                </div>
            )}


            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={images
                    .filter((media) => media.type !== "video")
                    .findIndex((media) => media.url === images[currentIndex]?.url)}
                slides={images
                    .filter((media) => media.type !== "video")
                    .map((media) => ({
                        src: media.url,
                    }))}
                carousel={{ finite: true }}
                controller={{ closeOnBackdropClick: true }}
            />

        </div>
    );
};

export default ProductImages;
