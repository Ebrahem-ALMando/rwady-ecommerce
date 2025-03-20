import styles from "./DeleteButton.module.css";
import React from "react";

const DeleteButton = props => (
    <button
        onClick={props.onClick}
        className={styles.delete}>
        {props.icon}
        حذف
    </button>
)
export default DeleteButton