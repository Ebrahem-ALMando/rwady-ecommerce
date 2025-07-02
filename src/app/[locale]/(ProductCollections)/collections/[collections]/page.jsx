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
// import ComingSoonPage from "@/Components/Shared/ComingSoonPage/ComingSoonPage";

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
            {/* <ComingSoonPage/ > */}
            <main className="flex flex-col items-center justify-center  bg-white px-6 p-6 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/471/471664.png"
        alt="قيد التطوير"
        className="mb-6 w-[180px] h-[180px]"
        // priority
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        الصفحة قيد التطوير والاختبار
      </h1>
      <p className="text-lg md:text-xl text-gray-600">
        سيتم توفير الصفحة قريبًا، شكرًا لصبركم!
      </p>
    </main>
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
