// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
// // import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
// // import Error from "@/Components/Shared/Error/Error";
// // import Loading from "@/Components/Shared/Loading/Loading";
// // import { getFaqs } from "@/api/services/FAQList";
//
// const FAQListPage = async () => {
//     return(
//         <h1>
//
//         </h1>
//     )
//     // try {
//     //     const faqs = await getFaqs();
//     //     const faqsData = Array.isArray(faqs.data) ? faqs.data : [faqs.data] || [];
//     //     return (
//     //         <>
//     //             <Navbar />
//     //             <PageContainer title="الأسئلة الشائعة" faqs={faqsData} isFAQ={true} />
//     //             <Footer />
//     //         </>
//     //     );
//     // } catch (error) {
//     //     console.error("Error fetching FAQs:", error.message);
//     //
//     //     return (
//     //         <>
//     //             <Navbar />
//     //             <Error message="يرجى إعادة تحميل الصفحة" />
//     //             <Footer />
//     //         </>
//     //     );
//     // }
// };
//
// export default FAQListPage;




// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import { getTranslations } from "next-intl/server";
import { extractSettingValue } from "@/utils/extractSettingValue";
import { getSettingData } from "@/utils/getSettingsData";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";

export async function generateMetadata({ params }) {

    const { locale } = await params;
    const t = await getTranslations({locale, namespace: "faq" });
    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/faq",
            languages: {
                ar: "/ar/faq",
                en: "/en/faq"
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${params}/faq`,
            siteName: "Rwady",
            type: "website",
            locale: params,
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
        category: "FAQs",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default async function FAQListPage({ params }) {
    const {locale} = await params;
    const t = await getTranslations("faq");

    const { settingData, initialError } = await getSettingData();
    const faqContent = extractSettingValue(
        settingData,
        `pages.frequently_asked_questions.${locale}`
    );

    return (
        <>

           {/*<Navbar />*/}
             <PageContainer title={t("title")}
                            initialError={initialError || !faqContent}
                            // faqs={faqsData}
                            faqContent={faqContent}
                            isFAQ={true} />
           {/*<Footer />*/}
        </>
    );
}
{/*<main className="container mx-auto px-4 py-10 max-w-4xl">*/}
{/*    <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>*/}
{/*    {initialError || !faqContent ? (*/}
{/*        <p className="text-center text-red-500">{t("error")}</p>*/}
{/*    ) : (*/}
{/*        <div*/}
{/*            className="prose max-w-none"*/}
{/*            dangerouslySetInnerHTML={{ __html: faqContent }}*/}
{/*        />*/}
{/*    )}*/}
{/*</main>*/}