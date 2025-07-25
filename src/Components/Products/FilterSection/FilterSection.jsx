"use client"
import styles from "./FilterSection.module.css";
import Line from "@/Components/Shared/Line/Line";
import {useState} from "react";
import FilterCriteriaSelect
    from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import {downArrow, upArrow} from "@/utils/Icons";
import {useTranslations} from "next-intl";



const FilterSection=(props)=>{
    const [isOpen, setIsOpen] = useState(true);
        const t=useTranslations('products')
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
                        <>{downArrow}</>
                        :
                        <>{upArrow}</>}
                </span>
            </button>

            <div className={styles.content}>
                {props.children}
                {/* {props.isMore ?
                    <p className={styles.showMore}>{t("showMore")}</p>
                    : ''} */}
            </div>


        </div>
    )
}
export default FilterSection