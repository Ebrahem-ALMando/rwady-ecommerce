
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
import FloatingButton from "@/Components/FloatingButton/FloatingButton";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
const FooterUI = ({t,settings,links,initialError}) => {

    if(initialError) return <ReloadWithError/>
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
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
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

            {settings.client_app_andriod_url && (
  <FloatingButton
   
    position="auto"
    actions={[
      settings.whatsapp && {
        key: "wa",
        label: "تواصل عبر واتساب",
        iconKey: "whatsapp",
        href: `https://wa.me/${(settings.whatsapp || "").replace(/[^0-9]/g, "")}`,
        brandColor: "#25D366",
        iconColor: "#25D366",
      },
      settings.client_app_andriod_url && {
        key: "dl",
        label: "تحميل التطبيق",
        iconKey: "download",
        href: settings.client_app_andriod_url,
        brandColor: "#007BFF",
        iconColor: "#007BFF",
      },
    ].filter(Boolean)}
  />
)}


        </footer>
    );
};

export default FooterUI;