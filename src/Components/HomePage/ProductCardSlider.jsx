"use client";
import dynamic from "next/dynamic";
import { Heart, ShoppingCart } from "lucide-react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const products = [
    {
        id: 1,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: [
            "/images/img_1.png",
            "/images/img_1.png",
            "/images/img_1.png",
        ], // ✅ الآن لدينا أكثر من صورة للسلايدر
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند Brshka",
        logo: "/logo.png",
    },
    {
        id: 2,
        title: "ستانلي كوب H2.0 بمقبض وماصة 30 اونصة | غطاء دوار ثلاثي",
        images: [
            "/images/img_1.png",
            "/images/img_1.png",
            "/images/img_1.png",
        ], // ✅ الآن لدينا أكثر من صورة للسلايدر
        price: "20,258 IQD",
        oldPrice: "22,258 IQD",
        available: "متاح قسط 500 شهريًا",
        brand: "براند Brshka",
        logo: "/logo.png",
    }
];

const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

};

const ProductCardSlider = (props) => {
    return (
        <div
            style={{

                height:'auto',
                direction:'rtl'
            }}
            className="p-6 ">
            <div
                className=" w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow relative">
                <div
                    className="absolute top-2 left-0 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    وفر 250 الف
                </div>

                <div
                    className="absolute top-2 right-0 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    الأكثر مبيعًا
                </div>

                <div className="relative w-full h-60">
                    <Slider {...settings}>
                        {props.product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`}
                                 className="w-full h-full object-cover"/>
                        ))}
                    </Slider>
                    <div
                        style={{
                            bottom: '-50px',
                            left: '10px'
                        }}
                        className="absolute flex flex-col gap-2"
                    >
                        <button className="bg-white p-2 rounded-full shadow">
                            <Heart size={18} className="text-blue-700"/>
                        </button>
                        <button className="bg-white p-2 rounded-full shadow">
                            <ShoppingCart size={18} className="text-blue-700"/>
                        </button>
                    </div>

                </div>
                <div className="p-4 mt-10">
                    <div className="flex justify-between items-center mb-2 mt-10 ">
                        <span className="text-sm text-gray-500">{props.product.brand}</span>
                        <img src={props.product.logo} alt="logo" className="h-10"/>
                    </div>
                    <h3 className="text-blue-900 text-md font-bold mb-2">{props.product.title}</h3>

                    <p
                        style={{
                            direction: 'ltr',
                            textAlign: 'right',
                        }}
                        className="text-red-600 text-lg font-bold"
                    >
                        {props.product.price}
                        <del
                            className="text-blue-700 text-sm mx-2"
                                            >
                            {props.product.oldPrice}
                        </del>
                    </p>


                    <p className="text-sm text-gray-600 mt-1">{props.product.available}</p>
                    <div className="flex items-center space-x-2 text-gray-600 mt-3">
                        <span>+2</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSlider;
