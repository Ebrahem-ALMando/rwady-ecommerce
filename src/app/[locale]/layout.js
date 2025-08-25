import { NextIntlClientProvider } from 'next-intl';
import {notFound} from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/globals.css";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@/Components/Shared/ProgressBar/ProgressBar";
import NetworkStatus from "@/Components/Shared/NetworkStatus/NetworkStatus";
import NotificationProvider from "@/Components/Shared/NotificationProvider/NotificationProvider";
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


export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}


export async function generateMetadata({ params }) {
    const { locale } =await params;

    const isArabic = locale === 'ar';

    return {
        title: isArabic
            ? "Rwady - أفضل متجر إلكتروني في العراق | عروض يومية وتوصيل سريع"
            : "Rwady - Best Online Store in Iraq | Daily Deals & Fast Delivery",

        description: isArabic
            ? "Rwady هو المتجر الإلكتروني الأول في العراق. استمتع بتجربة تسوق مريحة، منتجات أصلية، عروض حصرية، وتوصيل إلى جميع المحافظات العراقية."
            : "Rwady is Iraq’s top online store. Enjoy a smooth shopping experience, original products, exclusive offers, and fast delivery all over Iraq.",

        keywords: [
            "Rwady", "روادي", "متجر إلكتروني العراق", "تسوق أونلاين العراق", "عروض العراق",
            "منتجات أصلية", "توصيل سريع العراق", "ملابس", "إلكترونيات", "عطور", "مكياج", "بغداد",
            "اربيل", "تسوق بغداد", "روادي العراق"
        ],

        openGraph: {
            title: isArabic
                ? "Rwady - تسوق أونلاين في العراق | أفضل متجر إلكتروني"
                : "Rwady - Shop Online in Iraq | Best E-commerce Platform",

            description: isArabic
                ? "تسوّق الآن من Rwady وتمتع بأفضل المنتجات والعروض مع توصيل سريع لجميع أنحاء العراق."
                : "Shop now from Rwady and enjoy the best products and deals with fast delivery across Iraq.",

            url: "https://rwady.com",
            siteName: "Rwady العراق",
            images: [
                {
                    url: "https://rwady.com/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Rwady العراق - تسوق الآن",
                }
            ],
            locale: isArabic ? "ar_IQ" : "en_US",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: isArabic
                ? "Rwady العراق - عروض حصرية ومنتجات أصلية"
                : "Rwady Iraq - Exclusive Deals & Original Products",

            description: isArabic
                ? "Rwady هو وجهتك الأولى للتسوق الإلكتروني في العراق. منتجات مضمونة وتوصيل لجميع المحافظات."
                : "Rwady is your #1 online shopping destination in Iraq. Trusted products and fast delivery across all regions.",

            images: ["https://rwady.com/twitter-image.jpg"],
            creator: "@rwady_iq"
        },

        metadataBase: new URL("https://rwady.com"),

        alternates: {
            canonical: "https://rwady.com",
            languages: {
                "ar": "https://rwady.com/ar",
                "en": "https://rwady.com/en",
            },
        }
    };
}

export default async function LocaleLayout({ children, params }) {
    const { locale } =await params;
    if (!routing.locales.includes(locale)) notFound();
    setRequestLocale(locale);
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    const dir = locale === "ar" ? "rtl" : "ltr";
    return (
        <html lang={locale} dir={dir}>
        <body className={`${geistSans.variable} ${geistMono.variable} ${ibmArabic.variable} antialiased`}>
        <Toaster 
            position="top-right" 
            reverseOrder={false} 
            duration={5000}
            containerStyle={{
                top: 20,
                right: 20,
            }}
            toastOptions={{
                style: {
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                    boxShadow: 'none',
                },
            }}
        />
        <main >
        <div className="mainContainer">
            <ProgressBar/>
            <div className="child">
                <NetworkStatus/>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <NotificationProvider />
                    {children}
                     {/*<ScrollToTop/>*/}
                 
              </NextIntlClientProvider>
             </div>
         </div>
         </main>
         </body>
         </html>
    );
}
