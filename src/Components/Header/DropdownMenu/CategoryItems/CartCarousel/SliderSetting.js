export const sliderSetting  = {
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 5000,
            settings: {
                slidesToShow: 5,
            },
            breakpoint: 1800,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 1286,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 1244,
            settings: {
                slidesToShow: 3,

            },
        },
        {
            breakpoint: 1095,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 630,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};