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
import React, { useEffect, useRef, useState, useCallback } from "react";

const ToolNav = ({ toggleMenu, isScrolled }) => {
    const notificationRef = useRef(null);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
        toggleMenu();
    }, [toggleMenu]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!notificationRef.current) return;
            if (!notificationRef.current.contains(event.target) && !event.target.closest(`.${styles.toolsDiv}`)) {
                setNotificationVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                                aria-label="تبديل القائمة الجانبية"
                            >
                                {isMenuOpen ? CloseNavIcon : MenuNavIcon}
                            </button>

                            <TopIcon link="/profile" isSelect element={ProfileIcon} />
                            <TopIcon link="/collections/favourites" count={5} element={FavouriteIcon} />
                            <TopIcon link="/shopping-cart" count={6} element={ShoppingCartIcon} />
                            <TopIcon setIsOpen={() => setNotificationVisible(prev => !prev)} count={7} element={NotificationIcon} />
                            {isScrolled && (
                                <TopIcon showMobile isSearch element={<CiSearch size={28} />} />
                            )}
                            <Language hideMobile />
                        </div>

                        <div className={styles.logo}>
                            <Link href="/" aria-label="الانتقال إلى الصفحة الرئيسية">
                                <Image
                                    src="/logo.png"
                                    alt="شعار الموقع"
                                    width={256}
                                    height={66}
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <div className={styles.toolsDiv}>
                        <SearchBar isScrolled={isScrolled} />
                    </div>

                    <div className={styles.toolsDiv}>
                        <DownloadAppWithLogo />
                    </div>
                </div>
            </div>

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
