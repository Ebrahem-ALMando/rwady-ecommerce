
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
    const toastId = typeof window !== "undefined";
    const handleDismiss = () => {
        if (typeof window !== "undefined" && window.toast && toastId) {
          window.toast.dismiss(toastId);
        }
    }   
    return (
        <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${styles.toastContainer} ${styles[type]}`}
      drag
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={(event, info) => {
        if (info.offset.x > 80 || info.offset.y < -80) {
          handleDismiss();
        }
      }}
      style={{
        touchAction: "none",
        cursor: "grab",
        position: "relative",
      }}
      data-id={toastId}
    >
      {/* زر X للإغلاق */}
      <button
        aria-label="إغلاق"
        onClick={handleDismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          top: 8,
          left: 8,
          padding: 4,
          zIndex: 2,
          color: "#888",
        }}
      >
        <CircleX size={20} />
      </button>

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