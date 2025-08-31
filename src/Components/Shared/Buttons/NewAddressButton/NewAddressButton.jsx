import styles from './NewAddressButton.module.css';
import React from "react";
import { useTranslations } from "next-intl";

const NewAddressButton = ({ onClick }) => {
    const t = useTranslations('Addresses');
    return (
        <button className={styles.button} onClick={onClick}>
            {t("newTitle")}
        </button>
    );
};

export default NewAddressButton;
