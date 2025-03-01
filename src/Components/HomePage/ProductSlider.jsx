"use client";
import dynamic from "next/dynamic";
import ProductCardSlider from "@/Components/HomePage/ProductCardSlider";
import React, { useState } from "react"; // ✅ تم تصحيحه
import "./ProductSlider.module.css";
import CustomArrows from "./CustomArrow";

import stylesArrow from "./CustomArrow.module.css";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const products = [
    {
        id: 1,
        isDiscount: true,
        isFavorite:true,
        title: "زولاي كيتشن مسند ادوات مائدة من السيليكون - خالي من البيسفينول",
        images: ["/images/p2.png", "/images/p2.png", "/images/p2.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "اشتري بالاقساط 5000 د.ع / شهر لمدة 10 اشهر",
        brand: "PHILIPS",
        colors:[
            '#E41E1E',
            '#008CFF',
            '#07AD5D',
            '#FEAF3F',
        ],
        remaining:'باقى 9 وحدات متبقية',
        time:'143H : 60 M : 55 S'
    },
    {
        id: 2,
        isDiscount: false,
        isFavorite:false,
        title: "زولاي كيتشن مسند ادوات مائدة من السيليكون - خالي من البيسفينول",
        images: [
            "/images/p1.png",
            "/images/p1.png",
            "/images/p1.png",],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "اشتري بالاقساط 5000 د.ع / شهر لمدة 10 اشهر",
        brand: "PHILIPS",
        colors:[
            '#E41E1E',
            '#008CFF',
            '#07AD5D',
            '#FEAF3F',
        ],
        remaining:'باقى 9 وحدات متبقية',
        time:'143H : 60 M : 55 S'
    },
    {
        id: 2,
        isDiscount: false,
        isFavorite:true,
        title: "زولاي كيتشن مسند ادوات مائدة من السيليكون - خالي من البيسفينول",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "اشتري بالاقساط 5000 د.ع / شهر لمدة 10 اشهر",
        brand: "PHILIPS",
        colors:[
            '#E41E1E',
            '#008CFF',
            '#07AD5D',
            '#FEAF3F',
        ],
        remaining:'باقى 9 وحدات متبقية',
        time:'143H : 60 M : 55 S'
    },
    {
        id: 2,
        isDiscount: true,
        isFavorite:false,
        title: "زولاي كيتشن مسند ادوات مائدة من السيليكون - خالي من البيسفينول",
        images: ["/images/img_1.png", "/images/img_1.png", "/images/img_1.png"],
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "اشتري بالاقساط 5000 د.ع / شهر لمدة 10 اشهر",
        brand: "PHILIPS",
        colors:[
            '#E41E1E',
            '#008CFF',
            '#07AD5D',
            '#FEAF3F',
        ],
        remaining:'باقى 9 وحدات متبقية',
        time:'143H : 60 M : 55 S'
    }
];



const ProductSlider = () => {

    const [activeArrow, setActiveArrow] = useState(null);
    const handleArrowClick = (type) => {
        setActiveArrow(type);
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
            { breakpoint: 1286, settings: { slidesToShow: 3 } },
            { breakpoint: 1095, settings: { slidesToShow: 2 } },
            { breakpoint: 740, settings: { slidesToShow: 1 } },
        ],
    };


    return (
        <div style={{ margin: 'auto auto 3rem auto', width: '95%' }}>
            <Slider {...settings}>
                {products.map((slide, index) => (
                    <ProductCardSlider key={index} product={slide} />
                ))}
            </Slider>
        </div>
    );
};

export default ProductSlider;
