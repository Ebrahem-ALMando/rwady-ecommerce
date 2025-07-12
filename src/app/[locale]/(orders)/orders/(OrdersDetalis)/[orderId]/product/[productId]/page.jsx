// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import ProductOrderDetails from "@/Components/Orders/OrdersDetails/productOrderDetails/productOrderDetails";

export async function generateMetadata() {
    return {
        title: "روادي - معلومات الطلب / تفاصيل المنتج",
        description: "استعرض تفاصيل المنتج داخل الطلب بسهولة ضمن منصة روادي - تجربة تسوق سلسة ومتكاملة.",
    };
}

const ProductOrderDetailsPage = () => {
    return (
        <>
            {/*<Navbar />*/}
            <ProductOrderDetails />
            {/*<Footer />*/}
        </>
    );
};

export default ProductOrderDetailsPage;
