import styles from './NewAddressButton.module.css';
import React from "react";

const NewAddressButton = (props) => {
    return (
        <button className={styles.button}>
            إضافة عنوان جديد
        </button>
    );
};

export default NewAddressButton;
