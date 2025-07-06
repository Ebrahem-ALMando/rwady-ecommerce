'use client';

import { motion } from 'framer-motion';
import styles from './SocialLinks.module.css';
import { useTranslations } from 'next-intl';
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";

const icons = {
    whatsapp: <FaWhatsapp />,
    messenger: <FaFacebookMessenger />,
    email: <FaEnvelope />,
    phone: <FaPhoneAlt />
};

export default function SocialLinksUI({ methods,initialError }) {
    const t = useTranslations("contact");
    if(initialError)return <ReloadWithError/>
    return (
        <div className={styles.socialContainer}>
            <h2>{t("otherMethodsTitle")}</h2>
            <p>{t("otherMethodsDescription")}</p>

            <div className={styles.contactMethods}>
                {methods.map((method, index) => (
                    <motion.a
                        key={index}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactCard}
                        style={{ '--method-color': method.color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className={styles.iconWrapper}>
                            {icons[method.type]}
                        </div>
                        <div className={styles.methodInfo}>
                            <h3>{t(`methods.${method.type}.title`)}</h3>
                            <p>{method.description}</p>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/*<div className={styles.workingHours}>*/}
            {/*    <h3>{t("workingHoursTitle")}</h3>*/}
            {/*    <p>{t("workingDays")}</p>*/}
            {/*    <p>{t("weekend")}</p>*/}
            {/*</div>*/}
        </div>
    );
}
