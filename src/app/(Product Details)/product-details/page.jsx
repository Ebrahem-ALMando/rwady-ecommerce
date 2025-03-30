import Navbar from "@/Components/Header/Navbar";
import Products from "@/Components/Products/Products";
import Footer from "@/Components/Footer/Footer";
import ProductDetails from "@/Components/ProductDetails/ProductDetails";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";

import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";



const ProductDetailsPage=props=>{
    // const router = useRouter();
    // const { id } = router.query;
    return(
        <>
            <Navbar/>
            <Breadcrumb
                isSubUrl={true}
                subName={"كل المنتجات"}
                subUrl={"/products"}
                currentPage="تفاصيل المنتج" />
            <ProductDetails/>
            <TitleSection title="منتجات مشابهة" />
            {/*<ProductSlider/>*/}
            <Footer/>
        </>
    )
}
export default ProductDetailsPage