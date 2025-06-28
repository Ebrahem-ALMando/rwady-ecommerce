import Navbar from "@/Components/Header/Navbar";
import ShoppingCart from "@/Components/ShoppingCartAndPayment/ShoppingCart/ShoppingCart";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import Footer from "@/Components/Footer/Footer";

const Cart=()=>{
    return(
       <>
           <Navbar/>
           <ShoppingCart />
           <Footer/>
       </>
    )
}
export default Cart