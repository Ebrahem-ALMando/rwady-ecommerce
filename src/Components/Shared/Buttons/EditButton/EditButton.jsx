import styles from "./EditButton.module.css";

const EditButton = props => (
    <button
        onClick={props.onClick}
        className={styles.edit}>
        {props.icon}
        تعديل
    </button>
)
export default EditButton