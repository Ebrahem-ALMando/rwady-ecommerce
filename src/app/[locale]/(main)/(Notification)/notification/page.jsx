// import Navbar from "@/Components/Header/Navbar";
// import Footer from "@/Components/Footer/Footer";
import Notification from "@/Components/Notification/Notification";
import {getLocale, getTranslations} from "next-intl/server";


// const  NotificationPage=async ({ params })=>{
//     const { locale } = await params;
    // const t = await getTranslations({ locale, namespace: "contact" });
const  NotificationPage= ()=>{

    return(
        <>
            {/*<Navbar/>*/}
            <Notification/>
            {/*<Footer/>*/}
        </>
    )
}
export default NotificationPage