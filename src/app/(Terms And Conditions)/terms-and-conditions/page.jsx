"use server"
import Navbar from "@/Components/Header/Navbar";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Footer from "@/Components/Footer/Footer";
import { getTerms } from "@/api/services/terms";
import Error from "@/Components/Shared/Error/Error";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";

const TermsAndConditionsPage = async () => {
    let termsData = [];
    let error = null;
    let isError=false
    const getData=async ()=>{
        try {
            const terms = await getTerms();
            termsData = Array.isArray(terms.data) ? terms.data : [terms.data] || [];
        } catch (err) {
            console.error("Error fetching terms:", err.message);
            error = err.message;
        }
    }
   await getData()

    if (error) {
        isError=true
    }
    return (
        <>
            <Navbar />
            {isError?
                (
                <Error
                message={"يرجى اعادة تحميل الصفحة"}
                />
                )
                :
                <Suspense fallback={<Loading />}>
                    <PageContainer
                        title={termsData[0].title}
                        data={termsData}
                    />
                </Suspense>
            }

            <Footer />
        </>
    );
};

export default TermsAndConditionsPage;
