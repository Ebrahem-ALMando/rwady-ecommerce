"use client";
import TitleNav from "@/Components/Header/TitleNav/TitleNav";
import MainNavigation from "@/Components/Header/MainNavigation/MainNavigation";
import styles from "./Navbar.module.css";
import {useEffect, useRef, useState} from "react";
import ToolNav from "@/Components/Header/ToolNav/ToolNav";
import StepProgressBar from "@/Components/Shared/StepProgressBar/StepProgressBar";
import useCart from "@/hooks/useCart";
import {CartProvider} from "@/hooks/CartContext";

const Navbar = ({downloadApp}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };
 

    // useEffect(() => {
    //     let lastScrollY = window.scrollY;
    //     let timeoutId = null;
    //
    //     const handleScroll = () => {
    //         clearTimeout(timeoutId);
    //
    //         timeoutId = setTimeout(() => {
    //             const currentScrollY = window.scrollY;
    //
    //             if (currentScrollY > lastScrollY && currentScrollY > 50) {
    //                 setIsScrolled(true);
    //             } else if (currentScrollY < lastScrollY) {
    //                 setIsScrolled(false);
    //             }
    //
    //             lastScrollY = currentScrollY;
    //         }, 50);
    //     };
    //
    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //         clearTimeout(timeoutId);
    //     };
    // }, []);

    const triggerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, []);

    const {getCartCount}=useCart()
    return (
        <>
            <header className={styles.navbarContainer}>

                <TitleNav/>
                <CartProvider>
                    <ToolNav
                        getCartCount={getCartCount}
                        isScrolled={!isVisible}
                        toggleMenu={handleToggleMenu}
                        downloadApp={downloadApp}
                    />
                </CartProvider>

                <MainNavigation
                    isScrolled={!isVisible}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    toggleMenu={handleToggleMenu}
                    isOpenDropdown={isOpenDropdown}
                    setIsOpenDropdown={setIsOpenDropdown}
                    downloadApp={downloadApp}
                />


            </header>
            <div ref={triggerRef} style={{height: "1px"}}></div>
        </>
    );
};

export default Navbar;