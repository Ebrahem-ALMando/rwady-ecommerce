import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Products from "@/Components/Products/Products";
import InitProductsPage from "@/Components/Products/InitProductsPage";

const ProductsPage = async ({ searchParams }) => {
    const search=await searchParams;
    console.log(search)

    return(
        <>
            <Navbar/>

            <InitProductsPage
                searchParams={search}
            />


            <Footer/>
        </>
    )
}
export default ProductsPage;