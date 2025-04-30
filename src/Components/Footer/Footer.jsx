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

import { createTranslation } from "@/i18n/server";

const FooterData = async ({ dataPromise }) => {
    const { t, lang } = await createTranslation("common");

    let result;
    try {
        result = await dataPromise;
    } catch {
        return <Error message={t("footer.reloadError")} />;
    }

    if (!result?.data?.settings) {
        return <Error message={t("footer.reloadError")} />;
    }

    const settings = Array.isArray(result.data.settings)
        ? result.data.settings[0]
        : result.data.settings;

    return (
        <>
            <div className={styles.socialLinks} aria-label={t("footer.socialLabel")}>
                <p>{t("footer.followUs")}</p>
                <div className={styles.socialIcons}>
                    <a href={settings.snapchat_url || "#"} target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
                        <FaSnapchatGhost size={26} />
                    </a>
                    <a href={settings.youtube_url || "#"} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube size={26} />
                    </a>
                    <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <RiTwitterXLine size={26} />
                    </a>
                    <a href={settings.instgram_url || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <PiInstagramLogoFill size={26} />
                    </a>
                    <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebookSquare size={26} />
                    </a>
                </div>
            </div>

            <div className={styles.links} aria-label={t("footer.pagesLabel")}>
                <p>{t("footer.pages")}</p>
                <ul>
                    <li><Link href="/#">{t("footer.about")}</Link></li>
                    <li><Link href="/#">{t("footer.contact")}</Link></li>
                    <li><Link href="/terms-and-conditions">{t("footer.privacy")}</Link></li>
                    <li><Link href="/return-policy">{t("footer.returnPolicy")}</Link></li>
                    <li><Link href="/shipment-policies">{t("footer.shippingPolicy")}</Link></li>
                    <li><Link href="/FAQ-list">{t("footer.faq")}</Link></li>
                </ul>
            </div>

            <div className={styles.contactInfo} aria-label={t("footer.contactInfo")}>
                <p>{t("footer.contactInfo")}</p>
                <p><MdOutlinePhoneInTalk size={24} /><span dir="ltr">{settings.telephone}</span></p>
                <p><PiWhatsappLogo size={24} /><span dir="ltr">{settings.whatsapp}</span></p>
                <p><HiOutlineMail size={24} />{settings.email}</p>
            </div>

            <div className={styles.downloadSection} aria-label={t("footer.downloadApp")}>
                <Image
                    src={"/logoFotter.png"}
                    alt="RWADY Logo"
                    width={256}
                    height={66}
                    className={styles.logo}
                    priority
                />
                <p className={styles.description}>{t("footer.description")}</p>
                <div className={styles.downloadButtons}>
                    <a href={settings.client_app_andriod_url} target="_blank" rel="noopener noreferrer" aria-label="Android App">
                        {googlePlayDownloadButton}
                    </a>
                    <a href={settings.client_app_ios_url} target="_blank" rel="noopener noreferrer" aria-label="iOS App">
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
