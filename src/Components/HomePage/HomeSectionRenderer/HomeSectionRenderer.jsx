import React from 'react';
import HeroCarouselSection from "@/Components/HomePage/HeroCarouselSection/HeroCarouselSection";
import CategoriesSection from "@/Components/HomePage/CategoriesSection/CategoriesSection";
import BrandsSection from "@/Components/HomePage/BrandsSection/BrandsSection";
import PromoSection from "@/Components/HomePage/PromoSection/PromoSection";
import MovingProductsBarSection from "@/Components/HomePage/MovingProductsBarSection/MovingProductsBarSection";
import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import DownSliderSection from "@/Components/HomePage/DownSliderSection/DownSliderSection";



const HomeSectionRenderer = ({ section, lang }) => {
    const { type } = section;

    switch (type) {
        case 'banner':
            return <HeroCarouselSection lang={lang} sectionResp={section} />;

        case 'category_list':
            return <CategoriesSection lang={lang} sectionResp={section} />;

        case 'brand_list':
            return <BrandsSection lang={lang} sectionResp={section} />;

        case 'video':
            return <PromoSection lang={lang} sectionResp={section} />;

        case 'recommended_products':
            return <MovingProductsBarSection lang={lang} sectionResp={section} />;
        case 'featured_sections':
            return <DownSliderSection lang={lang} sectionResp={section} />;
        default:
            if (type.includes('products') && type !== 'recommended_products') {
                return <HorizontalProductSection lang={lang} sectionResp={section} />;
            }
            return null;
    }
};


export default HomeSectionRenderer;