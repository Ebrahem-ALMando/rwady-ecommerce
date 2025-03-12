import Navbar from "@/Components/Header/Navbar";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
import Footer from "@/Components/HomePage/Footer";
import Favourite from "@/Components/Favourite/Favourite";

const FavouritePage=(props)=>{
    return(
        <>
            <Navbar/>
            <Breadcrumb currentPage="المفضلة" />
            <Favourite/>
            <Footer/>
        </>
    )
}
export default FavouritePage