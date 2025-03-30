export const sliderSettings={
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        { breakpoint: 1286, settings: { slidesToShow: 3 } },
        { breakpoint: 1095, settings: { slidesToShow: 2 } },
        { breakpoint: 740, settings: { slidesToShow: 1 } },
    ],
}