
import Carousel from "@/Components/HomePage/Carousel";
import TitleSection from "@/Components/HomePage/TitleSection";
import CategoriesCarousel from "@/Components/HomePage/CategoriesCarousel";
import ProductSlider from "@/Components/HomePage/ProductSlider";
import VideoSection from "@/Components/HomePage/VideoSection";
import MovingProductsBar from "@/Components/HomePage/MovingProductsBar";
import ProductsCategoryCard from "@/Components/HomePage/ProductsCategoryCard";
import CircleCartCarousel from "@/Components/HomePage/CategoriesCarousel";
import {Brands,category} from "@/Data/data";
import Footer from "@/Components/HomePage/Footer";
import Navbar from "@/Components/Header/Navbar";
import ScrollToTop from "@/Components/ScrollToTop";
export default function Home() {
  return (
    <>
          <ScrollToTop />
          <Navbar/>
        <Carousel/>
        <TitleSection title="الاقسام" />
        <CircleCartCarousel
            data={category}
            isCategory={true} />
        <TitleSection title="الأدوات المنزلية" />
        <ProductSlider/>
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
        <CircleCartCarousel
           data={Brands}
           borderRadius={'10px'}
           bgColor={"#0741ad"}
        />
        <Footer/>
    </>
  );
}
