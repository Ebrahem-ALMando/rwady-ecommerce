import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";

import {cookies} from "next/headers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const ibmArabic = IBM_Plex_Sans_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-arabic",
    display: "swap",
});


export const metadata = {
    title: "Rwady - أفضل متجر إلكتروني في العراق | عروض يومية وتوصيل سريع",
    description: "Rwady هو المتجر الإلكتروني الأول في العراق. استمتع بتجربة تسوق مريحة، منتجات أصلية، عروض حصرية، وتوصيل إلى جميع المحافظات العراقية.",
    keywords: [
        "Rwady", "روادي", "متجر إلكتروني العراق", "تسوق أونلاين العراق", "عروض العراق",
        "منتجات أصلية", "توصيل سريع العراق", "ملابس", "إلكترونيات", "عطور", "مكياج", "بغداد",
        "اربيل", "تسوق بغداد", "روادي العراق"
    ],
    openGraph: {
        title: "Rwady - تسوق أونلاين في العراق | أفضل متجر إلكتروني",
        description: "تسوّق الآن من Rwady وتمتع بأفضل المنتجات والعروض مع توصيل سريع لجميع أنحاء العراق.",
        url: "https://rwady.com",
        siteName: "Rwady العراق",
        images: [
            {
                url: "https://rwady.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Rwady العراق - تسوق الآن",
            },
        ],
        locale: "ar_IQ",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rwady العراق - عروض حصرية ومنتجات أصلية",
        description: "Rwady هو وجهتك الأولى للتسوق الإلكتروني في العراق. منتجات مضمونة وتوصيل لجميع المحافظات.",
        images: ["https://rwady.com/twitter-image.jpg"],
        creator: "@rwady_iq",
    },
    metadataBase: new URL("https://rwady.com"),
    alternates: {
        canonical: "https://rwady.com",
        languages: {
            "ar": "https://rwady.com",
            "en": "https://rwady.com/",
        },
    },
};


export default async function RootLayout({ children }) {
    const supportedLanguages = ["ar", "en"];
    const cookieStore =await cookies();
    const cookieLang = (await cookieStore.get("language"))?.value;
    const lang = supportedLanguages.includes(cookieLang) ? cookieLang : "ar";
    const dir = lang === "ar" ? "rtl" : "ltr";

    return (
        <html lang={lang} dir={dir}>
        <body className={`${geistSans.variable} ${geistMono.variable} ${ibmArabic.variable} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} duration={3000} />
        <div className="mainContainer">
            <div className="child">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}

