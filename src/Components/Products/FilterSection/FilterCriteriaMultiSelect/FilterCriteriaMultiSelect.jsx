import styles from './FilterCriteriaMultiSelect.module.css'

const FilterCriteriaMultiSelect= props=>{

    return(
        <div className={styles.row}>
            <div className={styles.formGroup}>
                <input
                    type="checkbox"
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
export default FilterCriteriaMultiSelect