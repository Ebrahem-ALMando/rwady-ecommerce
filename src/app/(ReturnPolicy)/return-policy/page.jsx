import Navbar from "@/Components/Header/Navbar";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import {shortDescription} from "@/Data/ReturnPolicy";
import Footer from "@/Components/HomePage/Footer";

const ReturnPolicyPage=(props)=>{
    return(
        <>
            <Navbar/>
            <PageContainer
                title="سياسة الاستبدال والاسترجاع"
                shortDescription={shortDescription}
            />
            <Footer/>
        </>
    )
}
export default ReturnPolicyPage