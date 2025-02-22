import Carousel from "@/Components/HomePage/Carousel";
import TitleSection from "@/Components/HomePage/TitleSection";
import CategoriesCarousel from "@/Components/HomePage/CategoriesCarousel";


export default function Home() {
  return (

    <>

     <Carousel/>
        <TitleSection title="الاقسام" />
        <CategoriesCarousel/>
        <TitleSection title="الأدوات المنزلية" />
    </>


  );
}
