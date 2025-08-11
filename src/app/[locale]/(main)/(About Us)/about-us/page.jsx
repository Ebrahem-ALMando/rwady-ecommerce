import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import { getTranslations } from "next-intl/server";
import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });

    const title = t("title");
    const description = t("description");
    const keywords = t("keywords");

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: "/about-us",
            languages: {
                ar: "/ar/about-us",
                en: "/en/about-us",
            }
        },
        openGraph: {
            title,
            description,
            url: `https://rwady.com/${locale}/about-us`,
            siteName: "Rwady",
            type: "article",
            locale,
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
        category: "About Us",
        icons: {
            icon: "/favicon.ico",
        }
    };
}

export default async function AboutUsPage({ params }) {
    const { locale } = await params;
    const t = await getTranslations("shippingPolicy");

    const { settingData, initialError } = await getSettingData();
    const content = extractSettingValue(
        settingData,
        `pages.about_us.${locale}`
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
