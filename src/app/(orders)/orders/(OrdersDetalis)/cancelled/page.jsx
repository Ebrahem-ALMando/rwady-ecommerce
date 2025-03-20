import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/HomePage/Footer";
import OrderDetailsCancelled from "@/Components/Orders/OrdersDetails/OrderDetailsCancelled/OrderDetailsCancelled";

const OrderDetailsCancelledPage=(props)=>{
    return(
        <>
            <Navbar/>
            <OrderDetailsCancelled/>
            <Footer/>
        </>
    )
}
export default OrderDetailsCancelledPage