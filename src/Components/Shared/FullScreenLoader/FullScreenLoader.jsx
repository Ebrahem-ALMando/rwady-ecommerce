"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FullScreenLoader.module.css";

const FullScreenLoader = ({ duration = 2000 }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timeout);
    }, [duration]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={styles.loaderContainer}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{type: "spring", stiffness: 120}}
                    >
                        <div className={styles.orbitalRing}/>

                        {/* رمز 🌀 متحرك داخل div */}

                        <div className={styles.emoji}>
                            🌀
                        </div>

                        {/*<motion.div*/}
                        {/*    className={styles.emoji}*/}
                        {/*    initial={{ scale: 0 }}*/}
                        {/*    animate={{ rotate: 360,scale: [0, 1.2, 1] } }*/}

                        {/*    // transition={{ duration: 0.6, ease: "easeOut" }}*/}
                        {/*    transition={{*/}
                        {/*        repeat: Infinity,*/}
                        {/*        duration: 1.8,*/}
                        {/*        ease: "linear",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    🌀*/}
                        {/*</motion.div>*/}

                        <motion.div
                            className={styles.glowEffect}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    <motion.p
                        className={styles.text}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        جاري تحميل التجربة الأفضل...
                    </motion.p>

                    <div className={styles.particles}>
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={styles.particle}
                                animate={{
                                    y: [0, -40, 0],
                                    x: Math.random() * 40 - 20,
                                    scale: [1, 0.6, 1],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 1,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FullScreenLoader;
