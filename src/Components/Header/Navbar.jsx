"use client";
import TitleNav from "@/Components/Header/TitleNav/TitleNav";
import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import ToolNav from "@/Components/Header/ToolNav/ToolNav";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.navbarContainer}>
            <TitleNav />
            <ToolNav
                isScrolled={isScrolled}
                toggleMenu={handleToggleMenu}
            />
            <MainNavigation
                isScrolled={isScrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                toggleMenu={handleToggleMenu}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
            />
        </div>
    );
};

export default Navbar;
