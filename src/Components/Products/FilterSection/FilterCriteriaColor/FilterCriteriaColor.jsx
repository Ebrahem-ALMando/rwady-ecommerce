import styles from './FilterCriteriaMultiSelect.module.css'

const FilterCriteriaColor= props=>{

    return(
        <div className={styles.row}>
            <div className={styles.formGroup}>
                <input
                    type="radio"
                    name="option"
                    id={`checkbox-${props.id} ${props.section}}`}
                    className={styles.checkboxInput}
                />
                <label htmlFor={`checkbox-${props.id} ${props.section}}`} className={styles.inputLabel}>
                    {props.title}
                </label>
            </div>
            <p className={styles.quantity}>
                ({props.quantity})
            </p>
        </div>
    )
}
export default FilterCriteriaColor