//
// import styles from './Footer.module.css';
// import {
//     FaFacebookSquare, FaSnapchatGhost, FaYoutube
// } from "react-icons/fa";
// import {
//     PiInstagramLogoFill, PiWhatsappLogo
// } from "react-icons/pi";
// import {
//     RiTwitterXLine
// } from "react-icons/ri";
// import {
//     HiOutlineMail
// } from "react-icons/hi";
// import {
//     MdOutlinePhoneInTalk
// } from "react-icons/md";
// import {
//     appleDownloadButton, googlePlayDownloadButton
// } from "@/utils/Icons";
//
// import Link from "next/link";
// import FloatingButton from "@/Components/FloatingButton/FloatingButton";
// import Error from "@/Components/Shared/Error/Error";
// import { getSettings } from "@/api/services/settings";
// import Image from "next/image";
// import { createTranslation } from "@/i18n/server";
// import {getSettingData} from "@/utils/getSettingsData";
//
// const Footer = async () => {
//     const { t, lang } = await createTranslation("common");
//
//         const {settingData,initialError} = await getSettingData();
//
//
//     if (initialError) {
//         return (
//             <footer className={styles.footer}>
//                 <Error message={t("footer.reloadError")} />
//             </footer>
//         );
//     }
//
//     const settings = Array.isArray(settingData?.settings)
//         ? settingData?.settings[0]
//         : settingData?.settings??{};
//
//     return (
//         <footer className={styles.footer}>
//             <div className={styles.socialLinks} aria-label={t("footer.socialLabel")}>
//                 <p>{t("footer.followUs")}</p>
//                 <div className={styles.socialIcons}>
//                     {settings.snapchat_url && (
//                         <a href={settings.snapchat_url} target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
//                             <FaSnapchatGhost size={26}/>
//                         </a>
//                     )}
//
//                     {settings.youtube_url && (
//                         <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
//                             <FaYoutube size={26}/>
//                         </a>
//                     )}
//
//                     {settings.twitter_url && (
//                         <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
//                             <RiTwitterXLine size={26}/>
//                         </a>
//                     )}
//
//                     {settings.instgram_url && (
//                         <a href={settings.instgram_url} target="_blank" rel="noopener noreferrer"
//                            aria-label="Instagram">
//                             <PiInstagramLogoFill size={26}/>
//                         </a>
//                     )}
//
//                     {settings.facebook_url && (
//                         <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
//                             <FaFacebookSquare size={26}/>
//                         </a>
//                     )}
//                 </div>
//
//             </div>
//
//             <div className={styles.links} aria-label={t("footer.pagesLabel")}>
//                 <p>{t("footer.pages")}</p>
//                 <ul>
//                     <li><Link href="/#">{t("footer.about")}</Link></li>
//                     <li><Link href="/contact-us">{t("footer.contact")}</Link></li>
//                     <li><Link href="/terms-and-conditions">{t("footer.privacy")}</Link></li>
//                     <li><Link href="/return-policy">{t("footer.returnPolicy")}</Link></li>
//                     <li><Link href="/shipment-policies">{t("footer.shippingPolicy")}</Link></li>
//                     <li><Link href="/FAQ-list">{t("footer.faq")}</Link></li>
//                 </ul>
//             </div>
//
//             <div className={styles.contactInfo} aria-label={t("footer.contactInfo")}>
//                 <p>{t("footer.contactInfo")}</p>
//                 <p><MdOutlinePhoneInTalk size={24}/><span dir="ltr">{settings.telephone}</span></p>
//                 <p><PiWhatsappLogo size={24}/><span dir="ltr">{settings.whatsapp}</span></p>
//                 <p><HiOutlineMail size={24} />{settings.email}</p>
//             </div>
//
//             <div className={styles.downloadSection} aria-label={t("footer.downloadApp")}>
//                 <Image
//                     src={"/logoFotter.png"}
//                     alt="RWADY Logo"
//                     width={256}
//                     height={66}
//                     className={styles.logo}
//                     priority
//                 />
//                 <p className={styles.description}>{t("footer.description")}</p>
//                 <div className={styles.downloadButtons}>
//                     <a href={settings.client_app_andriod_url} target="_blank" rel="noopener noreferrer" aria-label="Android App">
//                         {googlePlayDownloadButton}
//                     </a>
//                     <a href={settings.client_app_ios_url} target="_blank" rel="noopener noreferrer" aria-label="iOS App">
//                         {appleDownloadButton}
//                     </a>
//                 </div>
//             </div>
//
//             <hr className={styles.footerLine} />
//             <div className={styles.footerBottom}>
//                 <p>جميع الحقوق محفوظة لـ RWADY</p>
//             </div>
//             <FloatingButton ariaLabel="زر تحميل التطبيق" />
//         </footer>
//     );
// };
//
// export default Footer;


