// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import OrderDetails from "@/Components/Orders/OrdersDetails/OrderDetails/OrderDetails";


export async function generateMetadata() {
    return {
        title: "روادي - تفاصيل الطلب",
        description: "استعرض تفاصيل الطلب الخاصة بك بما في ذلك المنتجات، حالة الطلب، معلومات الشحن، والدفع - عبر منصة روادي.",
    };
}

const OrderDetailsPage = () => {
    return (
        <>
            {/*<Navbar />*/}
            <OrderDetails />
            {/*<Footer />*/}
        </>
    );
};

export default OrderDetailsPage;
