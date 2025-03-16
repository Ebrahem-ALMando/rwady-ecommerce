
import TitleNav from "@/Components/Header/TitleNav/TitleNav";

import ToolNav from "@/Components/Header/ToolNav/ToolNav";

import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import NavWithHoverMenu from "@/Components/Header/NavWithHoverMenu";

const Navbar=()=>{
    return(
        <div >
            <TitleNav/>
                <ToolNav/>
                <MainNavigation/>
            {/*<NavWithHoverMenu/>*/}
        </div>
    )
}
export default Navbar