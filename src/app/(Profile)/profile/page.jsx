import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Profile from "@/Components/Profile/Profile";
import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";

const ProfilePage=(props)=>{
    return(
        <>
            <Navbar/>
         <Profile/>
         <Footer/>
        </>
    )
}
export default ProfilePage