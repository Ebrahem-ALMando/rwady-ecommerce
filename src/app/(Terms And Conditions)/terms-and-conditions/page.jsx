import Navbar from "@/Components/Header/Navbar";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";

import Footer from "@/Components/HomePage/Footer";
import {TermsAndConditions,shortDescription} from "@/Data/TermsAndConditions";

const TermsAndConditionsPage = () => {
    return(
        <>
            <Navbar/>
            <PageContainer
                title="الشروط والاحكام"
                data={TermsAndConditions}
                shortDescription={shortDescription}
            />
            <Footer/>
        </>
    )
}
export default TermsAndConditionsPage