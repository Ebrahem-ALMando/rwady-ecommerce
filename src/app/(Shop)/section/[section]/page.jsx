import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import { getCategories } from "@/api/services/listCategories";
import { getBrands } from "@/api/services/listBrands";
import { getGroups } from "@/api/services/listGroups";
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import { toast } from "react-hot-toast";

export async function generateStaticParams() {
    return [
        { section: "categories" },
        { section: "brands" },
        { section: "groups" },
    ];
}

export async function generateMetadata({ params }) {
    const { section } =await params;

    const titles = {
        categories: "التصنيفات - روادي",
        brands: "الماركات - روادي",
        groups: "المجموعات - روادي",
    };

    return {
        title: titles[section] || "روادي",
        description: `استعرض ${titles[section] || "محتوى"} بأفضل تجربة تسوق على روادي.`,
    };
}

const DynamicShopSectionPage = async ({ params }) => {
    const { section } =await params;

    let dataFn = null;
    let arSection = null;

    switch (section) {
        case "categories":
            dataFn = getCategories;
            arSection = "الاقسام";
            break;
        case "brands":
            dataFn = getBrands;
            arSection = "الماركات";
            break;
        case "groups":
            dataFn = getGroups;
            arSection = "المجموعات";
            break;
        default:
            notFound();
    }

    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <SectionTemplateData
                    section={section}
                    arSection={arSection}
                    dataPromise={dataFn}
                />
            </Suspense>
            <Footer />
        </>
    );
};

export default DynamicShopSectionPage;

export async function SectionTemplateData({ dataPromise, section, arSection }) {
    let initialData = [];
    let initialError = false;

    try {
        const data = await dataPromise();
        initialData = data || [];
    } catch (error) {
        console.error("Data Fetch Error:", error.message);
        initialError = true;
    }

    return (
        <DropdownMenu
            initialData={initialData}
            initialError={initialError}
            getData={dataPromise}
            keyData={section}
            arSection={arSection}
        />
    );
}
