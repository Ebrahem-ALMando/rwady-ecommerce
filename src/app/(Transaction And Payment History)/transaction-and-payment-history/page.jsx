import Navbar from "@/Components/Header/Navbar";
import Orders from "@/Components/Orders/Orders";
import Footer from "@/Components/HomePage/Footer";
import TransactionAndPaymentHistory from "@/Components/TransactionAndPaymentHistory/TransactionAndPaymentHistory";

const TransactionAndPaymentHistoryPage = (props) => {
    return(
        <>
            <Navbar/>
            <TransactionAndPaymentHistory/>
            <Footer/>
        </>
    )
}
export default TransactionAndPaymentHistoryPage