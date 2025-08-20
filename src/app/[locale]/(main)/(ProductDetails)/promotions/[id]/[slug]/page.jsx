import React from "react";
import { getPromotionDetails } from "@/api/promotions/getPromotionDetails";
import { getPromotions } from "@/api/promotions/promotions";
import PromotionDetails from "@/Components/PromotionDetails/PromotionDetails";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import { slugify } from "@/utils/slugify";
import { getTranslations } from "next-intl/server";
import { pickLocalizedName, stripHtml } from "@/utils/productsPageHelper";
import { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import CategoriesCarousel from "@/Components/HomePage/CategoriesSection/CategoriesCarousel/CategoriesCarousel";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";
const LOCALES = ["ar", "en"];

// ----- Static Params -----
export async function generateStaticParams() {
  try {
    const response = await getPromotions("limit=50");
    const promotions = response?.data || [];

    const params = [];
    for (const promotion of promotions) {
      for (const locale of LOCALES) {
        const title = pickLocalizedName(promotion?.title, locale);
        const slug = slugify(title || String(promotion?.id ?? ""));
        if (!slug) continue;
        params.push({ locale, id: String(promotion.id), slug });
      }
    }

    return params;
  } catch (e) {
    console.error("Error generating static params:", e?.message || e);
    return [];
  }
}

// ----- Metadata -----
export async function generateMetadata({ params }) {
  const { id, locale } =await params;

  try {
    const promotionInfo = await getPromotionDetails(id);
    const promotion = promotionInfo?.data;

    const titleText = pickLocalizedName(promotion?.title, locale) || "تفاصيل الحملة الترويجية";
    const descText = "صفحة عرض تفاصيل الحملة الترويجية على متجر روادي.";

    return {
      title: `${titleText} - روادي`,
      description: descText,
      openGraph: {
        title: `${titleText} - روادي`,
        description: descText,
        type: "website",
        locale: locale,
        alternateLocale: locale === "ar" ? "en" : "ar",
      },
      twitter: {
        card: "summary_large_image",
        title: `${titleText} - روادي`,
        description: descText,
      },
      alternates: {
        canonical: `/promotions/${id}`,
        languages: {
          "ar": `/ar/promotions/${id}`,
          "en": `/en/promotions/${id}`,
        },
      },
    };
  } catch {
    return {
      title: "الحملة غير موجودة - روادي",
      description: "هذه الحملة الترويجية غير متوفرة حاليًا.",
    };
  }
}

// ----- Page -----
const DynamicPromotionDetailsPage = async ({ params }) => {
  const { id, locale } =await params;
  const t = await getTranslations({ locale, namespace: "Breadcrumb" });

  return (
    <>
      <Breadcrumb
        isSubUrl={true}
        subName={t("promotions")}
        subUrl={`/${locale}/promotions`}
        currentPage={t("promotion_details")}
      />
      <Suspense fallback={<Loading />}>
        <PromotionDetailsData id={id} lang={locale} />
      </Suspense>
    </>
  );
};

export default DynamicPromotionDetailsPage;


export async function PromotionDetailsData({ id, lang }) {
  const initialData = await getPromotionDetails(id);
  const data = initialData?.data || {};
  const initialError = Boolean(initialData?.error);

  const categories = data?.categories || [];
  const products = data?.products || [];
  
  const categoriesTitle = lang === "ar" ? "الأقسام " : " Categories";
  const productsTitle = lang === "ar" ? "المنتجات " : " Products";
  
  const categoriesMessage = lang === "ar" ? "لا توجد أقسام  في هذه الحملة" : "No categories in this promotion";
  const productsMessage = lang === "ar" ? "لا توجد منتجات  في هذه الحملة" : "No products in this promotion";
  const promotionMessage = lang === "ar" ? "الحملة غير متوفرة" : "Promotion not available";

  return (
    <section>
      {!data || Object.keys(data).length === 0 ? (
        <div style={{ width: "87%", margin: "3rem auto 1rem auto" }}>
          <EmptyState initLink={`/${lang}/promotions`} message={promotionMessage} />
        </div>
      ) : (
        <>
          <PromotionDetails
            id={id}
            lang={lang}
            initialData={data}
            initialError={initialError}
            keyData={`promotionDetails-${id}`}
          />

 
          {Array.isArray(categories) && categories.length > 0 && (
            <>
              <TitleSection
                initTitle={categoriesTitle}
                initLink={`./categories`}
                can_show_more={true}
                show_title={true}
                lang={lang}
              />
               <CategoriesCarousel  
                    data={categories||[]}
                    lang={lang}
                    />
            </>
          )}

    
          {Array.isArray(products) && products.length > 0 && (
            <>
              <TitleSection
                initTitle={productsTitle}
                initLink={`./products`}
                can_show_more={true}
                show_title={true}
                lang={lang}
              />
            <ProductSlider initialData={products}  />
            </>
          )}

   
          {(!categories || categories.length === 0) && data.type === "category" && (
            <div style={{ width: "80%", margin: "2rem auto 1rem auto" }}>
              <EmptyState message={categoriesMessage} />
            </div>
          )}

          {(!products || products.length === 0) && data.type === "product" && (
            <div style={{ width: "80%", margin: "2rem auto 1rem auto" }}>
              <EmptyState message={productsMessage} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
