"use client";
import styles from './ToolNav.module.css';

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
import React, {useEffect, useRef, useState, useCallback, useMemo, Suspense} from "react";
import {useLocale, useTranslations} from 'next-intl';
import AutoScrollNavSlider from "@/Components/Header/ToolNav/AutoScrollNavSlider/AutoScrollNavSlider";
import SearchModal from "@/Components/Shared/SearchModal/SearchModal";
import useCart from "@/hooks/useCart";
import {getCartFromStorage} from "@/utils/cartStorage";
import Loading from "@/Components/Shared/Loading/Loading";
import useFavourites from "@/hooks/useFavourites";

import {RiListIndefinite} from "react-icons/ri";
import {IconFade} from "@/Components/Header/ToolNav/Icons/IconFade";
import TopIcon from "@/Components/Header/ToolNav/Icons/TopIcon";
import {AnimatePresence,motion} from "framer-motion";
import useSWR from "swr";
import {getNotifications} from "@/api/services/general/notifications/getNotifications";
import {getUnreadCountNotifications} from "@/api/services/general/notifications/getUnreadCountNotifications";


const ToolNav = ({ toggleMenu, isScrolled,getCartCount }) => {
    const t = useTranslations("toolNav");
    const notificationRef = useRef(null);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
   
    const openSearchModal = () => setIsModalOpen(true);
    const closeSearchModal = () => setIsModalOpen(false);
    const lang=useLocale()

    const { favourites } = useFavourites();
    const favouritesCount = favourites.length;


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


    const { data: notificationCount, error, isLoading, mutate }
        = useSWR(
        `notificationDataCount`,
        getUnreadCountNotifications,
        {
            revalidateOnFocus: false,
        }
    );
 

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

                            <TopIcon link={`/${lang}/profile`} isSelect element={ProfileIcon} aria={t("profile")}/>
                            <TopIcon link={`/${lang}/collections/favourites`}
                                     count={favouritesCount}
                                     element={FavouriteIcon} aria={t("favourites")}/>
                            <TopIcon link={`/${lang}/shopping-cart`}
                                     count={cartCount} element={ShoppingCartIcon} aria={t("cart")}/>
                            <TopIcon setIsOpen={() => setNotificationVisible(prev => !prev)} 
                            count={notificationCount??0}
                                     element={NotificationIcon} aria={t("notifications")}/>


                            <TopIcon
                                showMobile
                                isSearch={isSearchOpen}
                                onOpenModal={setIsSearchOpen}
                                aria={isSearchOpen ? "قائمة" : "بحث"}
                                element={
                                    <div style={{position: "relative", width: 28, height: 28}}>
                                        <IconFade show={!isSearchOpen}>
                                            <CiSearch size={28}/>
                                        </IconFade>
                                        <IconFade show={isSearchOpen}>
                                            <RiListIndefinite size={28}/>
                                        </IconFade>
                                    </div>
                                }
                            />


                            <Language hideMobile/>
                        </div>

                        <div className={styles.logo}>
                            <Link href={`/${lang}`} aria-label={t("homeLink")}>
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

                    <div className={`${styles.toolsDiv} ${isScrolled ? styles.isScrole : ""}`}>
                       <div className={styles.hideOnMobile} style={{width:'100%'}}>
                           <Suspense fallback={<Loading/>}>
                               <SearchBar
                                   isScrolled={isScrolled}
                                   onOpenModal={openSearchModal}
                                   onCloseModal={closeSearchModal}
                                   isModalOpen={isModalOpen}
                               />
                           </Suspense>
                       </div>
                        <AnimatePresence
                            mode="wait">
                            {isSearchOpen ? (
                                <motion.div
                                    className={styles.showOnMobile}
                                    key="search"
                                    initial={{opacity: 0, x: 10}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -10}}
                                    transition={{duration: 0.3}}
                                >
                                    <Suspense fallback={<Loading/>}>
                                        <SearchBar
                                            isScrolled={isScrolled}
                                            onOpenModal={openSearchModal}
                                            onCloseModal={closeSearchModal}
                                            isModalOpen={isModalOpen}
                                        />
                                    </Suspense>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="nav"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.3}}
                                >
                                    <AutoScrollNavSlider
                                        className={styles.showOnMobile}
                                        isScrolled={isScrolled}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                    <div className={styles.toolsDiv}>
                        <DownloadAppWithLogo
                            lang={lang}
                        />
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
                    lang={lang}
                />
            </div>
        </div>
    );
};

export default ToolNav;
