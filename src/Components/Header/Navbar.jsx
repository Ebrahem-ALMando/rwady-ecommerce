
import TitleNav from "@/components/Header/TitleNav/TitleNav";

import ToolNav from "@/components/Header/ToolNav/ToolNav";

import MainNavigation from "@/components/Header/MainNavigation/MainNavigation";

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