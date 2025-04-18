import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import OrderDetailsSuccessful from "@/Components/Orders/OrdersDetails/OrderDetailsSuccessful/OrderDetailsSuccessful";


const OrderDetailsSuccessfulPage = (props) => {
    return (
        <>
            <Navbar/>
            <OrderDetailsSuccessful/>
            <Footer/>
        </>
    );
};

export default OrderDetailsSuccessfulPage;
