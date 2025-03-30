
import Carousel from "@/Components/Shared/SliderComponents/Carousel/Carousel";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";


import VideoSection from "@/Components/HomePage/VideoSection/VideoSection";
import MovingProductsBar from "@/Components/HomePage/MovingProductsBar/MovingProductsBar";
import ProductsCategoryCard from "@/Components/HomePage/ProductsCategoryCard/ProductsCategoryCard";
import CircleCartCarousel from "@/Components/HomePage/CategoriesCarousel/CategoriesCarousel";

import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Header/Navbar";
import ScrollToTop from "@/Components/ScrollToTop";
import CategoriesCarousel from "@/Components/HomePage/CategoriesCarousel/CategoriesCarousel";
import BrandsCarousel from "@/Components/HomePage/BrandsCarousel/BrandsCarousel";
import TopHomeCategory from "@/Components/HomePage/TopHomeCategory/TopHomeCategory";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";


export default async function Home() {

  return (
    <>
          <ScrollToTop />
          <Navbar/>
        <Carousel

        />
        <TitleSection title="الاقسام" />
        <CategoriesCarousel/>
        <TopHomeCategory/>
        <TitleSection title="الأكثر مبيعا" />
        <ProductSlider/>
        <VideoSection src={"/Paralax.m4v"}/>
        <MovingProductsBar/>
        <TitleSection title="احدث العروض" />
        <ProductSlider/>
        <ProductsCategoryCard/>
        <TitleSection title="ملابس نسائية" />
        <ProductSlider/>
        <TitleSection title="منتجات نسائية" />
        <ProductSlider/>
        <TitleSection title="الماركات" />
        <BrandsCarousel/>

        <Footer/>

    </>
  );
}
