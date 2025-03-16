"use client";
import {useState, useRef, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import styles from "./ProductImages.module.css";
import './ProductImages.css'

const ProductImages = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const mainSwiperRef = useRef(null);
    const [swiperDirection, setSwiperDirection] = useState("vertical");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSwiperDirection("horizontal"); // تغيير الاتجاه إلى أفقي
            } else {
                setSwiperDirection("vertical"); // العودة إلى الاتجاه العمودي
            }
        };

        // استدعاء دالة تغيير الاتجاه عند تحميل الصفحة
        handleResize();

        // الاستماع للتغيرات في حجم النافذة
        window.addEventListener("resize", handleResize);

        // تنظيف المستمع عند فك التثبيت
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className={styles.container}>
            <Swiper

                ref={mainSwiperRef}
                spaceBetween={10}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs, FreeMode]}
                className={styles.mainSwiper}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={img.original}
                            alt="Product Image"
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                            priority={index === 0}
                        />
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
                {images.map((img, index) => (
                    <SwiperSlide
                        key={index}
                        className={`${styles.thumbnailSlide} ${
                            currentIndex === index ? styles.active : ""
                        }`}
                        onClick={() => mainSwiperRef.current?.swiper.slideTo(index)}
                    >
                        <Image
                            src={img.thumbnail}
                            alt="Thumbnail"
                            width={120}
                            height={120}
                            className="object-cover w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                className={styles.maximizeButton}
                onClick={() => setLightboxOpen(true)}
            >
                <Maximize2 size={24} />
            </button>

            <Lightbox
                className={styles.lightbox}
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={currentIndex}
                slides={images.map((img,index) => ({ key:index,src: img.original }))}
                carousel={{ finite: true }}
                controller={{ closeOnBackdropClick: true }}
            />
        </div>
    );
};

export default ProductImages;