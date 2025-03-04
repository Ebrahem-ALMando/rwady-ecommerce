import styles from './RowTextWithNumber.module.css'

const RowTextWithNumber = props => {
    return(
        <div className={styles.row}>
            <p
                className={styles.title}
                style={{
                    color: props.colorTitle,
                    fontSize: props.sizeTitle,
                    fontWeight: props.weightTitle,
                }}
            >
                {props.title}
                <span
                className={styles.star}
                >
                    {props.star}
                </span>
            </p>
            <p
                className={styles.value}
                style={{
                    color: props.colorValue,
                    fontSize: props.sizeValue,
                }}
            >
                {props.value}
            </p>
        </div>
    )
}
export default RowTextWithNumber