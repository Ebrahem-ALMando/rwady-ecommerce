
import TitleNav from "@/Components/Header/TitleNav/TitleNav";

import ToolNav from "@/Components/Header/ToolNav/ToolNav";

import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";

const Navbar=()=>{
    return(
        <div >
            <TitleNav/>
                <ToolNav/>
                <MainNavigation/>
        </div>
    )
}
export default Navbar