import React, { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import { getProductDetails } from "@/api/services/getProductDetails";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import { notFound } from "next/navigation";
import { getProducts } from "@/api/services/listProducts";
import { slugify } from "@/utils/slugify";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

export async function generateStaticParams() {
    try {
        const products = await getProducts();
        return products.map((product) => ({
            id: product.id.toString(),
            slug: slugify(product.name),
        }));
    } catch (error) {
        console.error("Error generating static params:", error.message);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const product = await getProductDetails(id);
        return {
            title: `${product?.name || "تفاصيل المنتج"} - روادي`,
            description: product?.description || "صفحة عرض تفاصيل المنتج على متجر روادي.",
            openGraph: {
                title: product?.name || "تفاصيل المنتج - روادي",
                description: product?.description || "تفاصيل المنتج على متجر روادي",
                images: [
                    {
                        url: product?.main_img || "/images/Products/p5.jpeg",
                        width: 800,
                        height: 600,
                        alt: product?.name,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: product?.name || "تفاصيل المنتج - روادي",
                description: product?.description || "تفاصيل المنتج على متجر روادي",
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

const DynamicProductDetailsPage = async ({ params }) => {
    const { id } = await params;

    return (
        <>
            <Navbar />
            <Breadcrumb
                isSubUrl={true}
                subName="كل المنتجات"
                subUrl="/products"
                currentPage="تفاصيل المنتج"
            />
            <Suspense fallback={<Loading />}>
                <ProductDetailsData dataPromise={getProductDetails} id={id} />

                <TitleSection initTitle={"منتجات مشابهة"}/>
                <EmptyState message={"لا توجد منتجات لعرضها حالياً"}/>
            </Suspense>
            <Footer />
        </>
    );
};

export default DynamicProductDetailsPage;

export async function ProductDetailsData({ dataPromise, id }) {
    let initialData = {};
    let initialError = false;

    try {
        const data = await dataPromise(id);
        if (!data || !data.id) {
            return notFound();
        }
        initialData = data;
    } catch (error) {
        console.error("Data Fetch Error:", error.message);
        initialError = true;
    }
    if (!initialData || Object.keys(initialData).length === 0) {
        return <EmptyState message="المنتج غير موجود" />;
    }
    return (
        <ProductDetails
            id={id}
            initialData={initialData}
            initialError={initialError}
            getData={dataPromise}
            keyData={`productDetails-${id}`}
        />
    );
}