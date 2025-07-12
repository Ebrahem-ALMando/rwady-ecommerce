// import HeroCarouselSection from "@/Components/HomePage/HeroCarouselSection/HeroCarouselSection";
// import CategoriesSection from "@/Components/HomePage/CategoriesSection/CategoriesSection";
// import TopSellingProductsSection from "@/Components/HomePage/TopSellingProductsSection/TopSellingProductsSection";
// import PromoSection from "@/Components/HomePage/PromoSection/PromoSection";
// import MovingProductsBarSection from "@/Components/HomePage/MovingProductsBarSection/MovingProductsBarSection";
// import OffersListSection from "@/Components/HomePage/OffersListSection/OffersListSection";
// import DownSliderSection from "@/Components/HomePage/DownSliderSection/DownSliderSection";
// import RecentlyAddedProductsSection from "@/Components/HomePage/RecentlyAddedProductsSection/RecentlyAddedProductsSection";
// import BrandsSection from "@/Components/HomePage/BrandsSection/BrandsSection";
// // import ScrollToTop from "@/Components/ScrollToTop";
// import Footer from "@/Components/Footer/Footer";
// import Navbar from "@/Components/Header/Navbar";
// import StepProgressBar from "@/Components/Shared/StepProgressBar/StepProgressBar";
//
//
//
//
// export default function HomePage() {
//
//     return (
//     <>
//
//
//
//           {/*<FullScreenLoader duration={1800} />*/}
//
//
//
//           {/*<ScrollToTop />*/}
//
//         <Navbar/>
//
//         <HeroCarouselSection/>
//
//         <CategoriesSection/>
//
//
//         {/*<TopHomeCategory/>*/}
//
//
//
//
//         <TopSellingProductsSection/>
//
//
//         <PromoSection/>
//
//
//         <MovingProductsBarSection/>
//
//
//
//
//         <OffersListSection/>
//
//
//         <DownSliderSection/>
//
//         {/*<TitleSection initTitle="المجموعات" />*/}
//         {/*<GroupsCarousel/>*/}
//
//
//         {/*/!*<HomeCategoryWithProducts/>*!/*/}
//
//         <RecentlyAddedProductsSection/>
//
//
//
//         <BrandsSection/>
//
//
//
//         <Footer/>
//
//     </>
//   );
// }


import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
// import Navbar from "@/Components/Header/Navbar";
import Home from "@/Components/HomePage/Home";
// import Footer from "@/Components/Footer/Footer";

export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div>
            {/*<Navbar/>*/}
            {/*<h1>{t('title')}</h1>*/}
            {/*<Link href="/contact-us">{t('about')}</Link>*/}
            <Home/>
            {/*<Footer/>*/}
        </div>
    );
}
