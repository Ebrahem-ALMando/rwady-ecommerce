import styles from './Footer.module.css';
import {
    FaFacebookSquare, FaSnapchatGhost, FaYoutube
} from "react-icons/fa";
import {
    PiInstagramLogoFill, PiWhatsappLogo
} from "react-icons/pi";
import {
    RiTwitterXLine
} from "react-icons/ri";
import {
    HiOutlineMail
} from "react-icons/hi";
import {
    MdOutlinePhoneInTalk
} from "react-icons/md";
import {
    appleDownloadButton, googlePlayDownloadButton
} from "@/utils/Icons";

import Link from "next/link";
import FloatingDownloadButton from "@/Components/FloatingDownloadButton/FloatingDownloadButton";
import Error from "@/Components/Shared/Error/Error";
import { getSettings } from "@/api/services/settings";
import Image from "next/image";
import Loading from "@/Components/Shared/Loading/Loading";
import { Suspense } from "react";

const FooterData = async ({ dataPromise }) => {
    let result;
    try {
        result = await dataPromise;
    } catch {
        return <Error message="يرجى إعادة تحميل الصفحة" />;
    }

    if (!result?.data?.settings) {
        return <Error message="يرجى إعادة تحميل الصفحة" />;
    }

    const settings = Array.isArray(result.data.settings)
        ? result.data.settings[0]
        : result.data.settings;

    return (
        <>
            <div className={styles.socialLinks} aria-label="روابط التواصل الاجتماعي">
                <p>تابعنا عبر</p>
                <div className={styles.socialIcons}>
                    <a href={settings.snapchat_url||"#"} target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
                        <i ><FaSnapchatGhost size={26} aria-hidden="true" /></i>
                    </a>
                    <a href={settings.youtube_url||"#"} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <i ><FaYoutube size={26} aria-hidden="true" /></i>
                    </a>
                    <a href={settings.twitter_url||"#"} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <i ><RiTwitterXLine size={26} aria-hidden="true"/></i>
                    </a>
                    <a href={settings.instgram_url||"#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i ><PiInstagramLogoFill size={26} aria-hidden="true"/></i>
                    </a>
                    <a href={settings.facebook_url||"#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i ><FaFacebookSquare size={26} aria-hidden="true"/></i>
                    </a>
                </div>
            </div>

            <div className={styles.links} aria-label="روابط صفحات الموقع">
                <p>الصفحات</p>
                <ul>
                    <li><Link href="/#">من نحن</Link></li>
                    <li><Link href="/#">اتصل بنا</Link></li>
                    <li><Link href="/terms-and-conditions">سياسة الخصوصية</Link></li>
                    <li><Link href="/return-policy">سياسة الاستبدال والاسترجاع</Link></li>
                    <li><Link href="/shipment-policies">سياسة الشحن والتوصيل</Link></li>
                    <li><Link href="/FAQ-list">الأسئلة الشائعة</Link></li>
                </ul>
            </div>

            <div className={styles.contactInfo} aria-label="بيانات التواصل">
                <p>بيانات التواصل</p>
                <p><span className={styles.icon}><MdOutlinePhoneInTalk size={24} /></span><span dir="ltr">{settings.telephone}</span></p>
                <p><span className={styles.icon}><PiWhatsappLogo size={24} /></span><span dir="ltr">{settings.whatsapp}</span></p>
                <p><span className={styles.icon}><HiOutlineMail size={24} /></span>{settings.email}</p>
            </div>

            <div className={styles.downloadSection} aria-label="تحميل التطبيق">
                <Image
                    src={"/logoFotter.png"}
                    alt="شعار RWADY"
                    width={256}
                    height={66}
                    className={styles.logo}
                    priority

                />
                <p className={styles.description}>
                    اكتشف كل ما تحتاجه من ملابس وأساسيات وإلكترونيات من أدوات منزلية
                    بأفضل وأحسن الأنواع واحصل على كل ما هو جديد
                </p>
                <div className={styles.downloadButtons}>
                    <a href={settings.client_app_andriod_url} target="_blank" rel="noopener noreferrer" aria-label="تحميل تطبيق RWADY على Android">
                        {googlePlayDownloadButton}
                    </a>
                    <a href={settings.client_app_ios_url} target="_blank" rel="noopener noreferrer" aria-label="تحميل تطبيق RWADY على iOS">
                        {appleDownloadButton}
                    </a>
                </div>
            </div>
        </>
    );
};

const Footer = () => {
    const dataPromise = getSettings();
    return (
        <footer className={styles.footer}>
            <Suspense fallback={<Loading />}>
                <FooterData dataPromise={dataPromise} />
            </Suspense>
            <hr className={styles.footerLine} />
            <div className={styles.footerBottom}>
                <p>جميع الحقوق محفوظة لـ RWADY</p>
            </div>
            <FloatingDownloadButton ariaLabel="زر تحميل التطبيق" />
        </footer>
    );
};

export default Footer;
