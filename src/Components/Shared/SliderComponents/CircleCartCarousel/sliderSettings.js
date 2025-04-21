

export const sliderSettings  = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // عرض 5 صور في الشاشات الكبيرة
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1286,
            settings: {
                slidesToShow: 4,
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
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 605,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
