import Navbar from "@/Components/Header/Navbar";
import Profile from "@/Components/Profile/Profile";
import Footer from "@/Components/Footer/Footer";
import Products from "@/Components/Products/Products";

const ProductsPage=props=>{
    return(
        <>
            <Navbar/>
            <Products/>
            <Footer/>
        </>
    )
}
export default ProductsPage;