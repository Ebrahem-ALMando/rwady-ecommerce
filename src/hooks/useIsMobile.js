import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 630) => {
    const [isMobile, setIsMobile] = useState(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        handleChange();

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [breakpoint]);

    return isMobile;
};
