"use client";
import dynamic from "next/dynamic";
import React, {useState} from "react";
import CustomArrows from "@/Components/HomePage/CustomArrow";
const Slider = dynamic(() => import("react-slick"), {ssr: false});
const CircleCartCarousel = (props) => {
    const [activeArrow, setActiveArrow] = useState(null);
    const handleArrowClick = (type) => {
        setActiveArrow(type);
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // عرض 5 صور في الشاشات الكبيرة
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomArrows
            type="prev"
            activeArrow={activeArrow}
            onArrowClick={handleArrowClick}

        />,
        nextArrow: <CustomArrows
            type={"next"}
            activeArrow={activeArrow}
            onArrowClick={handleArrowClick}
        />,
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
                margin: 'auto auto 2rem auto',
                width: '95%',
                height: 'auto',
                background: props.bgColor,
                borderRadius: props.borderRadius,
                padding: props.isCategory ? 0 : '4rem 1rem 4rem 1rem'


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
