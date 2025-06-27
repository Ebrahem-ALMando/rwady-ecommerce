// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import ContactForm from "@/Components/ContactUs/ContactForm";
import SocialLinks from "@/Components/SocialLinks/SocialLinks";
import styles from "./ContactPage.module.css";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";

export const generateMetadata = () => ({
  title: "تواصل معنا | Rwady",
  description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة. نحن هنا لمساعدتك في أي وقت.",
  keywords: ["تواصل", "دعم", "مساعدة", "Rwady", "اتصل بنا"],
  metadataBase: new URL("https://rwady.com"),
  openGraph: {
    title: "تواصل معنا | Rwady",
    description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة.",
    url: "/contact",
    siteName: "Rwady",
    images: [
      {
        url: "/og-contact.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "تواصل معنا | Rwady",
    description: "تواصل مع فريق دعم Rwady عبر قنوات التواصل المتعددة.",
    images: ["/og-contact.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
});

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>📩 تواصل معنا</h1>
          <p>نحن هنا لمساعدتك. لا تتردد بإرسال استفسارك.</p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.formSection}>
            <ContactForm />
          </div>
          <div className={styles.socialSection}>
            <SocialLinks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}