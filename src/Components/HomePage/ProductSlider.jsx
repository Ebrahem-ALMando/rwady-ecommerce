
"use client";
import dynamic from "next/dynamic";
import ProductCardSlider from "@/Components/HomePage/ProductCardSlider";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const products = [
    {
        title: 'منتج 1',
        logo: '/logo.png',
        images: ['/images/img_1.png', '/images/img_1.png', '/images/img_1.png'],
        description: 'وصف المنتج 1',
        price: '5000 ل.س',
        status: 'available',
        stock: 10,
    },
    {
        title: 'منتج 2',
        logo: '/logo.png',
        images: ['/images/img_1.png', '/images/img_1.png', '/images/img_1.png'],
        description: 'وصف المنتج 2',
        price: '4000 ل.س',
        status: 'available',
        stock: 8,
    },
    {
        title: 'منتج 3',
        logo: '/logo.png',
        images: ['/images/img_1.png', '/images/img_1.png', '/images/img_1.png'],
        description: 'وصف المنتج 2',
        price: '4000 ل.س',
        status: 'available',
        stock: 8,
    },
    {
        title: 'منتج 4',
        logo: '/logo.png',
        images: ['/images/img_1.png', '/images/img_1.png', '/images/img_1.png'],
        description: 'وصف المنتج 2',
        price: '4000 ل.س',
        status: 'available',
        stock: 8,
    },
    {
        title: 'منتج 4',
        logo: '/logo.png',
        images: ['/images/img_1.png', '/images/img_1.png', '/images/img_1.png'],
        description: 'وصف المنتج 2',
        price: '4000 ل.س',
        status: 'available',
        stock: 8,
    },
];
const CustomPrevArrow = (props) => (
    <button {...props} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-blue-600 p-2 rounded-full">
        ❮
    </button>
);

const CustomNextArrow = (props) => (
    <button {...props} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-blue-600 p-2 rounded-full">
        ❯
    </button>
);

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:4, // عرض 5 صور في الشاشات الكبيرة
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3, // عند حجم الشاشة 1024، عرض 3 صور فقط
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
           style={
            {

                width:'100%'
                ,height:'auto'


            }
        } >
            <Slider
                style={
                    {

                        width:'100%'
                        ,height:'auto'



                    }
                }
                {...settings}>
            {products.map((product, index) => (
                <ProductCardSlider key={index} product={product} />
            ))}
            </Slider >

        </div>

    );
};

export default ProductSlider;

