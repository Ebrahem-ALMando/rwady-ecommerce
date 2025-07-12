"use client";

import { motion } from "framer-motion";
import { Ghost } from "lucide-react";
import styles from "./EmptyState.module.css";
import Image from "next/image";
import {useLocale} from "next-intl";
import Link from "next/link";

const EmptyState = ({ message = "لا توجد منتجات لعرضها حالياً" ,item=null,initLink="/products"}) => {
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const gridPattern = Array(36).fill(null).map((_, i) => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 2
    }));
    const lang=useLocale()
    return (
        <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >

            {!prefersReducedMotion && gridPattern.map((pos, i) => (
                <motion.div
                    key={`grid-${i}`}
                    className={styles.gridDot}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [pos.scale, pos.scale * 1.2, pos.scale]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: pos.delay
                    }}
                    style={{
                        left: `${50 + pos.x}%`,
                        top: `${50 + pos.y}%`
                    }}
                />
            ))}


            {!prefersReducedMotion && (
                <>
                    <div className={styles.floatingCircle} />
                    <div className={styles.floatingTriangle} />
                    <div className={styles.floatingHexagon} />
                </>
            )}


            <div className={styles.glowLayer} />

            <motion.div
                className={styles.contentWrapper}
                initial={{scale: 0.9}}
                animate={{scale: 1}}
                transition={{type: "spring", stiffness: 150}}
            >
                <motion.div
                    className={styles.iconContainer}
                    whileHover={!prefersReducedMotion ? {scale: 1.05} : {}}
                    whileTap={!prefersReducedMotion ? {scale: 0.95} : {}}
                    animate={!prefersReducedMotion ? {
                        y: [0, -10, 0],
                        // rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "anticipate",
                    }}
                >
                  <Link href={initLink} prefetch={true} >
                      <Image
                          src="/img_7.png"
                          alt={message}
                          className={styles.ghostIcon}
                          width={80}
                          height={80}
                          style={{
                              '--base-rotation': lang === 'ar' ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          }}
                      />
                  </Link>


                    {/*<Ghost className={styles.ghostIcon}/>*/}
                </motion.div>

                <motion.p
                    className={styles.text}
                    // animate={!prefersReducedMotion ? {
                    //     // textShadow: [
                    //     //     "0 0 10px rgba(7,65,173,0.3)",
                    //     //     "0 0 20px rgba(7,65,173,0.5)",
                    //     //     "0 0 10px rgba(7,65,173,0.3)"
                    //     // ]
                    // } : {}}
                    // transition={{
                    //     duration: 2,
                    //     repeat: Infinity
                    // }}
                >
                    {message}
                </motion.p>
                <div className={styles.newItem}>

                    {item &&
                        item
                    }
                </div>
            </motion.div>

        </motion.div>
    );
};

export default EmptyState;