'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './EditButton.module.css';

const EditButton = (props) => {
    const t = useTranslations('Buttons');

    return (
        <button
            onClick={props.onClick}
            className={styles.edit}
        >
            {props.icon}
            {t('edit')}
        </button>
    );
};

export default EditButton;