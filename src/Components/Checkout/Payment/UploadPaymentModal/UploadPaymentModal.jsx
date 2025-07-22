// import { motion, AnimatePresence } from 'framer-motion';
// import { FiUploadCloud, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
// import {useState} from "react";
//
// import styles from './UploadPaymentModal.module.css'
// const UploadPaymentModal = ({uploadedFile,setUploadedFile}) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDragging, setIsDragging] = useState(false);
//
//
//     const handleUpload = (file) => {
//
//         setTimeout(() => {
//             setUploadedFile(file);
//         }, 2000);
//     };
//
//     return (
//         <>
//
//             {/*<motion.button*/}
//             {/*    className={styles.uploadTrigger}*/}
//             {/*    onClick={() => setIsOpen(true)}*/}
//             {/*    whileHover={{ scale: 1.05 }}*/}
//             {/*    whileTap={{ scale: 0.95 }}*/}
//             {/*>*/}
//             {/*    <FiUploadCloud className={styles.triggerIcon} />*/}
//             {/*    <span>رفع إثبات الدفع</span>*/}
//             {/*    <div className={styles.pulseEffect} />*/}
//             {/*</motion.button>*/}
//
//
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         className={styles.modalOverlay}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={() => setIsOpen(false)}
//                     >
//                         <motion.div
//                             className={styles.modalContent}
//                             initial={{ y: 50, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: -50, opacity: 0 }}
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <button onClick={()=>setIsOpen(false)}>
//                                 X
//                             </button>
//                             <h3 className={styles.modalTitle}>
//                                 <FiUploadCloud />
//                                 رفع صورة الحوالة
//                             </h3>
//
//
//                             <motion.div
//                                 className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
//                                 onDragOver={(e) => {
//                                     e.preventDefault();
//                                     setIsDragging(true);
//                                 }}
//                                 onDragLeave={() => setIsDragging(false)}
//                                 onDrop={(e) => {
//                                     e.preventDefault();
//                                     const file = e.dataTransfer.files[0];
//                                     handleUpload(file);
//                                     setIsDragging(false);
//                                 }}
//                             >
//
//                                 <motion.div
//                                     className={styles.loadingCircle}
//                                     animate={{
//                                         rotate: 360,
//                                         scale: [1, 1.2, 1]
//                                     }}
//                                     transition={{
//                                         repeat: Infinity,
//                                         duration: 2,
//                                         ease: "linear"
//                                     }}
//                                 >
//                                     <FiRefreshCw />
//                                 </motion.div>
//
//
//                                 <motion.div
//                                     className={styles.uploadIcon}
//                                     animate={{
//                                         y: [0, -15, 0],
//                                         opacity: [0.8, 1, 0.8]
//                                     }}
//                                     transition={{
//                                         repeat: Infinity,
//                                         duration: 1.5
//                                     }}
//                                 >
//                                     <FiUploadCloud />
//                                 </motion.div>
//
//                                 <p className={styles.dropText}>
//                                     {uploadedFile
//                                         ? "تم الرفع بنجاح!"
//                                         : "اسحب الملف هنا أو انقر للاختيار"
//                                     }
//                                 </p>
//
//
//                                 {uploadedFile && (
//                                     <motion.div
//                                         className={styles.previewContainer}
//                                         initial={{ scale: 0 }}
//                                         animate={{ scale: 1 }}
//                                     >
//                                         <FiCheckCircle className={styles.successIcon} />
//                                         <img
//                                             src={URL.createObjectURL(uploadedFile)}
//                                             alt="معاينة الحوالة"
//                                         />
//                                     </motion.div>
//                                 )}
//
//
//                                 <label className={styles.fileInputLabel}>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => handleUpload(e.target.files[0])}
//                                     />
//                                     اختر ملفًا
//                                 </label>
//                             </motion.div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };
// export default UploadPaymentModal

import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './UploadPaymentModal.module.css';
import { useTranslations } from 'next-intl';
import {CloseIcon} from "@/utils/Icons";
import {toast} from "react-hot-toast";
import {uploadImage} from "@/api/services/general/images/uploadImage";


const UploadPaymentModal = ({ onClose, onUploadSuccess }) => {
    const t = useTranslations('PaymentProof');
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageName, setImageName] = useState(null);

    const handleConfirm = () => {
        if (!imageName) return;
        onUploadSuccess(imageName);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            toast.error(t("errors.imageTooLarge"));
            return;
        }

        setIsUploading(true);

        try {
            // const imageRes = await uploadImage(file, 'transferImage');
            const imageRes = await uploadImage(file, 'users');

            if (imageRes.error) {
                toast.error(t("errors.updateFail"));
                return;
            }

            const name = imageRes.data?.image_name;
            const image_url = imageRes.data?.image_url;
            setImageName(name);
            setPreviewUrl(image_url);

        } catch {
            toast.error(t("errors.uploadError"));
            setIsUploading(false);
            setImageName(null);
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={styles.modalContent}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalHeader}>
                        <h3 className={styles.modalTitle}><FiUploadCloud /> {t('uploadTitle')}</h3>
                        <button
                            className={styles.closeIcon}
                            onClick={onClose}
                            aria-label={t("close")}
                        >
                            {CloseIcon}
                        </button>
                    </div>

                    <motion.div
                        className={styles.dropZone}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            handleImageChange({ target: { files: [file] } });
                        }}
                    >
                        {isUploading ? (
                            <div className={styles.skeletonWrapper}>
                                <Skeleton height={200} />
                            </div>
                        ) : previewUrl ? (
                            <div className={styles.previewContainer}>
                                <img className="w-100 h-100 object-cover" src={previewUrl} alt="preview" />

                            </div>
                        ) : (
                            <>
                                <motion.div
                                    className={styles.uploadIcon}
                                    animate={{ y: [0, -15, 0], opacity: [0.8, 1, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FiUploadCloud />
                                </motion.div>
                                <p className={styles.dropText}>{t('dropZoneText')}</p>
                            </>
                        )}

                        {!previewUrl ? (
                            <label className={styles.fileInputLabel}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {t('chooseFile')}
                            </label>
                        ) : (
                            <button
                                className={styles.removeBtn}
                                onClick={() => {
                                    setPreviewUrl(null);
                                    setImageName(null);
                                }}
                            >
                                <FiTrash2 /> {t('remove')}
                            </button>
                        )}

                    </motion.div>

                    <div className={styles.modalActions}>
                        <button
                            className={styles.confirmBtn}
                            disabled={!imageName || isUploading}
                            onClick={handleConfirm}
                        >
                            {t('confirm')}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UploadPaymentModal;


