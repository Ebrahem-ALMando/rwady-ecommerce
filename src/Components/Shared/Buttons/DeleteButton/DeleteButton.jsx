
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './DeleteButton.module.css';

const DeleteButton = (props) => {
    const t = useTranslations('Buttons');

    return (
        <button
            onClick={props.onClick}
            className={styles.delete}
        >
            {props.icon}
            {t('delete')}
        </button>
    );
};

export default DeleteButton;
