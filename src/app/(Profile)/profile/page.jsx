import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {getProfile} from "@/api/services/auth/getProfile";
import Profile from "@/Components/Profile/Profile";
import {getTokenWithServer} from "@/utils/getTokenWithServer";
import {redirect} from "next/navigation";
import FullScreenLoader from "@/Components/Shared/FullScreenLoader/FullScreenLoader";

export const dynamic = "force-dynamic";

const ProfilePage= async (props)=>{
    const token=  await getTokenWithServer()

    if (!token) {
        redirect("/sign-in");
    }
    // const dataPromise =  getProfile();
    return(
        <>

                <Navbar/>
                {/*<Suspense fallback={<Loading />} >*/}
                <Profile/>
                {/*    <ProfileData dataPromise={dataPromise}/>*/}
                {/*</Suspense>*/}
                <Footer/>

        </>
    )
}
export default ProfilePage
// export async function ProfileData({dataPromise})
// {
//     let initialProfileData = [];
//     let initialError=false;
//     try {
//         const profileData = await dataPromise;
//         initialProfileData = profileData || [];
//     }
//     catch (error) {
//         console.log(error.message);
//         initialError=true
//     }
//     return(
//         <Profile
//             initialData={initialProfileData}
//             initialError={initialError}
//             getData={getProfile}
//             keyData={"profileData"}
//         />
//     )
// }