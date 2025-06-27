import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
// import Checkout from "@/Components/Checkout/Checkout";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";

const CheckoutPage=props=>{
    return(
        <>
            <Navbar/>
            {/*<Suspense fallback={<Loading/>}>*/}
            {/*    <Checkout/>*/}
            {/*</Suspense>*/}
            <Footer/>
        </>
    )
}
export default CheckoutPage;