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



import Home from "@/Components/HomePage/Home";

export const revalidate = 300;          
export const dynamic = 'force-static';   
export const fetchCache = 'force-cache';  
export default function HomePage() {

    return (
            <Home/>
    );
}
