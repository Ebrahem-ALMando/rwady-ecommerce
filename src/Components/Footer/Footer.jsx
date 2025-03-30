import styles from './Footer.module.css';
import {FaFacebookSquare, FaSnapchatGhost, FaYoutube} from "react-icons/fa";
import React, {Suspense} from "react";
import {PiInstagramLogoFill, PiWhatsappLogo} from "react-icons/pi";
import {RiTwitterXLine} from "react-icons/ri";
import {HiOutlineMail} from "react-icons/hi";
import {MdOutlinePhoneInTalk} from "react-icons/md";
import Link from "next/link";
import FloatingDownloadButton from "@/Components/FloatingDownloadButton/FloatingDownloadButton";
import Error from "@/Components/Shared/Error/Error";
import {appleDownloadButton, googlePlayDownloadButton} from "@/utils/Icons";
import Loading from "@/Components/Shared/Loading/Loading";
import {getSettings} from "@/api/services/settings";

const Footer = () => {
    const dataPromise = getSettings();
    return (
        <footer className={styles.footer}>
            <Suspense fallback={<Loading />} >
                <FooterData dataPromise={dataPromise}/>
            </Suspense>

            <FloatingDownloadButton/>
        </footer>
    );
};

export default Footer;
export async function FooterData({dataPromise}){
    let listFooterData = [];
    let error = null;
    let isError=false
    const getData=async ()=>{
        try {
            const listSettings = await dataPromise;
            listFooterData = Array.isArray(listSettings.data.settings) ? listSettings.data.settings : [listSettings.data.settings] || [];
        } catch (err) {
            console.error("Error fetching setting:", err.message);
            error = err.message;
        }
    }
    await getData()

    if (error) {
        isError=true
    }
    return (
        <>
             {isError?
                (
                    <Error
                        message={"يرجى اعادة تحميل الصفحة"}
                    />
                )
                :
                 <>
                     <div className={styles.socialLinks}>
                         <p>تابعنا عبر</p>
                         <div className={styles.socialIcons}>
                             <a href={listFooterData[0].snapchat_url} target="_blank" rel="noopener noreferrer">
                                 <i className="fa ">
                                     <FaSnapchatGhost/>
                                 </i>
                             </a>
                             <a href={listFooterData[0].youtube_url} target="_blank" rel="noopener noreferrer">
                                 <i className="fa ">
                                     <FaYoutube/>
                                 </i>
                             </a>
                             <a href={listFooterData[0].twitter_url} target="_blank" rel="noopener noreferrer">
                                 <i className="fa ">
                                     <RiTwitterXLine/>
                                 </i>
                             </a>
                             <a href={listFooterData[0].instgram_url} target="_blank" rel="noopener noreferrer">
                                 <i className="fa ">
                                     <PiInstagramLogoFill/>
                                 </i>
                             </a>
                             <a href={listFooterData[0].facebook_url} target="_blank" rel="noopener noreferrer">
                                 <i className="fa">
                                     <FaFacebookSquare/>
                                 </i>
                             </a>
                         </div>
                     </div>
                     <div className={styles.links}>
                         <p>الصفحات</p>
                         <ul>
                             <Link href={"/#"}>
                                 <li>من نحن</li>
                             </Link>
                             <li>اتصل بنا</li>
                             <Link href={"/terms-and-conditions"}>
                                 <li>سياسة الخصوصية</li>
                             </Link>
                             <Link href={"/return-policy"}>
                                 <li>سياسة الاستبدال والاسترجاع</li>
                             </Link>
                             <Link href={"/shipment-policies"}>
                                 <li>سياسة الشحن والتوصيل</li>
                             </Link>
                             <Link href={"/FAQ-list"}>
                                 <li>الاسئلة الشائعة</li>
                             </Link>
                         </ul>
                     </div>
                     <div className={styles.contactInfo}>
                         <p>بـيـانات الـتـواصـل</p>

                         <p>
                                <span className={styles.icon}>
                                    <MdOutlinePhoneInTalk size={24}/>
                                </span>
                                 <span dir={"ltr"}>
                                     {listFooterData[0].telephone}
                                 </span>
                         </p>

                         <p>
                                <span className={styles.icon}>
                                    <PiWhatsappLogo size={24}/>
                                </span>
                                 <span dir={"ltr"}>
                                 {listFooterData[0].whatsapp}
                                </span>
                         </p>

                         <p>
                            <span className={styles.icon}>
                                <HiOutlineMail size={24}/>
                            </span>
                             {listFooterData[0].email}
                         </p>
                     </div>

                     <div className={styles.downloadSection}>
                         <img src="/logoFotter.png" alt="RWADY Logo" loading={"lazy"} className={styles.logo}/>

                         <p className={styles.description}>
                             اكتشف كل ما تحتاجه من ملابس وأساسيات وإلكترونيات من أدوات منزلية
                             بأفضل وأحسن الأنواع واحصل على كل ما هو جديد
                         </p>

                         <div className={styles.downloadButtons}>
                             <button >
                                 <a href={listFooterData[0].client_app_andriod_url} target="_blank" rel="noopener noreferrer">
                                     {googlePlayDownloadButton}
                                 </a>

                             </button>
                             <button >
                                 <a href={listFooterData[0].client_app_ios_url} target="_blank" rel="noopener noreferrer">
                                     {appleDownloadButton}
                                 </a>

                             </button>

                         </div>
                     </div>

                     <hr className={styles.footerLine}/>
                     <div className={styles.footerBottom}>
                         <p>
                             جميع الحقوق محفوظة ل RWADY
                         </p>
                     </div>
                 </>

             }

        </>
    )
}