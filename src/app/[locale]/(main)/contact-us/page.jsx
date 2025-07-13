// // import Navbar from "@/Components/Header/Navbar";
// // import Footer from "@/Components/Footer/Footer";
// import ContactForm from "@/Components/ContactUs/ContactForm";
// import SocialLinks from "@/Components/SocialLinks/SocialLinks";
// import styles from "./ContactPage.module.css";
// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
//
// export const generateMetadata = () => ({
//   title: "تواصل معنا | Rwady",
//   description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة. نحن هنا لمساعدتك في أي وقت.",
//   keywords: ["تواصل", "دعم", "مساعدة", "Rwady", "اتصل بنا"],
//   metadataBase: new URL("https://rwady.com"),
//   openGraph: {
//     title: "تواصل معنا | Rwady",
//     description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة.",
//     url: "/contact",
//     siteName: "Rwady",
//     images: [
//       {
//         url: "/og-contact.jpg",
//         width: 800,
//         height: 600,
//       },
//     ],
//     locale: "ar_SA",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "تواصل معنا | Rwady",
//     description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة.",
//     images: ["/og-contact.jpg"],
//   },
//   alternates: {
//     canonical: "/contact",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     nocache: false,
//     googleBot: {
//       index: true,
//       follow: true,
//       noimageindex: false,
//     },
//   },
// });
//
// export default function ContactPage() {
//   return (
//     <div className={styles.container}>
//       <Navbar />
//
//       <main className={styles.main}>
//         <div className={styles.header}>
//           <h1>📩 تواصل معنا</h1>
//           <p>نحن هنا لمساعدتك. لا تتردد بإرسال استفسارك.</p>
//         </div>
//
//         <div className={styles.contentWrapper}>
//           <div className={styles.formSection}>
//             <ContactForm />
//           </div>
//           <div className={styles.socialSection}>
//             <SocialLinks />
//           </div>
//         </div>
//       </main>
//
//       <Footer />
//     </div>
//   );
// }

import ContactForm from "@/Components/ContactUs/ContactForm";
import SocialLinks from "@/Components/SocialLinks/SocialLinks";
import styles from "./ContactPage.module.css";
// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    keywords: t("meta_keywords"),
    metadataBase: new URL("https://rwady.com"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      url: `/${locale}/contact`,
      siteName: "Rwady",
      images: [{ url: "/og-contact.jpg", width: 800, height: 600 }],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_description"),
      images: ["/og-contact.jpg"],
    },
    alternates: {
      canonical: "/contact",
      languages: {
        ar: "/ar/contact",
        en: "/en/contact",
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
      <div className={styles.container}>
        {/*<Navbar />*/}

        <main className={styles.main}>
          <div className={styles.header}>
            <h1>📩 {t("title")}</h1>
            <p>{t("subtitle")}</p>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.formSection}>
              <h2>{t("formTitle")}</h2>
              <ContactForm />
            </div>
            <div className={styles.socialSection}>
              <h2>{t("socialTitle")}</h2>
              <SocialLinks />
            </div>
          </div>
        </main>

        {/*<Footer />*/}
      </div>
  );
}
