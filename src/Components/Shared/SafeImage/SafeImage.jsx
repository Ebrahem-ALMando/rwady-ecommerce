"use client";
import Image from "next/image";
import { useState } from "react";

/**
 * @param {string} src
 * @param {string} fallback
 * @param {string} alt
 * @param {object} props
 */
const SafeImage = ({ src="/images/fallback.png", fallback = "/images/fallback.png", alt = "صورة", ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setImgSrc(fallback);
            setHasError(true);
        }
    };
        // if (!src) return null;
    return (
        <Image
            src={imgSrc||undefined}
            alt={alt}
            onError={handleError}
            onLoad={(result) => {
                if (result.naturalWidth === 0) {
                    handleError();
                }
            }}
            {...props}
        />
    );
};

export default SafeImage;
