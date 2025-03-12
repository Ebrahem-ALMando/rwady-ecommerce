import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/HomePage/Footer";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Breadcrumb from "@/Components/Shared/Breadcrumb/Breadcrumb";
const FAQListPage=props=>{
    return(
    <>
        <Navbar/>

        <PageContainer
            title="الاسئلة الشائعة"
            isFAQ={true}
        />
        <Footer/>
    </>
    )
}
export default FAQListPage