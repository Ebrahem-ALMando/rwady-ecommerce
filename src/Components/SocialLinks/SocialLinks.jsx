'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import styles from './SocialLinks.module.css';

const contactMethods = [
  {
    icon: <FaWhatsapp />,
    title: "واتساب",
    description: "تواصل معنا مباشرة عبر واتساب",
    link: "https://wa.me/966501234567",
    color: "#25D366"
  },
  {
    icon: <FaFacebookMessenger />,
    title: "ماسنجر",
    description: "راسلنا على فيسبوك ماسنجر",
    link: "https://m.me/rwady.official",
    color: "#006AFF"
  },
  {
    icon: <FaEnvelope />,
    title: "البريد الإلكتروني",
    description: "info@rwady.com",
    link: "mailto:info@rwady.com",
    color: "#EA4335"
  },
  {
    icon: <FaPhoneAlt />,
    title: "اتصال هاتفي",
    description: "+966 12 345 6789",
    link: "tel:+966123456789",
    color: "#0741ad"
  }
];

export default function SocialLinks() {
  return (
    <div className={styles.socialContainer}>
      <h2>طرق التواصل الأخرى</h2>
      <p>يمكنك التواصل معنا مباشرة عبر القنوات التالية:</p>

      <div className={styles.contactMethods}>
        {contactMethods.map((method, index) => (
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
              {method.icon}
            </div>
            <div className={styles.methodInfo}>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className={styles.workingHours}>
        <h3>ساعات العمل:</h3>
        <p>الأحد - الخميس: 8 صباحاً - 5 مساءً</p>
        <p>الجمعة - السبت: إجازة</p>
      </div>
    </div>
  );
}
