import {notFound} from "next/navigation";
import React, { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import {getRecentAddedProducts} from "@/api/services/listRecentAddedProducts";
import {getTopSellingProducts} from "@/api/services/listTopSellingProducts";
import {getOffers} from "@/api/services/listOffers";
import {getRecommendProducts} from "@/api/services/listRecommendProducts";
import ProductCollections from "@/Components/ProductCollections/ProductCollections";


export async function generateStaticParams() {
    return [
        { collection: "recently-added" },
        { collection: "top-selling" },
        { collection: "offers-list" },
        { collection: "recommend-list" },
        { collection: "favourites" },
    ];
}

export async function generateMetadata({ params }) {
    const { collections } = await params;

    const titles = {
        "recently-added": "المضافة حديثًا - روادي",
        "top-selling": "الأكثر مبيعًا - روادي",
        "offers-list": "العروض والتخفيضات - روادي",
        "recommend-list": "المميزة - روادي",
        "favourites": "المفضلة - روادي",
    };

    return {
        title: titles[collections] || "روادي",
        description: `استعرض ${titles[collections] || "محتوى"} بأفضل تجربة تسوق على روادي.`,
    };
}

const DynamicProductCollectionPage = async ({ params }) => {
    const { collections } = params;

    const config = {
        "recently-added": { title: "المضافة حديثًا", dataPromise: getRecentAddedProducts },
        "top-selling": { title: "الأكثر مبيعًا", dataPromise: getTopSellingProducts },
        "offers-list": { title: "العروض", dataPromise: getOffers },
        "recommend-list": { title: "المقترحة", dataPromise: getRecommendProducts },
        "favourites": { title: "المفضلة", dataPromise: null },
    };

    const section = config[collections];
    if (!section) return notFound();

    return (
        <>
            <Navbar />
            {/*<Breadcrumb currentPage={section.title} />*/}
            {/*<Suspense fallback={<Loading />}>*/}
            {/*    <ProductCollectionsData*/}
            {/*        title={section.title}*/}
            {/*        collection={collections}*/}
            {/*        dataPromise={section.dataPromise}*/}
            {/*    />*/}
            {/*</Suspense>*/}
            <Footer />
        </>
    );
};


export default DynamicProductCollectionPage;
export async function ProductCollectionsData({ title,dataPromise, collection,  }) {
    let initialData = [];
    let initialError = false;

    if (collection !== "favourites" && typeof dataPromise === "function") {
        try {
            const data = await dataPromise();
            initialData = data || [];
        } catch (error) {
            console.error("Data Fetch Error:", error.message);
            initialError = true;
        }
    }

    return (
        <ProductCollections
            title={title}
            initialData={initialData}
            initialError={initialError}
            getData={dataPromise}
            keyData={collection}
        />
    );
}
