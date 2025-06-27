import React, { Suspense } from "react";
// import Loading from "@/Components/Shared/Loading/Loading";
import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import { getProductDetails } from "@/api/services/getProductDetails";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";
// import { getProducts } from "@/api/services/listProducts";
import { slugify } from "@/utils/slugify";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import {getTranslations} from "next-intl/server";
import Loading from "@/Components/Shared/Loading/Loading";

// export async function generateStaticParams() {
//     // try {
//     //     // const response = await getProducts();
//     //     // const products = response?.data || [];
//     //
//     //     // return products.map((product) => ({
//     //     //     id: product.id.toString(),
//     //     //     slug: slugify(product.name),
//     //     // }));
//     // } catch (error) {
//     //     console.error("Error generating static params:", error.message);
//     //     return [];
//     // }
// }
//
//
export async function generateMetadata({ params }) {

    const { id,slug,locale } = await params;

    try {
        const productInfo = await getProductDetails(id);
        const product=productInfo?.data
        return {
            title: `${product?.name?.[locale] || "تفاصيل المنتج"} - روادي`,
            description: product?.description?.[locale] || "صفحة عرض تفاصيل المنتج على متجر روادي.",
            openGraph: {
                title: product?.name?.[locale] || "تفاصيل المنتج - روادي",
                description: product?.description?.[locale] || "تفاصيل المنتج على متجر روادي",
                images: [
                    {
                        url: product?.main_img || "/images/Products/p5.jpeg",
                        width: 800,
                        height: 600,
                        alt: product?.name?.[locale],
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: product?.name?.[locale] || "تفاصيل المنتج - روادي",
                description: product?.description?.[locale] || "تفاصيل المنتج على متجر روادي",
                images: [product?.main_img || "/images/Products/p5.jpeg"],
            },
        };
    } catch {
        return {
            title: "المنتج غير موجود - روادي",
            description: "هذا المنتج غير متوفر حاليًا.",
        };
    }
}

const DynamicProductDetailsPage =async  ({params}) => {
    const { id,slug,locale } = await params;

    const t = await getTranslations({ locale, namespace: "Breadcrumb" });
    return (
        <>
            <Navbar />
            <Breadcrumb
                isSubUrl={true}
                subName={t("all_products")}
                subUrl="/products"
                currentPage={t("product_details")}
            />
            <Suspense fallback={<Loading />}>
                <ProductDetailsData
                id={id}
                lang={locale}
                />
            </Suspense>
            {/*<Footer />*/}
        </>
    );
};

export default DynamicProductDetailsPage;


export async function ProductDetailsData({id,lang }) {

    let initialError = false;
    const initialData = await getProductDetails(id);
    const data = initialData?.data || []
    if (!data || Object.keys(data).length === 0) {
        return <EmptyState message="المنتج غير موجود"/>;
    }
    initialError=initialData?.error
    console.log(data)
    return (
    <section>

        <ProductDetails
            id={id}
            lang={lang}
            initialData={data}
            initialError={initialError}
            keyData={`productDetails-${id}`}
        />
        {/*<TitleSection*/}
        {/*    initTitle={"منتجات مشابهة"}*/}
        {/*    initLink={"/section/categories"}*/}
        {/*    can_show_more={can_show_more}*/}
        {/*    show_more={`/section/${show_more_path}`}*/}
        {/*    show_title={show_title}*/}
        {/*    title={title?.[lang]}*/}
        {/*    lang={lang}*/}
        {/*/>*/}
        {/*<TitleSection initTitle={"منتجات مشابهة"}/>*/}
        {/*<EmptyState message={"لا توجد منتجات لعرضها حالياً"}/>*/}

    </section>
    );
}
