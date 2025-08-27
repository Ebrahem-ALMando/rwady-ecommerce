'use client';

import React from 'react';
import styles from '../../../Profile/EditProfileForm/EditProfileForm.module.css';
import confirmStyles from './confirmDialog.module.css';
import Line from "@/Components/Shared/Line/Line";
import { CloseIcon } from "@/utils/Icons";
import { useTranslations } from "next-intl";

const ConfirmDialog = ({ 
    isOpen, 
    setIsOpen, 
    title, 
    message, 
    onConfirm, 
    confirmText = "حذف",
    cancelText = "إلغاء",
    type = "danger", // danger, warning, info,
    t
}) => {
    

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const getButtonStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    confirmButton: `${styles.saveButton} ${confirmStyles.dangerButton}`,
                    cancelButton: styles.cancelButton
                };
            case 'warning':
                return {
                    confirmButton: `${styles.saveButton} ${confirmStyles.warningButton}`,
                    cancelButton: styles.cancelButton
                };
            case 'info':
                return {
                    confirmButton: `${styles.saveButton} ${confirmStyles.infoButton}`,
                    cancelButton: styles.cancelButton
                };
            default:
                return {
                    confirmButton: `${styles.saveButton} ${confirmStyles.dangerButton}`,
                    cancelButton: styles.cancelButton
                };
        }
    };

    const buttonStyles = getButtonStyles();

    return (
        <div className={styles.modalOverlay} onClick={handleCancel}>
            <div 
                className={`${styles.profileContainer} ${confirmStyles.confirmDialogContainer}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeIcon} onClick={handleCancel}>
                        {CloseIcon}
                    </button>
                </div>

                <div className={styles.form}>
                    <div className={`${styles.formGroup} ${confirmStyles.messageContainer}`}>
                        <p className={confirmStyles.messageText}>
                            {message}
                        </p>
                    </div>

                    <Line />

                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            className={buttonStyles.confirmButton}
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </button>
                        <button 
                            type="button" 
                            className={buttonStyles.cancelButton}
                            onClick={handleCancel}
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ConfirmDialog);
