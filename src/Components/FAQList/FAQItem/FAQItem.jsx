"use client"
import styles from "./FAQItem.module.css";
import Line from "@/Components/Shared/Line/Line";
import {useState} from "react";
import {downArrow, upArrow} from "@/utils/Icons";


const FAQItem=({faqs})=>{
        const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`${styles.items} ${isOpen ? styles.open : ''}`}>
            <button
                className={styles.button}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h2>
                    {faqs.question}
                </h2>
                <span className={styles.icon}>
                    {isOpen ?
                        <>{downArrow}</>
                        :
                      <>{upArrow}</>
                    }
                </span>
            </button>

            <div className={styles.content}>
                <Line/>
                <p className={styles.text}>
                    {faqs.answer}
                </p>
            </div>
        </div>
    )
}
export default FAQItem