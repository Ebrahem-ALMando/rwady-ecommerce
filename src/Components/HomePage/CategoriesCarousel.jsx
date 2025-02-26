"use client";
import dynamic from "next/dynamic";
import React from "react";
const Slider = dynamic(() => import("react-slick"), {ssr: false});


const CustomPrevArrow = ({ currentSlide,slideCount, ...props }) => (
    <button {...props}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-blue-600 p-2 rounded-full">
        ❮
    </button>
);

const CustomNextArrow = ({ currentSlide,slideCount, ...props }) => (
    <button {...props}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-blue-600 p-2 rounded-full">
        ❯
    </button>
);


const CircleCartCarousel = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // عرض 5 صور في الشاشات الكبيرة
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>,
        responsive: [
            {
                breakpoint: 1286,
                settings: {
                    slidesToShow: 4, // عند حجم الشاشة 1024، عرض 3 صور فقط
                },
            },
            {
                breakpoint: 1095,
                settings: {
                    slidesToShow: 3,

                },
            },
            {
                breakpoint: 889,
                settings: {
                    slidesToShow: 2, // عند حجم الشاشة 889، عرض 2 صور فقط
                },
            },
            {
                breakpoint: 605,
                settings: {
                    slidesToShow: 1, // عند حجم الشاشة 605، عرض صورة واحدة فقط
                },
            },
        ],
    };

    return (
        <div

            style={{
                margin: 'auto auto 10rem auto',
                width: '95%',
                height: props.isCategory ? '25vh' : '45vh',
                background: props.bgColor,
                borderRadius: props.borderRadius,
                paddingTop: props.isCategory ? 0 : '2rem'

            }}>
            <Slider {...settings}>

                    {props.data.map((slide,index) => (
                                <div
                                    key={index}
                                    >


                                <div className="flex flex-col items-center justify-center focus:outline-none focus-visible:outline-none">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-64 h-64 object-cover rounded-full border-4 border-transparent hover:border-blue-600"
                                    />
                                    {props.isCategory && (
                                        <h3 className="text-blue-600 text-center text-xl font-bold mt-4">
                                            {slide.title}
                                        </h3>
                                    )}
                                </div>
                                </div>
                        ))}


            </Slider>
        </div>
    );
};

export default CircleCartCarousel;
