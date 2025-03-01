import React from "react";
import stylesArrow from "@/Components/HomePage/CustomArrow.module.css";

const CustomArrows = ({ currentSlide,slideCount, ...props }) => {
    const { type, activeArrow, onArrowClick } = props;

    const handleClick = (event) => {
        props.onClick?.(event);
        onArrowClick(type);
    };

    return (
        <button
            {...props}
            onClick={handleClick}
            className={`absolute top-[45%] transform -translate-y-[55%] z-10 text-white 
                ${stylesArrow.customButton} ${type === "prev" ? stylesArrow.prev : stylesArrow.next} 
                ${activeArrow === type ? stylesArrow.active : ""}`}
        >
            {type === "prev" ? '❮' : '❯'}
        </button>
    );
};

export default CustomArrows;
