import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/HomePage/Footer";
import Checkout from "@/Components/Checkout/Checkout";

const CheckoutPage=props=>{
    return(
        <>
            <Navbar/>
            <Checkout/>
            <Footer/>
        </>
    )
}
export default CheckoutPage;