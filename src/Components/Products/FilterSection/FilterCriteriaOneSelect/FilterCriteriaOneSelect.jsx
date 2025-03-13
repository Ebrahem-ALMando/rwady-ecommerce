import styles from './FilterCriteriaOneSelect.module.css'
import Star from "@/Components/Products/FilterSection/Star";

const FilterCriteriaOneSelect= props=>{

    return(
        <div className={styles.row}>
            <div className={styles.formGroup}>
                <input
                    type="radio"
                    name="option"
                    id={`radio-${props.id} ${props.section}}`}
                    className={styles.radioInput}
                />



                        <label htmlFor={`radio-${props.id} ${props.section}}`} className={styles.inputLabel}>
                            {
                                props.isColor ?
                                    <span
                                        htmlFor={`radio-${props.id} ${props.section}}`}
                                        style={{background:props.color}}
                                        className={styles.circle}>   </span>

                                    :''
                            }
                            {props.title}
                            {/*{*/}
                            {/*    props.isRating?*/}
                            {/*        <Star/>*/}
                            {/*        :*/}
                            {/*        ""*/}
                            {/*}*/}

                        </label>
                    </div>
                    <p className={styles.quantity}>
                ({props.quantity})
            </p>
        </div>
    )
}
export default FilterCriteriaOneSelect