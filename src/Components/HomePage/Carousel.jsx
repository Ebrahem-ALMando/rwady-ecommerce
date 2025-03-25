"use client";
import useSWR from "swr";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import {getTopSlider} from "@/api/services/topSlider";
import {useEffect} from "react";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
const staticSlides = [
    {
        id: 1,
        title: "اكتشف كل ما هو جديد",
        description: ".عـــــــــــــــــــــــروض على جميع المنتجات",
        img: "/Home/slider1.png",
    },
    {
        id: 2,
        title: "اكتشف كل ما هو جديد",
        description: ".عـــــــــــــــــــــــروض على جميع المنتجات.",
        img:"/Home/slider1.png",
    },
    {
        id: 3,
        title: "عروض لا تفوت",
        description: "!احصل على أفضل العروض اليوم",
        img: "/Home/slider1.png",
    },
];

const CustomPrevArrow = ({ currentSlide,slideCount, ...props }) => (
    <button {...props}
            className={`
            ${styles.prevArrow} ${styles.arrow}`}>
        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11 9.51793V2.48207C11 0.938492 9.32557 -0.0232517 7.99226 0.754514L1.96153 4.27244C0.638517 5.0442 0.638515 6.9558 1.96153 7.72756L7.99226 11.2455C9.32557 12.0232 11 11.0615 11 9.51793Z"
                fill="white"/>
        </svg>
    </button>
);

const CustomNextArrow = ({currentSlide, slideCount, ...props}) => (
    <button {...props}
            className={`
            ${styles.nextArrow} ${styles.arrow}`}>
        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 9.51793V2.48207C0 0.938492 1.67443 -0.0232517 3.00774 0.754514L9.03847 4.27244C10.3615 5.0442 10.3615 6.9558 9.03847 7.72756L3.00774 11.2455C1.67443 12.0232 0 11.0615 0 9.51793Z"
                fill="white"/>
        </svg>
    </button>
);

const styleAppendDots = {
    display: "flex",
    gap: "5px",
    padding: "5px 10px",
    justifyContent:'end',

};

const Carousel = () => {

    // const {data:slider,error,isLoading}=useSWR("topSlider",getTopSlider)
    //
    // if (isLoading) return <p>جارٍ التحميل...</p>;
    // if (error) return <p>حدث خطأ أثناء تحميل البيانات</p>;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>,
        appendDots: dots => (
            <div
                style={
                    styleAppendDots
                }
            >
                <ul className={
                    styles.slickDots
                }>
                    <svg className={styles.svg} width="150" height="51" viewBox="0 0 180 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.1051 6.59074C17.5398 2.63461 21.2978 0 25.506 0H159.51C164.144 0 168.172 3.18471 169.24 7.69464L179.5 51H0L16.1051 6.59074Z"
                            fill="#F7F7F7"/>

                    </svg>
                    <span className={styles.appendDotSpan}>
                       {dots.map((dot, index) => {
                           const isActive = dot.props.className.includes("slick-active");
                           return (
                               <li key={index} className={`${isActive ? styles.slickActive : ''} ${styles.slickDot}`}>
                                   {dot}
                               </li>
                           );
                       })}
                    </span>
                </ul>
            </div>
        ),
        customPaging: i => (
            <div

                className={
                    styles.slickBtn
                }
            >
            </div>
        )
    };

    return (
        <div
         className={`${styles.container}  mx-auto mt-4 rtl`}>
            <Slider {...settings}>
                {staticSlides?.map((slide) => (
                    <div key={slide.id} className="relative">
                        <img src={slide.img} alt={slide.title} className="w-full min-h-96 object-cover rounded-lg"/>
                        <div
                            className={` absolute inset-0 bg-opacity-50 flex flex-col items-end justify-center text-white text-right p-8 ${styles.text}`}>
                            <h2 className="text-3xl font-bold">{slide.title}</h2>
                            <p className={`blur-1 text-4xl my-2  ${styles.description}`}>{slide.description}</p>
                            <div className="w-full flex justify-end mr-20">
                                <button
                                    className=" mt-4 mr-5  bg-white text-blue-600 px-6 py-2 rounded-lg  hover:bg-gray-400 w-auto ">
                                    أبدأ تسوق الان
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;