"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export const isValidSrc = (src) => {
    return !!src && typeof src === "string" && src.trim() !== "";
};

const SafeImage = ({
                       src,
                       fallback = "/images/fallback.png",
                       alt = "صورة",
                       offOnerror = false,
                       ...props
                   }) => {
    const [imgSrc, setImgSrc] = useState(isValidSrc(src) ? src : fallback);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setImgSrc(fallback);
            setHasError(true);
        }
    };

    useEffect(() => {
        if (isValidSrc(src)) {
            setImgSrc(src);
            setHasError(false);
        } else {
            setImgSrc(fallback);
        }
    }, [src]);

    return (
        <Image
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onTouchStart={props.onTouchStart}
            onTouchEnd={props.onTouchEnd}
            src={imgSrc}
            alt={alt}
            decoding="async"
            {...props}
            {...(!offOnerror && { onError: handleError })}
        />
    );
};

export default SafeImage;
