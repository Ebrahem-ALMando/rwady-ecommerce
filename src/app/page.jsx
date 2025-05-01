import Carousel from "@/Components/Shared/SliderComponents/Carousel/Carousel";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import VideoSection from "@/Components/HomePage/VideoSection/VideoSection";
import ProductsCategoryCard from "@/Components/HomePage/ProductsCategoryCard/ProductsCategoryCard";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Header/Navbar";
import ScrollToTop from "@/Components/ScrollToTop";
import CategoriesCarousel from "@/Components/HomePage/CategoriesCarousel/CategoriesCarousel";
import BrandsCarousel from "@/Components/HomePage/BrandsCarousel/BrandsCarousel";
import TopHomeCategory from "@/Components/HomePage/TopHomeCategory/TopHomeCategory";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";
import OffersList from "@/Components/HomePage/OffersList/OffersList";
import MovingProductsBarSlider from "@/Components/HomePage/MovingProductsBarSlider/MovingProductsBarSlider";
import RecentlyAddedProducts from "@/Components/HomePage/RecentlyAddedProducts/RecentlyAddedProducts";
import TopSellingProducts from "@/Components/HomePage/TopSellingProducts/TopSellingProducts";
import GroupsCarousel from "@/Components/HomePage/GroupsCarousel/GroupsCarousel";
import FullScreenLoader from "@/Components/Shared/FullScreenLoader/FullScreenLoader";


export default  function Home() {

  return (
    <>
          <FullScreenLoader duration={1800} />
          <ScrollToTop />

          <Navbar/>
        <Carousel/>
        <TitleSection initTitle="الاقسام" />
        <CategoriesCarousel/>
        {/*<TopHomeCategory/>*/}


        {/*<TitleSection initTitle="الأكثر مبيعا" />*/}
        {/*<ProductSlider/>*/}


        <TopSellingProducts/>
        <VideoSection src={"/Paralax.m4v"}/>
        <MovingProductsBarSlider/>


        {/*<MovingProductsBar/>*/}
        {/*<TitleSection initTitle="احدث العروض" />*/}
        {/*<ProductSlider/>*/}

        <OffersList/>
        <ProductsCategoryCard/>
        <TitleSection initTitle="المجموعات" />
        <GroupsCarousel/>
        <TitleSection
            initLink={"/products"}
            initTitle="ملابس نسائية" />
        <ProductSlider/>
        <TitleSection
            initLink={"/products"}
            initTitle="منتجات نسائية" />
        <ProductSlider/>

        {/*<HomeCategoryWithProducts/>*/}

        <RecentlyAddedProducts/>
        <TitleSection initTitle="الماركات" />
        <BrandsCarousel/>
        <Footer/>

    </>
  );
}
