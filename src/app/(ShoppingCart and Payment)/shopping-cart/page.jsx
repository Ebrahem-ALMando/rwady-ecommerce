import Navbar from "@/Components/Header/Navbar";
import ShoppingCart from "@/Components/ShoppingCartAndPayment/ShoppingCart/ShoppingCart";
import TitleSection from "@/Components/HomePage/TitleSection";
import Footer from "@/Components/HomePage/Footer";

const Cart=()=>{
    return(
       <>
           <Navbar/>
           {/*<TitleSection title="عربة التسوق" />*/}
           <ShoppingCart />
           <Footer/>
       </>
    )
}
export default Cart