import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";

import dynamic from "next/dynamic";
import Success from "@/Components/Checkout/Success";

const SuccessPage = () => {


    return (
   <Suspense fallback={<Loading/>}>
       <Success/>
   </Suspense>
    );
};

export default SuccessPage;