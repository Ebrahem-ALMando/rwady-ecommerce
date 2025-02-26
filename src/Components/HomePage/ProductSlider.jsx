"use client";
import dynamic from "next/dynamic";
import ProductCardSlider from "@/Components/HomePage/ProductCardSlider";
import React, { useEffect } from "react"; // ✅ تم تصحيحه
import "./ProductSlider.module.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const products = [
    {
        id: 1,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند 2Brshka",
        logo: "/logo.png",
    },
    {
        id: 2,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند1 Brshka",
        logo: "/logo.png",
    },
    {
        id: 2,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند3s3 Brshka",
        logo: "/logo.png",
    },
    {
        id: 2,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند4 Brshka",
        logo: "/logo.png",
    }
];

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

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            { breakpoint: 1286, settings: { slidesToShow: 3 } },
            { breakpoint: 1095, settings: { slidesToShow: 2 } },
            { breakpoint: 740, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <div style={{ margin: 'auto auto 10rem auto', width: '95%' }}>
            <Slider {...settings}>
                {products.map((slide, index) => (
                    <ProductCardSlider key={index} product={slide} />
                ))}
            </Slider>
        </div>
    );
};

export default ProductSlider;
