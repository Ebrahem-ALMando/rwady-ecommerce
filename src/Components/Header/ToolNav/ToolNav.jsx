"use client";
import styles from './ToolNav.module.css';
import TopIcon from "@/Components/Header/ToolNav/Icons/TopIcon";
import Language from "@/Components/Shared/Language/Language";
import SearchBar from "@/Components/Header/ToolNav/SearchBar/SearchBar";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import NotificationModel from "@/Components/Notification/NotificationModel";
import {
    CloseNavIcon,
    FavouriteIcon,
    MenuNavIcon,
    NotificationIcon,
    ProfileIcon,
    ShoppingCartIcon
} from "@/utils/Icons";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useRef, useState, useCallback, useMemo} from "react";
import { useTranslations } from 'next-intl';
import AutoScrollNavSlider from "@/Components/Header/ToolNav/AutoScrollNavSlider/AutoScrollNavSlider";
import SearchModal from "@/Components/Shared/SearchModal/SearchModal";
import useCart from "@/hooks/useCart";
import {getCartFromStorage} from "@/utils/cartStorage";

const ToolNav = ({ toggleMenu, isScrolled,getCartCount }) => {
    const t = useTranslations("toolNav");
    const notificationRef = useRef(null);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSearchModal = () => setIsModalOpen(true);
    const closeSearchModal = () => setIsModalOpen(false);




    const handleToggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
        toggleMenu();
    }, [toggleMenu]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!notificationRef.current) return;
            if (!notificationRef.current.contains(event.target) &&
                !event.target.closest(`.${styles.toolsDiv}`)) {
                setNotificationVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };


    }, []);


    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleCartUpdate = () => {
            const updatedCart = getCartFromStorage();
            setCartCount(updatedCart.length);
        };

        window.addEventListener("cart-updated", handleCartUpdate);
        return () => window.removeEventListener("cart-updated", handleCartUpdate);
    }, []);



    return (
        <div>
            <div className={`${styles.mainDiv} ${isScrolled ? `${styles.scrolled} ${styles.shrink}` : ''}`}>
                <div className={styles.center}>
                    <div className={styles.items}>
                        <div className={styles.toolsDiv}>
                            <button
                                className={styles.menuToggle}
                                onClick={handleToggleMenu}
                                aria-label={t("toggleMenu")}
                            >
                                {isMenuOpen ? CloseNavIcon : MenuNavIcon}
                            </button>

                            <TopIcon link="/profile" isSelect element={ProfileIcon} aria={t("profile")} />
                            <TopIcon link="/collections/favourites"



                                     element={FavouriteIcon} aria={t("favourites")} />
                            <TopIcon link="/shopping-cart" count={cartCount } element={ShoppingCartIcon} aria={t("cart")} />
                            <TopIcon setIsOpen={() => setNotificationVisible(prev => !prev)} count={9} element={NotificationIcon} aria={t("notifications")} />



                            <TopIcon
                                showMobile
                                isSearch
                                onOpenModal={openSearchModal}
                                element={<CiSearch size={28} />}
                                aria={t("search")}
                            />


                            <Language hideMobile />
                        </div>

                        <div className={styles.logo}>
                            <Link href="/" aria-label={t("homeLink")}>
                                <Image
                                    src="/logo.png"
                                    alt="Rwady Logo"
                                    width={256}
                                    height={66}
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <div className={styles.toolsDiv}>




                        <SearchBar
                            className={styles.hideOnMobile}
                            isScrolled={isScrolled}
                            onOpenModal={openSearchModal}
                            onCloseModal={closeSearchModal}
                            isModalOpen={isModalOpen}
                        />


                        <AutoScrollNavSlider
                                className={styles.showOnMobile}
                                isScrolled={isScrolled}
                        />


                    </div>

                    <div className={styles.toolsDiv}>
                        <DownloadAppWithLogo/>
                    </div>
                </div>
            </div>
            {/*{  isModalOpen&&*/}
            {/*<div className={`w-72 h-96 bg-red-500 `}>*/}
            {/*    askj*/}
            {/*</div>*/}
            {/*}*/}
            {/*<SearchModal*/}
            {/*    isOpen={]}*/}
            {/*    onClose={closeSearchModal}*/}
            {/*/>*/}
            <div ref={notificationRef}>
                <NotificationModel
                    isShow={isNotificationVisible}
                    onClose={() => setNotificationVisible(false)}
                />
            </div>
        </div>
    );
};

export default ToolNav;
