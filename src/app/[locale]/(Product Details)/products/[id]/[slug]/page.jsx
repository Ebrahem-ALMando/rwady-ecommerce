import React, { Suspense } from "react";
// import Loading from "@/Components/Shared/Loading/Loading";
// import Navbar from "@/Components/Header/Navbar";
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
// import Footer from "@/Components/Footer/Footer";

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
            {/*<Navbar />*/}
            <Breadcrumb
                isSubUrl={true}
                subName={t("all_products")}
                subUrl="/products"
                currentPage={t("product_details")}
            />
            {/*<Suspense fallback={<Loading />}>*/}
                <ProductDetailsData
                id={id}
                lang={locale}
                />
            {/*</Suspense>*/}
            {/*<Footer />*/}
        </>
    );
};

export default DynamicProductDetailsPage;


export async function ProductDetailsData({id,lang }) {

    let initialError = false;
    const initialData = await getProductDetails(id);
    const data = initialData?.data || []

    initialError=initialData?.error

    const related_products=data?.related_products||[]
    const title=lang==='ar'?'منتجات مشابهة':'Related Products'
    const message=lang==='ar'?'لا توجد منتجات مشابهة لهذا المنتج':'There are no Related Products to this product.'
    const productMessage=lang==='ar'?'المنتج غير متوفر':'Product not available.'

    return (
    <section>
        {!data || Object.keys(data).length === 0 ?
            <div style={{width: '87%', margin: '3rem auto 1rem auto'}}>
                <EmptyState
                    initLink={`/${lang}/products`}
                    message={productMessage}/>
            </div>
            :
        <>
            <ProductDetails
                id={id}
                lang={lang}
                initialData={data}
                initialError={initialError}
                keyData={`productDetails-${id}`}
            />
            {!related_products || Object.keys(related_products).length === 0 ?
                <div style={{width: '80%', margin: '8rem auto 1rem auto'}}>
                    <EmptyState message={message}/>
                </div>
                :
                <TitleSection
                    initTitle={title}
                    initLink={`/${lang}/products`}
                    can_show_more={true}
                    // show_more={`/${lang}/products`}
                    show_title={true}
                    // title={title?.[lang]}
                    lang={lang}
                />
            }
        </>
        }



    </section>
    );
}
