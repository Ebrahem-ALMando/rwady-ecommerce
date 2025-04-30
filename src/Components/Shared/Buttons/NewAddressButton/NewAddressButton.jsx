import styles from './NewAddressButton.module.css';
import React from "react";

const NewAddressButton = ({onClick}) => {
    return (
        <button className={styles.button}
        onClick={onClick}
        >
            إضافة عنوان جديد
        </button>
    );
};

export default NewAddressButton;
