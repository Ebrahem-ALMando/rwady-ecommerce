"use client"
import styles from "./FilterSection.module.css";
import Line from "@/Components/Shared/Line/Line";
import {useState} from "react";
import FilterCriteriaOneSelect
    from "@/Components/Products/FilterSection/FilterCriteriaOneSelect/FilterCriteriaOneSelect";



const FilterSection=(props)=>{
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`${styles.items} ${isOpen ? styles.open : ''}`}>
            <button
                className={styles.button}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <h2>
                    {props.title}
                </h2>
                <span className={styles.icon}>
                    {isOpen ?
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 14.5L12 10.5L7 14.5" stroke="#0741AD" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        :
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 14.5L12 10.5L7 14.5" stroke="#0741AD" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>}
                </span>
            </button>

            <div className={styles.content}>
                {props.children}
                <p className={styles.showMore}>عرض المزيد</p>
            </div>


        </div>
    )
}
export default FilterSection