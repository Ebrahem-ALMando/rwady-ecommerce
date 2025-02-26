
import Carousel from "@/components/HomePage/Carousel";
import TitleSection from "@/components/HomePage/TitleSection";
import CategoriesCarousel from "@/components/HomePage/CategoriesCarousel";
import ProductSlider from "@/components/HomePage/ProductSlider";
import VideoSection from "@/components/HomePage/VideoSection";
import MovingProductsBar from "@/components/HomePage/MovingProductsBar";
import ProductsCategoryCard from "@/components/HomePage/ProductsCategoryCard";
import CircleCartCarousel from "@/components/HomePage/CategoriesCarousel";
import {Brands,category} from "@/Data/data";
import Footer from "@/components/HomePage/Footer";


export default function Home() {
  return (

    <>



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
