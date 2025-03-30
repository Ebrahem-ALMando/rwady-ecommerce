import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Error from "@/Components/Shared/Error/Error";
import Loading from "@/Components/Shared/Loading/Loading";
import { getFaqs } from "@/api/services/FAQList";

const FAQListPage = async () => {
    try {
        const faqs = await getFaqs();
        const faqsData = Array.isArray(faqs.data) ? faqs.data : [faqs.data] || [];
        return (
            <>
                <Navbar />
                <PageContainer title="الأسئلة الشائعة" faqs={faqsData} isFAQ={true} />
                <Footer />
            </>
        );
    } catch (error) {
        console.error("Error fetching FAQs:", error.message);

        return (
            <>
                <Navbar />
                <Error message="يرجى إعادة تحميل الصفحة" />
                <Footer />
            </>
        );
    }
};

export default FAQListPage;
