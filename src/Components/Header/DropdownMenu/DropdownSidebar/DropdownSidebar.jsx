"use client";
import styles from "./DropdownSidebar.module.css";
import DropdownSidebarItem from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebarItem/DropdownSidebarItem";
import { useState } from "react";



const DropdownSidebar = (props) => {
    const [isSelected, setIsSelected] = useState("جديد في ");

    return (
        <div className={styles.dropdownSidebar}>
            {props.data?.map((item, index) => (
                <DropdownSidebarItem
                    key={index}
                    isSelected={isSelected === item.name}
                    title={item.name}
                    setIsSelected={setIsSelected}
                />
            ))}
        </div>
    );
};

export default DropdownSidebar;
