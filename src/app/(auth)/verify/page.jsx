
import Verify from "@/Components/Auth/Verify/Verify";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";

const VerifyPage = (props) => {
    return(
        <>
        <Suspense fallback={<Loading/>}>
        <Verify/>
        </Suspense>
        </>
    )
}
export default VerifyPage;