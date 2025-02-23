import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contactInfo}>
                <p>بـيـانات الـتـواصـل</p>
                <p>01143198768</p>
                <p>01143198768</p>
                <p>Rwadyy22@gmail.com</p>
            </div>

            <div className={styles.links}>
                <p>الصفحات</p>
                <ul>
                    <li>من نحن</li>
                    <li>اتصل بنا</li>
                    <li>سياسة الخصوصية</li>
                    <li>سياسة الاستبدال والاسترجاع</li>
                </ul>
            </div>

            <div className={styles.socialLinks}>
                <p>تابعنا عبر</p>
                <div className={styles.socialIcons}>
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-twitter"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-youtube"></i>
                </div>
            </div>

            <div className={styles.downloadLinks}>
                <p>تحميل التطبيق</p>
                <div className={styles.downloadButtons}>
                    <button>App Store</button>
                    <button>Google Play</button>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>جميع الحقوق محفوظة لـ RWADY</p>
            </div>
        </footer>
    );
};

export default Footer;
