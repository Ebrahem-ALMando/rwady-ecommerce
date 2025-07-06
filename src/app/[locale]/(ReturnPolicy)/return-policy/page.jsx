// import Navbar from "@/Components/Header/Navbar";
// // import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
// import Footer from "@/Components/Footer/Footer";
// // import Error from "@/Components/Shared/Error/Error";
// // import {Suspense} from "react";
// // import Loading from "@/Components/Shared/Loading/Loading";
// // import {getSellingPolicies} from "@/api/services/sellingPolicies";
//
// const ReturnPolicyPage=async(props)=>{
//     // let sellingPoliciesData = [];
//     // let error = null;
//     // let isError=false
//     // const getData=async ()=>{
//     //     try {
//     //         const sellingPolicies = await getSellingPolicies();
//     //         sellingPoliciesData = Array.isArray(sellingPolicies.data) ? sellingPolicies.data : [sellingPolicies.data] || [];
//     //     } catch (err) {
//     //         console.error("Error fetching sellingPolicies:", err.message);
//     //         error = err.message;
//     //     }
//     // }
//     // await getData()
//     //
//     // if (error) {
//     //     isError=true
//     // }
//     return(
//         <>
//             <Navbar/>
//
//             {/*{isError?*/}
//             {/*    (*/}
//             {/*        <Error*/}
//             {/*            message={"يرجى اعادة تحميل الصفحة"}*/}
//             {/*        />*/}
//             {/*    )*/}
//             {/*    :*/}
//             {/*    <Suspense fallback={<Loading />}>*/}
//             {/*        <PageContainer*/}
//             {/*            title={sellingPoliciesData[0].title}*/}
//             {/*            data={sellingPoliciesData}*/}
//             {/*        />*/}
//             {/*    </Suspense>*/}
//             {/*}*/}
//             <Footer/>
//         </>
//     )
// }
// export default ReturnPolicyPage


import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import { getTranslations } from "next-intl/server";
import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: "returnPolicy" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/return-policy",
            languages: {
                ar: "/ar/return-policy",
                en: "/en/return-policy",
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${params}/return-policy`,
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
        category: "Return Policy",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default async function ReturnPolicyPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations("returnPolicy");

    const { settingData, initialError } = await getSettingData();
    const content = extractSettingValue(
        settingData,
        `pages.exchange_and_return_policy.${locale}`
    );

    return (
        <>
            <Navbar />
            <PageContainer
                title={t("title")}
                initialError={initialError || !content}
                data={content}
            />
            <Footer />
        </>
    );
}
