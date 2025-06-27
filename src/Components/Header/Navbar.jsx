"use client";
import TitleNav from "@/Components/Header/TitleNav/TitleNav";
// import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import ToolNav from "@/Components/Header/ToolNav/ToolNav";
import StepProgressBar from "@/Components/Shared/StepProgressBar/StepProgressBar";
import useCart from "@/hooks/useCart";
import {CartProvider} from "@/hooks/CartContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        let lastScrollY = window.pageYOffset;
        let ticking = false;
        const animationFrame = window.requestAnimationFrame || ((cb) => setTimeout(cb, 16.6));

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                animationFrame(() => {

                    setTimeout(() => {
                        setIsScrolled(lastScrollY > 50);
                        ticking = false;
                    }, 100);
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const {getCartCount}=useCart()
    return (
        <div className={styles.navbarContainer}>
            <TitleNav />
            <CartProvider>
                <ToolNav
                    getCartCount={getCartCount}
                    isScrolled={isScrolled}
                    toggleMenu={handleToggleMenu}
                />
            </CartProvider>

            {/*<MainNavigation*/}
            {/*    isScrolled={isScrolled}*/}
            {/*    isMenuOpen={isMenuOpen}*/}
            {/*    setIsMenuOpen={setIsMenuOpen}*/}
            {/*    toggleMenu={handleToggleMenu}*/}
            {/*    isOpenDropdown={isOpenDropdown}*/}
            {/*    setIsOpenDropdown={setIsOpenDropdown}*/}
            {/*/>*/}


        </div>
    );
};

export default Navbar;