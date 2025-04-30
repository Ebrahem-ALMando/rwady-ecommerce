"use client"
import styles from './FilterCriteriaSelect.module.css';
import Stars from "@/Components/Shared/Stars/Stars";

const FilterCriteriaSelect = (props) => {
    const { id, section, title, quantity, isColor, color, isRating,productRating, type, onChange,selected } = props;

    return (
        <div className={styles.row}>
            <div className={styles.formGroup}>
                <input
                    type={type}
                    name={section}
                    id={`${type}-${id}-${section}`}
                    className={styles.input}
                    value={id}
                    onChange={() => onChange(section, id)}
                    checked={(selected || []).includes(id)}

                />
                <label htmlFor={`${type}-${id}-${section}`} className={styles.inputLabel}>
                    {isColor && color ? (
                        <span
                            style={{ background: color }}
                            className={styles.circle}
                        />
                    ) : null}
                    {title}
                    {isRating ?
                       <Stars
                           title={title}
                           rating={productRating}
                            /> : ""}
                </label>
            </div>
            <p className={styles.quantity}>({quantity})</p>
        </div>
    );
};

export default FilterCriteriaSelect;
