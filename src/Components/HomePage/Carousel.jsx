"use client"; // أضف هذا إذا كنت تستخدم Next.js 13+
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
const slides = [
    {
        id: 1,
        title: "اكتشف كل ما هو جديد",
        description: ".عـــــــــــــــــــــــروض على جميع المنتجات",
        image: "/Home/slider1.png",
    },
    {
        id: 2,
        title: "اكتشف كل ما هو جديد",
        description: ".عـــــــــــــــــــــــروض على جميع المنتجات.",
        image:"/Home/slider1.png",
    },
    {
        id: 3,
        title: "عروض لا تفوت",
        description: "!احصل على أفضل العروض اليوم",
        image: "/Home/slider1.png",
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

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div style={
            {
                width:'88%',
                height:'50vh'
            }
        } className=" mx-auto mt-4 rtl">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        <img src={slide.image} alt={slide.title} className="w-full h-96 object-cover rounded-lg"/>
                        <div
                            className=" absolute inset-0 bg-opacity-50 flex flex-col items-end justify-center text-white text-right p-8 mr-5">
                            <h2 className="text-3xl font-bold">{slide.title}</h2>
                            <p className="blur-1 text-4xl my-2">{slide.description}</p>
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