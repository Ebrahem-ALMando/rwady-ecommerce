// "use server"
// import Navbar from "@/Components/Header/Navbar";
// // import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
// import Footer from "@/Components/Footer/Footer";
// // import { getTerms } from "@/api/services/terms";
// // import Error from "@/Components/Shared/Error/Error";
// // import {Suspense} from "react";
// // import Loading from "@/Components/Shared/Loading/Loading";
//
// const TermsAndConditionsPage = async () => {
//    //  let termsData = [];
//    //  let error = null;
//    //  let isError=false
//    //  const getData=async ()=>{
//    //      try {
//    //          const terms = await getTerms();
//    //          termsData = Array.isArray(terms.data) ? terms.data : [terms.data] || [];
//    //      } catch (err) {
//    //          console.error("Error fetching terms:", err.message);
//    //          error = err.message;
//    //      }
//    //  }
//    // await getData()
//    //
//    //  if (error) {
//    //      isError=true
//    //  }
//     return (
//         <>
//             <Navbar />
//             {/*{isError?*/}
//             {/*    (*/}
//             {/*    <Error*/}
//             {/*    message={"يرجى اعادة تحميل الصفحة"}*/}
//             {/*    />*/}
//             {/*    )*/}
//             {/*    :*/}
//             {/*    <Suspense fallback={<Loading />}>*/}
//             {/*        <PageContainer*/}
//             {/*            title={termsData[0].title}*/}
//             {/*            data={termsData}*/}
//             {/*        />*/}
//             {/*    </Suspense>*/}
//             {/*}*/}
//
//             <Footer />
//         </>
//     );
// };
//
// export default TermsAndConditionsPage;

//
// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import { getTranslations } from "next-intl/server";
import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";

export async function generateMetadata({ params }) {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "terms" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/terms-and-conditions",
            languages: {
                ar: "/ar/terms-and-conditions",
                en: "/en/terms-and-conditions"
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${params}/terms-and-conditions`,
            siteName: "Rwady",
            type: "article",
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
        category: "Terms and Conditions",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default async function TermsAndConditionsPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations("terms");

    const { settingData, initialError } = await getSettingData();
    const content = extractSettingValue(
        settingData,
        `pages.terms_and_conditions.${locale}`
    );

    return (
        <>
            {/*<Navbar />*/}
            <PageContainer
                title={t("title")}
                initialError={initialError || !content}
                data={content}
            />
            {/*<Footer />*/}
        </>
    );
}
