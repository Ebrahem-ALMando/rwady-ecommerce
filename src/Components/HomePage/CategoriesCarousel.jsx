"use client";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const slides = [
    { id: 1, title: "ملابس سفلية", image: "/images/img.png" },
    { id: 2, title: "أحذية", image: "/images/img_1.png" },
    { id: 3, title: "ملابس رجالية", image: "/images/img_1.png" },
    { id: 4, title: "عنوان 4", image: "/images/img_1.png"  },
    { id: 5, title: "عنوان 5", image: "/images/img_1.png" },
    { id: 6, title: "عنوان 6", image: "/images/img_1.png" }
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

const CategoriesCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // عرض 5 صور في الشاشات الكبيرة
        slidesToScroll: 1,
        autoplay: false,
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
        <div style={{ margin: '2rem 3rem 10rem 3rem', width: '88%', height: '25vh' }}>
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="flex flex-col items-center focus:outline-none focus-visible:outline-none"
                        style={{ display: 'flex' }}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-64 h-64 object-cover rounded-full border-0 border-blue-600 hover:border-4"
                        />
                        <h3 className="text-blue-600 text-center text-xl font-bold mt-4">{slide.title}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CategoriesCarousel;
