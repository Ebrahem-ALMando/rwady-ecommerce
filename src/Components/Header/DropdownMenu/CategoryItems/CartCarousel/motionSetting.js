export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0,
            staggerChildren: 0.06,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0.6, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.15, ease: "easeIn" },
    },
};