"use server"
import Navbar from "@/Components/Header/Navbar";
// import PageContainer from "@/Components/Shared/PageContainer/PageContainer";
import Footer from "@/Components/Footer/Footer";
// import { getTerms } from "@/api/services/terms";
// import Error from "@/Components/Shared/Error/Error";
// import {Suspense} from "react";
// import Loading from "@/Components/Shared/Loading/Loading";
// import {getShipmentPolicies} from "@/api/services/shipmentPolicies";

const ShipmentPoliciesPage = async () => {
    // let shipmentPoliciesData = [];
    // let error = null;
    // let isError=false
    // const getData=async ()=>{
    //     try {
    //         const shipmentPolicies = await getShipmentPolicies();
    //         shipmentPoliciesData = Array.isArray(shipmentPolicies.data) ? shipmentPolicies.data : [shipmentPolicies.data] || [];
    //     } catch (err) {
    //         console.error("Error fetching terms:", err.message);
    //         error = err.message;
    //     }
    // }
    // await getData()
    //
    // if (error) {
    //     isError=true
    // }
    return (
        <>
            <Navbar />
            {/*{isError?*/}
            {/*    (*/}
            {/*        <Error*/}
            {/*            message={"يرجى اعادة تحميل الصفحة"}*/}
            {/*        />*/}
            {/*    )*/}
            {/*    :*/}
            {/*    <Suspense fallback={<Loading />}>*/}
            {/*        <PageContainer*/}
            {/*            title={shipmentPoliciesData[0].title}*/}
            {/*            data={shipmentPoliciesData}*/}
            {/*        />*/}
            {/*    </Suspense>*/}
            {/*}*/}

            <Footer />
        </>
    );
};

export default ShipmentPoliciesPage;
