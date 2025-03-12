"use client";
import dynamic from "next/dynamic";
import  styles from './ProductCardSlider.module.css'
const Slider = dynamic(() => import("react-slick"), { ssr: false });
const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    appendDots: dots => (
        <ul className={styles.slickDots}>
            {dots.map((dot, index) => (
                <li key={index} className={dot.props.className.includes("slick-active") ? styles.slickActive : styles.slickDot}>
                    {dot}
                </li>
            ))}
        </ul>
    )
};
const ProductCardSlider = (props) => {
    return (
        <div
            className="p-2 ">
            <div
            className={styles.card}
            >
                {props.product.isDiscount ?
                    <div
                        className={` absolute top-2 left-0  text-white  font-bold ${styles.saveSeller}`}>
                        وفر 250 الف
                    </div>
                    :null
                }
                <div
                    className={`absolute top-2 right-0  text-white    font-bold ${styles.bestSeller}`}>
                الأكثر مبيعًا
                </div>
                <div className="relative w-full h-60">
                    <Slider {...settings}>
                        {props.product.images.map((image, index) => (
                            <div key={index}>
                                <div className={styles.productImgDiv}>
                                    <img  src={image} alt={`Product Image ${index + 1}`}
                                         className={styles.productImg}/>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div
                        style={{
                            bottom: '-50px',
                            left: '10px'
                        }}
                        className="absolute flex flex-col gap-2"
                    >
                        <div className={styles.iconImage}>
                            <p>
                                (50)
                            </p>
                            <button className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"
                                        fill={props.product.isFavorite ? '#E41E1E' : 'none'}
                                        stroke={props.product.isFavorite ? '' : '#0741AD'}
                                        strokeWidth="1"
                                    />
                                </svg>
                            </button>

                        </div>
                        <div className={styles.iconImage}>
                            <p>
                                ( x1 )
                            </p>
                            <button className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14.4279 2.10575C14.9218 1.85876 15.5225 2.05899 15.7695 2.55296L18.118 7.24996L20.0947 7.24996C20.3867 7.24995 20.6428 7.24994 20.8534 7.26431C21.0734 7.27932 21.3088 7.31293 21.5393 7.41455C21.927 7.58549 22.2236 7.84734 22.4088 8.19161C22.5869 8.52276 22.6298 8.87024 22.6244 9.16751C22.6191 9.46283 22.565 9.75159 22.5111 9.99258C22.4806 10.1287 22.3769 10.5616 22.3617 10.6252L22.3601 10.6317L22.358 10.6412C22.275 11.0224 22.0164 11.3301 21.678 11.4908C21.3085 11.6661 21.0677 11.9888 21.0055 12.3431L20.9861 12.4555C20.9231 12.8215 20.8916 13.0045 20.8269 13.0195C20.7622 13.0345 20.6421 12.8685 20.4019 12.5364C19.9477 11.9085 19.209 11.5 18.3748 11.5C16.9941 11.5 15.8748 12.6192 15.8748 14L15.8748 14.4C15.8748 14.6828 15.8748 14.8242 15.787 14.9121C15.6991 15 15.5577 15 15.2748 15L14.8748 15C13.4941 15 12.3748 16.1192 12.3748 17.5C12.3748 18.8807 13.4941 20 14.8748 20L15.2748 20C15.5577 20 15.6991 20 15.787 20.0878C15.8748 20.1757 15.8748 20.3171 15.8748 20.6L15.8748 21C15.8748 21.3444 15.8748 21.5167 15.8066 21.5997C15.7955 21.6132 15.7881 21.6209 15.7751 21.6326C15.695 21.7043 15.5576 21.7102 15.2827 21.7219C14.6236 21.75 13.864 21.75 12.99 21.75L10.7597 21.75C9.42472 21.75 8.35653 21.75 7.50563 21.6498C6.627 21.5465 5.88894 21.3281 5.25939 20.827L5.25652 20.8247C4.41846 20.151 4.01686 19.17 3.78442 18.2651C3.62767 17.6548 3.52845 16.9807 3.4438 16.4056L2.74422 12.3431C2.682 11.9888 2.44123 11.6661 2.07173 11.4908C1.73327 11.3301 1.47472 11.0224 1.39165 10.6412L1.38957 10.6317L1.38802 10.6252C1.37278 10.5616 1.26905 10.1287 1.23861 9.99258C1.1847 9.75159 1.1306 9.46283 1.12528 9.16751C1.11992 8.87024 1.16276 8.52276 1.3409 8.1916C1.52609 7.84734 1.82266 7.5855 2.21039 7.41455C2.44087 7.31293 2.67631 7.27932 2.89633 7.26431C3.10688 7.24994 3.363 7.24995 3.65498 7.24996L6.92432 7.24996L8.95894 2.59939C9.18031 2.09341 9.76994 1.86269 10.2759 2.08405C10.7819 2.30542 11.0126 2.89505 10.7913 3.40103L9.10735 7.24996L15.8819 7.24996L13.9806 3.44739C13.7336 2.95341 13.9339 2.35274 14.4279 2.10575ZM9.12484 12C9.12484 11.5857 9.46063 11.25 9.87484 11.25L13.8748 11.25C14.2891 11.25 14.6248 11.5857 14.6248 12C14.6248 12.4142 14.2891 12.75 13.8748 12.75L9.87484 12.75C9.46063 12.75 9.12484 12.4142 9.12484 12Z"
                                          fill="#0741AD"/>
                                    <path
                                        d="M19.3748 14C19.3748 13.4477 18.9271 13 18.3748 13C17.8226 13 17.3748 13.4477 17.3748 14L17.3748 16.5L14.8748 16.5C14.3226 16.5 13.8748 16.9477 13.8748 17.5C13.8748 18.0522 14.3226 18.5 14.8748 18.5L17.3748 18.5L17.3748 21C17.3748 21.5522 17.8226 22 18.3748 22C18.9271 22 19.3748 21.5522 19.3748 21L19.3748 18.5L21.8748 18.5C22.4271 18.5 22.8748 18.0522 22.8748 17.5C22.8748 16.9477 22.4271 16.5 21.8748 16.5L19.3748 16.5L19.3748 14Z"
                                        fill="#0741AD"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
                <div className={styles.infoCard}>
                    <div className=" mb-2 ">
                        <span className={styles.brand}>{props.product.brand}</span>
                    </div>
                    <h3 className={styles.title}>{props.product.title}</h3>
                    <p
                        className={styles.price}
                    >
                        {props.product.price}
                        <del
                            className={styles.oldPrice}
                        >
                            {props.product.oldPrice}
                        </del>
                    </p>
                    <p className={styles.available}>
                        <span className={styles.availableIcon}>
                            <img
                                src={'images/img_6.png'}
                                alt={''}
                            />
                        </span>
                        {props.product.available}
                    </p>
                    <div className={styles.colorButtons}>
                        {
                            props.product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    style={{
                                        background: color
                                    }}
                                    className={styles.colorButton}>

                                </button>
                            ))
                        }
                    </div>
                    <div className={styles.outherDetails}>
                        <p className={styles.remaining}>
                        <span className={styles.remainingIcon}>
                            <img
                                src={'images/img_7.png'}
                                alt={''}
                            />
                        </span>
                            {props.product.remaining}
                        </p>
                        {props.product.isDiscount ?
                            <div className={styles.time}>
                                <p className={styles.timeText}>
                        <span className={styles.timeIcon}>
                            <img
                                src={'images/img_8.png'}
                                alt={''}
                            />
                        </span>
                                    {props.product.time}
                                </p>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSlider;
