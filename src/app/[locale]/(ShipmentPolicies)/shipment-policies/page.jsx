// "use server"
// import Navbar from "@/Components/Header/Navbar";
// // import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
// import Footer from "@/Components/Footer/Footer";
// // import { getTerms } from "@/api/services/terms";
// // import Error from "@/Components/Shared/Error/Error";
// // import {Suspense} from "react";
// // import Loading from "@/Components/Shared/Loading/Loading";
// // import {getShipmentPolicies} from "@/api/services/shipmentPolicies";
//
// const ShipmentPoliciesPage = async () => {
//     // let shipmentPoliciesData = [];
//     // let error = null;
//     // let isError=false
//     // const getData=async ()=>{
//     //     try {
//     //         const shipmentPolicies = await getShipmentPolicies();
//     //         shipmentPoliciesData = Array.isArray(shipmentPolicies.data) ? shipmentPolicies.data : [shipmentPolicies.data] || [];
//     //     } catch (err) {
//     //         console.error("Error fetching terms:", err.message);
//     //         error = err.message;
//     //     }
//     // }
//     // await getData()
//     //
//     // if (error) {
//     //     isError=true
//     // }
//     return (
//         <>
//             <Navbar />
//             {/*{isError?*/}
//             {/*    (*/}
//             {/*        <Error*/}
//             {/*            message={"يرجى اعادة تحميل الصفحة"}*/}
//             {/*        />*/}
//             {/*    )*/}
//             {/*    :*/}
//             {/*    <Suspense fallback={<Loading />}>*/}
//             {/*        <PageContainer*/}
//             {/*            title={shipmentPoliciesData[0].title}*/}
//             {/*            data={shipmentPoliciesData}*/}
//             {/*        />*/}
//             {/*    </Suspense>*/}
//             {/*}*/}
//
//             <Footer />
//         </>
//     );
// };
//
// export default ShipmentPoliciesPage;


// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import { getTranslations } from "next-intl/server";
import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "shippingPolicy" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/shipping-policy",
            languages: {
                ar: "/ar/shipping-policy",
                en: "/en/shipping-policy",
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${locale}/shipping-policy`,
            siteName: "Rwady",
            type: "article",
            locale: locale,
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
        category: "Shipping Policy",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default async function ShipmentPoliciesPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations("shippingPolicy");

    const { settingData, initialError } = await getSettingData();
    const content = extractSettingValue(
        settingData,
        `pages.shipping_and_delivery_policy.${locale}`
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
