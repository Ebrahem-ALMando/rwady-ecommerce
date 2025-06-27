import styles from './NewAddressButton.module.css';
import React from "react";

const NewAddressButton = ({ onClick, t }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {t("newTitle")}
        </button>
    );
};

export default NewAddressButton;