// app/[locale]/_components/Footer.jsx
import styles from './Footer.module.css';
import {
    FaFacebookSquare, FaSnapchatGhost, FaYoutube
} from "react-icons/fa";
import {
    PiInstagramLogoFill, PiWhatsappLogo
} from "react-icons/pi";
import { RiTwitterXLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePhoneInTalk } from "react-icons/md";

import {appleDownloadButton, DownloadIcon, googlePlayDownloadButton} from "@/utils/Icons";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import FloatingButton from "@/Components/FloatingButton/FloatingButton";

const Footer = () => {
    const t = useTranslations("footer");

    const settings = {
        snapchat_url: "#",
        youtube_url: "#",
        twitter_url: "#",
        instgram_url: "#",
        facebook_url: "#",
        telephone: "+963-999-999-999",
        whatsapp: "+963-999-888-888",
        email: "support@rwady.com",
        client_app_andriod_url: "#",
        client_app_ios_url: "#",
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.socialLinks} aria-label={t("socialLabel")}>
                <p>{t("followUs")}</p>
                <div className={styles.socialIcons}>
                    {settings.snapchat_url && <a href={settings.snapchat_url}><FaSnapchatGhost size={26}/></a>}
                    {settings.youtube_url && <a href={settings.youtube_url}><FaYoutube size={26}/></a>}
                    {settings.twitter_url && <a href={settings.twitter_url}><RiTwitterXLine size={26}/></a>}
                    {settings.instgram_url && <a href={settings.instgram_url}><PiInstagramLogoFill size={26}/></a>}
                    {settings.facebook_url && <a href={settings.facebook_url}><FaFacebookSquare size={26}/></a>}
                </div>
            </div>

            <div className={styles.links} aria-label={t("pagesLabel")}>
                <p>{t("pages")}</p>
                <ul>
                    <li><Link href="/#">{t("about")}</Link></li>
                    <li><Link href="/contact-us">{t("contact")}</Link></li>
                    <li><Link href="/terms-and-conditions">{t("privacy")}</Link></li>
                    <li><Link href="/return-policy">{t("returnPolicy")}</Link></li>
                    <li><Link href="/shipment-policies">{t("shippingPolicy")}</Link></li>
                    <li><Link href="/FAQ-list">{t("faq")}</Link></li>
                </ul>
            </div>

            <div className={styles.contactInfo} aria-label={t("contactInfo")}>
                <p>{t("contactInfo")}</p>
                <p><MdOutlinePhoneInTalk size={24}/> <span dir="ltr">{settings.telephone}</span></p>
                <p><PiWhatsappLogo size={24}/> <span dir="ltr">{settings.whatsapp}</span></p>
                <p><HiOutlineMail size={24}/> {settings.email}</p>
            </div>

            <div className={styles.downloadSection} aria-label={t("downloadApp")}>
                <Image src={"/logoFotter.png"} alt="RWADY Logo" width={256} height={66} className={styles.logo}
                       priority/>
                <p className={styles.description}>{t("description")}</p>
                <div className={styles.downloadButtons}>
                    <a href={settings.client_app_andriod_url}>{googlePlayDownloadButton}</a>
                    <a href={settings.client_app_ios_url}>{appleDownloadButton}</a>
                </div>
            </div>

            <hr className={styles.footerLine}/>
            <div className={styles.footerBottom}>
                <p>{t('copyright')}</p>
            </div>


            <FloatingButton
                ariaLabel="زر تحميل التطبيق"
                icon={DownloadIcon}
                href="https://your-app-link"
            />
            <FloatingButton
                ariaLabel="تواصل معنا عبر واتساب"
                className={"whatsappIcon"}
                icon={
                    <PiWhatsappLogo  size={26} />}
                href="https://wa.me/966500000000"
                position="left"
            />
        </footer>
    );
};

export default Footer;
