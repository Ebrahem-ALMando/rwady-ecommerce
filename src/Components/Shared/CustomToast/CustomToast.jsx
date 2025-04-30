
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTrashAlt, FaInfoCircle, FaExclamationTriangle} from 'react-icons/fa';
import {CircleX} from "lucide-react";
import styles from './CustomToast.module.css';

const ToastIcon = ({ type }) => {
    const iconSize = 24;

    switch(type) {
        case 'success':
            return <FaCheckCircle size={iconSize} className={styles.successIcon} />;
        case 'error':
            return <CircleX size={iconSize} className={styles.errorIcon} />;
        case 'delete':
            return <FaTrashAlt size={iconSize} className={styles.errorIcon} />;
        case 'info':
            return <FaInfoCircle size={iconSize} className={styles.infoIcon} />;
        case 'warning':
            return <FaExclamationTriangle size={iconSize} className={styles.warningIcon} />;
        default:
            return <FaInfoCircle size={iconSize} />;
    }
};

const CustomToast = ({ type = 'info', title, message, icon }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={`${styles.toastContainer} ${styles[type]}`}
        >
            <div className={styles.iconWrapper}>
                {icon || <ToastIcon type={type} />}
            </div>

            <div className={styles.contentWrapper}>
                <h4 className={styles.toastTitle}>{title}</h4>
                <p className={styles.toastMessage}>{message}</p>
            </div>
        </motion.div>
    );
};

export default CustomToast;