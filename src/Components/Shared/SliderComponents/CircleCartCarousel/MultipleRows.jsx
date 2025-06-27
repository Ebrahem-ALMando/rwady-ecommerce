'use client'
import React from "react";
import Slider from "react-slick";

function MultipleRows() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow:2
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>


            </Slider>
        </div>
    );
}

export default MultipleRows;
