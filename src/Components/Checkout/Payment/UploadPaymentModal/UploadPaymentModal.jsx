import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import {useState} from "react";

import styles from './UploadPaymentModal.module.css'
const UploadPaymentModal = ({uploadedFile,setUploadedFile}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);


    const handleUpload = (file) => {

        setTimeout(() => {
            setUploadedFile(file);
        }, 2000);
    };

    return (
        <>

            <motion.button
                className={styles.uploadTrigger}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiUploadCloud className={styles.triggerIcon} />
                <span>رفع إثبات الدفع</span>
                <div className={styles.pulseEffect} />
            </motion.button>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className={styles.modalTitle}>
                                <FiUploadCloud />
                                رفع صورة الحوالة
                            </h3>


                            <motion.div
                                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    handleUpload(file);
                                    setIsDragging(false);
                                }}
                            >

                                <motion.div
                                    className={styles.loadingCircle}
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "linear"
                                    }}
                                >
                                    <FiRefreshCw />
                                </motion.div>


                                <motion.div
                                    className={styles.uploadIcon}
                                    animate={{
                                        y: [0, -15, 0],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5
                                    }}
                                >
                                    <FiUploadCloud />
                                </motion.div>

                                <p className={styles.dropText}>
                                    {uploadedFile
                                        ? "تم الرفع بنجاح!"
                                        : "اسحب الملف هنا أو انقر للاختيار"
                                    }
                                </p>


                                {uploadedFile && (
                                    <motion.div
                                        className={styles.previewContainer}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <FiCheckCircle className={styles.successIcon} />
                                        <img
                                            src={URL.createObjectURL(uploadedFile)}
                                            alt="معاينة الحوالة"
                                        />
                                    </motion.div>
                                )}


                                <label className={styles.fileInputLabel}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleUpload(e.target.files[0])}
                                    />
                                    اختر ملفًا
                                </label>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default UploadPaymentModal