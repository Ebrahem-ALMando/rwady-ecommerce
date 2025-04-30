import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Products from "@/Components/Products/Products";
import InitProductsPage from "@/Components/Products/InitProductsPage";

const ProductsPage=props=>{
    return(
        <>
            <Navbar/>

            <InitProductsPage/>


            <Footer/>
        </>
    )
}
export default ProductsPage;