// 'use client';
//
// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiUser, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';
// import styles from './ContactForm.module.css';
//
// export default function ContactForm() {
//   const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [formError, setFormError] = useState('');
//   const textareaRef = useRef(null);
//
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, []);
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (name === 'message' && textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };
//
//   const cleanPhoneNumber = (phone) => phone.replace(/[+\s]/g, '');
//
//   const validatePhoneNumber = (phone) => {
//     const cleaned = cleanPhoneNumber(phone);
//     const genericRegex = /^[0-9]{9,18}$/;
//     return genericRegex.test(cleaned);
//   };
//
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');
//
//     if (!formData.name || !formData.phone || !formData.message) {
//       setFormError('الرجاء ملء جميع الحقول المطلوبة');
//       return;
//     }
//
//     if (!validatePhoneNumber(formData.phone)) {
//       setFormError('يرجى إدخال رقم هاتف صحيح (مثال: +966501234567)');
//       return;
//     }
//
//     setIsSubmitting(true);
//     try {
//       const cleanedPhone = cleanPhoneNumber(formData.phone);
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Form submitted:', { ...formData, phone: cleanedPhone });
//       setSubmitSuccess(true);
//       setFormData({ name: '', phone: '', message: '' });
//     } catch (error) {
//       setFormError('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <motion.div
//     className={styles.formContainer}
//     initial={{ opacity: 0, y: 40 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, ease: 'easeOut' }}
//   >
//       <div className={styles.formHeader}>
//         <h2>أرسل رسالتك</h2>
//         <p>سنرد عليك في أقرب وقت ممكن</p>
//       </div>
//
//       {submitSuccess ? (
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={styles.successMessage}>
//           <h3>شكراً لك!</h3>
//           <p>تم استلام رسالتك بنجاح وسنتواصل معك قريباً.</p>
//           <button onClick={() => setSubmitSuccess(false)} className={styles.backButton}>إرسال رسالة جديدة</button>
//         </motion.div>
//       ) : (
//         <>
//           {formError && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={styles.errorMessage}>
//               {formError}
//             </motion.div>
//           )}
//
//           <form onSubmit={handleSubmit} className={styles.contactForm}>
//             <div className={styles.formGroup}>
//               <label htmlFor="name"><FiUser className={styles.inputIcon} /> <span>الاسم الكامل *</span></label>
//               <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}  placeholder="أدخل اسمك الكامل" />
//             </div>
//
//             <div className={styles.formGroup}>
//               <label htmlFor="phone"><FiPhone className={styles.inputIcon} /> <span>رقم الهاتف *</span></label>
//               <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}  placeholder="+966 50 123 4567" />
//             </div>
//
//             <div className={styles.formGroup}>
//               <label htmlFor="message"><FiMessageSquare className={styles.inputIcon} /> <span>رسالتك *</span></label>
//               <textarea ref={textareaRef} id="message" name="message" value={formData.message} onChange={handleInputChange}  placeholder="أدخل رسالتك هنا..." rows="8" />
//             </div>
//
//             <motion.button type="submit" className={styles.submitButton} disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//               {isSubmitting ? <span className={styles.loadingDots}><span>.</span><span>.</span><span>.</span></span> : <><FiSend className={styles.sendIcon} /><span>إرسال الرسالة</span></>}
//             </motion.button>
//           </form>
//         </>
//       )}
//     </motion.div>
//   );
// }
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';
import styles from './ContactForm.module.css';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
    const t = useTranslations("contactForm");

    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formError, setFormError] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'message' && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const cleanPhoneNumber = (phone) => phone.replace(/[+\s]/g, '');
    const validatePhoneNumber = (phone) => /^[0-9]{9,18}$/.test(cleanPhoneNumber(phone));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!formData.name || !formData.phone || !formData.message) {
            setFormError(t("requiredError"));
            return;
        }

        if (!validatePhoneNumber(formData.phone)) {
            setFormError(t("invalidPhone"));
            return;
        }

        setIsSubmitting(true);
        try {
            const cleanedPhone = cleanPhoneNumber(formData.phone);
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', { ...formData, phone: cleanedPhone });
            setSubmitSuccess(true);
            setFormData({ name: '', phone: '', message: '' });
        } catch {
            setFormError(t("submitError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className={styles.formHeader}>
                <h2>{t("title")}</h2>
                <p>{t("subtitle")}</p>
            </div>

            {submitSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={styles.successMessage}>
                    <h3>{t("successTitle")}</h3>
                    <p>{t("successMessage")}</p>
                    <button onClick={() => setSubmitSuccess(false)} className={styles.backButton}>
                        {t("newMessage")}
                    </button>
                </motion.div>
            ) : (
                <>
                    {formError && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={styles.errorMessage}>
                            {formError}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">
                                <FiUser className={styles.inputIcon} /> <span>{t("fields.name")}</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={t("fields.namePlaceholder")}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">
                                <FiPhone className={styles.inputIcon} /> <span>{t("fields.phone")}</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={t("fields.phonePlaceholder")}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">
                                <FiMessageSquare className={styles.inputIcon} /> <span>{t("fields.message")}</span>
                            </label>
                            <textarea
                                ref={textareaRef}
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={t("fields.messagePlaceholder")}
                                rows="3"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <span className={styles.loadingDots}><span>.</span><span>.</span><span>.</span></span>
                            ) : (
                                <>
                                    <FiSend className={styles.sendIcon} />
                                    <span>{t("fields.submit")}</span>
                                </>
                            )}
                        </motion.button>
                    </form>
                </>
            )}
        </motion.div>
    );
}
