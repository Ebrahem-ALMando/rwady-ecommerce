

export const mainDivMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: {
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.04,
            },
        },
    },
};

export const itemMotionVariants = {
    hidden: {
        opacity: 0,
        y: 25,
        scale: 0.95,
        rotate: -2,
        filter: "blur(6px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        boxShadow: "0 0 20px rgba(0, 128, 255, 0.15)",
    },
    exit: {
        opacity: 0,
        y: -25,
        scale: 0.95,
        rotate: 2,
        filter: "blur(6px)",
    },
};

export const itemTransition = {
    type: "spring",
    stiffness: 120,
    damping: 12,
    duration: 0.5,
};
