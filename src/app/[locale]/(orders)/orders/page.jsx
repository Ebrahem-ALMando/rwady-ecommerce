// import Navbar from "@/Components/Header/Navbar";
// // import Footer from "@/Components/Footer/Footer";
// // import Orders from "@/Components/Orders/Orders";
// // import { getTokenWithServer } from "@/utils/getTokenWithServer";
// // import { redirect } from "next/navigation";
//
// export const dynamic = "force-dynamic";
//
//
// export async function generateMetadata() {
//     return {
//         title: "روادي - الطلبات",
//         description: "استعرض جميع طلباتك السابقة والحالية على منصة روادي مع تفاصيل الشحن والحالة بسهولة.",
//     };
// }
//
// const OrdersPage = async () => {
//
//
//     return (
//         <>
//
//             <Navbar />
//             <main className="flex flex-col items-center justify-center  bg-white px-6 p-6 text-center">
//       <img
//         src="https://cdn-icons-png.flaticon.com/512/471/471664.png"
//         alt="قيد التطوير"
//         className="mb-6 w-[180px] h-[180px]"
//         // priority
//       />
//       <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//         الصفحة قيد التطوير والاختبار
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600">
//         سيتم توفير الصفحة قريبًا، شكرًا لصبركم!
//       </p>
//     </main>
//             {/*<Orders />*/}
//             {/*<Footer />*/}
//         </>
//     );
// };
//
// export default OrdersPage;


// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import Orders from "@/Components/Orders/Orders";

export const dynamic = "force-dynamic";


export async function generateMetadata() {
    return {
        title: "روادي - الطلبات",
        description: "استعرض جميع طلباتك السابقة والحالية على منصة روادي مع تفاصيل الشحن والحالة بسهولة.",
    };
}

const OrdersPage = async () => {


    return (
        <>
            {/*<Navbar />*/}
            <Orders />
            {/*<Footer />*/}
        </>
    );
};

export default OrdersPage;
