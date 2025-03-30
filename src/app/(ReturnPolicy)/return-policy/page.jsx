import Navbar from "@/Components/Header/Navbar";
import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Footer from "@/Components/Footer/Footer";
import Error from "@/Components/Shared/Error/Error";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {getSellingPolicies} from "@/api/services/sellingPolicies";

const ReturnPolicyPage=async(props)=>{
    let sellingPoliciesData = [];
    let error = null;
    let isError=false
    const getData=async ()=>{
        try {
            const sellingPolicies = await getSellingPolicies();
            sellingPoliciesData = Array.isArray(sellingPolicies.data) ? sellingPolicies.data : [sellingPolicies.data] || [];
        } catch (err) {
            console.error("Error fetching sellingPolicies:", err.message);
            error = err.message;
        }
    }
    await getData()

    if (error) {
        isError=true
    }
    return(
        <>
            <Navbar/>

            {isError?
                (
                    <Error
                        message={"يرجى اعادة تحميل الصفحة"}
                    />
                )
                :
                <Suspense fallback={<Loading />}>
                    <PageContainer
                        title={sellingPoliciesData[0].title}
                        data={sellingPoliciesData}
                    />
                </Suspense>
            }
            <Footer/>
        </>
    )
}
export default ReturnPolicyPage