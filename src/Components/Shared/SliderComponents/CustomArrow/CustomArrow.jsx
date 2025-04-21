import React from "react";
import stylesArrow from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow.module.css";

const CustomArrows = ({ type, activeArrow, onArrowClick, onClick }) => {
    const handleClick = (event) => {
        onClick?.(event);
        onArrowClick?.(type);
    };

    return (
        <button
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
