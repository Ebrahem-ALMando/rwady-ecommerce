// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import Orders from "@/Components/Orders/Orders";
// import { getTokenWithServer } from "@/utils/getTokenWithServer";
// import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


export async function generateMetadata() {
    return {
        title: "روادي - الطلبات",
        description: "استعرض جميع طلباتك السابقة والحالية على منصة روادي مع تفاصيل الشحن والحالة بسهولة.",
    };
}

const OrdersPage = async () => {
    // const token = await getTokenWithServer();
    //
    // if (!token) {
    //     redirect("/sign-in");
    // }

    return (
        <>
            {/*<Navbar />*/}
            {/*<Orders />*/}
            {/*<Footer />*/}
        </>
    );
};

export default OrdersPage;
