import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Orders from "@/Components/Orders/Orders";

const OrdersPage=(props)=>{
    return(
        <>
            <Navbar/>
            <Orders/>
            <Footer/>
        </>
    )
}
export default OrdersPage