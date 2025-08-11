// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import { getLocale, getTranslations } from "next-intl/server";
// import { getSettingData } from "@/utils/getSettingsData";
// import { extractSettingValue } from "@/utils/extractSettingValue";
import {Suspense} from "react";
import PageSkeleton from "@/Components/Shared/PageContainer/Skeleton/PageSkeleton";



export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/about-us",
            languages: {
                ar: "/ar/about-us",
                en: "/en/about-us",
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${locale}/about-us`,
            siteName: "Rwady",
            type: "article",
            locale,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: "@rwady",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            }
        },
        category: "About Us",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default function AboutUsPage(){


    return(
        <Suspense fallback={<PageSkeleton />}>


asss
        {/* <AboutUsPageData /> */}
        
        </Suspense>
    )
}
// export  async function AboutUsPageData() {
//     const  locale  = await getLocale();
//     // const  locale  = lang;
//     const t = await getTranslations("about");

//     const { settingData, initialError } = await getSettingData();
//     const content = extractSettingValue(settingData, `pages.about_us.${locale}`);

//     return (
//         <>
//             {/*<Navbar />*/}
//                 <PageContainer
//                     title={t("title")}
//                     initialError={initialError || !content}
//                     data={content}
//                 />
//             {/*<Footer />*/}
//         </>
//     );
// }
