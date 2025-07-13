import {notFound} from "next/navigation";
import React, { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
// import {getRecentAddedProducts} from "@/api/services/listRecentAddedProducts";
// import {getTopSellingProducts} from "@/api/services/listTopSellingProducts";
// import {getOffers} from "@/api/services/listOffers";
// import {getRecommendProducts} from "@/api/services/listRecommendProducts";
// import ProductCollections from "@/Components/ProductCollections/ProductCollections";

import {getMessages, getTranslations} from "next-intl/server";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import ProductCollections from "@/Components/ProductCollections/ProductCollections";
import {getRecentAddedProducts} from "@/api/services/listRecentAddedProducts";
import {getTopSellingProducts} from "@/api/services/listTopSellingProducts";
import {getOffers} from "@/api/services/listOffers";
import {getRecommendProducts} from "@/api/services/listRecommendProducts";
// import ComingSoonPage from "@/Components/Shared/ComingSoonPage/ComingSoonPage";

// export async function generateStaticParams() {
//     return [
//         // { collection: "recently-added" },
//         // { collection: "top-selling" },
//         // { collection: "offers-list" },
//         // { collection: "recommend-list" },
//         { collection: "favourites" },
//     ];
// }

// export async function generateMetadata({ params, locale }) {
//     const messages = await getMessages();
//     const t = await getTranslations({ locale, namespace: 'productCollectionsMeta' });
//
//     const { collections } =await params;
//     const baseTitle = messages.productCollections?.[collections];
//     const fullTitle = baseTitle ? `${baseTitle}${t('titleSuffix')}` : t('defaultTitle');
//
//     return {
//         title: fullTitle,
//         description: t('description', {
//             title: baseTitle || t('defaultContent')
//         }),
//     };
// }



const DynamicProductCollectionPage = async ({ params }) => {
    const { collections } = await params;
    const t = await getTranslations('productCollections');

    const config = {
        "recently-added": { title: t("recently-added"), dataPromise: getRecentAddedProducts },
        "top-selling": { title: t("top-selling"), dataPromise: getTopSellingProducts },
        "offers-list": { title: t("offers-list"), dataPromise: getOffers },
        "recommend-list": { title: t("recommend-list"), dataPromise: getRecommendProducts },
        "favourites": { title: t("favourites"), dataPromise: null },
    };

    const section = config[collections];
    if (!section) return notFound();

    return (
        <>
            {/*<Navbar />*/}
            <Breadcrumb currentPage={section.title} />
            <Suspense fallback={<Loading />}>
                <ProductCollectionsData
                    title={section.title}
                    collection={collections}
                    dataPromise={section.dataPromise}
                />
            </Suspense>
            {/*<Footer />*/}
        </>
    );
};

export default DynamicProductCollectionPage;



export async function ProductCollectionsData({ title,dataPromise, collection,  }) {
    let initialData = [];
    let initialError = false;

    if (collection !== "favourites" && typeof dataPromise === "function") {
        const data = await dataPromise();
        initialError=data.error;
        console.log(data)
        initialData = data || [];
    }

    return (
      <>
          <ProductCollections
              title={title}
              initialData={initialData}
              initialError={initialError}
              // getData={dataPromise}
              keyData={collection}
          />

      </>
    );
}
