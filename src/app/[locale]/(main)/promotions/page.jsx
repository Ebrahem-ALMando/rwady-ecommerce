import { getTranslations } from "next-intl/server";
import PromotionsWrapper from "@/Components/Promotions/PromotionsWrapper";


export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "promotions" });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        keywords: t("metaKeywords"),
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
            type: "website",
            locale: locale,
            alternateLocale: locale === "ar" ? "en" : "ar",
        },
        twitter: {
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
        alternates: {
            canonical: `/promotions`,
            languages: {
                "ar": "/ar/promotions",
                "en": "/en/promotions",
            },
        },
    };
}

export default function PromotionsPage() {
    return (
            <PromotionsWrapper />
    );
}

