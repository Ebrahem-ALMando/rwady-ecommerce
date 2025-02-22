import TitleNav from "@/Components/Header/TitleNav/TitleNav";

import ToolNav from "@/Components/Header/ToolNav/ToolNav";
import Language from "@/Components/Header/ToolNav/Language/Language";
import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";

const Navbar=()=>{
    return(
        <nav>
            <TitleNav/>
            <ToolNav/>
            <MainNavigation/>
        </nav>
    )
}
export default Navbar