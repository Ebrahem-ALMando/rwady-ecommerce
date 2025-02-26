
import TitleNav from "@/Components/Header/TitleNav/TitleNav";

import ToolNav from "@/Components/Header/ToolNav/ToolNav";
import Language from "@/Components/Header/ToolNav/Language/Language";
import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import styles from './Navbar.module.css/'
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