"use client"
import TitleNav from "@/Components/Header/TitleNav/TitleNav";

import ToolNav from "@/Components/Header/ToolNav/ToolNav";

import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import NavWithHoverMenu from "@/Components/Header/NavWithHoverMenu";
import {useState} from "react";

const Navbar=()=>{
    const [isVisible, setIsVisible] = useState(true);
    return(
        <div >
            {isVisible && <TitleNav onClose={() => setIsVisible(false)} />}
                <ToolNav/>
                <MainNavigation/>
            {/*<NavWithHoverMenu/>*/}
        </div>
    )
}
export default Navbar