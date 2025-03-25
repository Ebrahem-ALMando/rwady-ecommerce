"use client"
import styles from './ToolNav.module.css'
import TopIcon from "@/Components/Header/ToolNav/Icons/TopIcon";
import Language from "@/Components/Shared/Language/Language";
import SearchBar from "@/Components/Header/ToolNav/SearchBar/SearchBar";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import NotificationModel from "@/Components/Notification/NotificationModel";
import React, {useEffect, useRef, useState} from "react";
import {CloseNavIcon, FavouriteIcon, MenuNavIcon, NotificationIcon, ProfileIcon, ShoppingCartIcon} from "@/utils/Icons";
import {CiSearch} from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
const ToolNav=(props)=>{
    const notificationRef = useRef(null);
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        props.toggleMenu()
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!notificationRef.current) return;
            const isIconClicked = event.target.closest(`.${styles.toolsDiv}`) !== null;
            if (!notificationRef.current.contains(event.target) && !isIconClicked) {
                setNotificationVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationRef, styles.toolsDiv]);

    return (
        <div>
            <div className={`${styles.mainDiv} ${props.isScrolled?`${styles.scrolled} ${styles.shrink}` :''}`}>

                <div className={styles.center}>
                    <div className={styles.items}>
                        <div className={styles.toolsDiv}>
                            <button
                                className={`${styles.menuToggle}`}
                                onClick={toggleMenu}
                            >
                                {isMenuOpen ?
                                    <>
                                        {CloseNavIcon}
                                    </>
                                    :
                                    <>
                                        {MenuNavIcon}
                                    </>
                                }
                            </button>

                            <TopIcon
                                link={"/profile"}
                                isSelect={true}
                                element={ProfileIcon}
                            />
                            <TopIcon
                                link={"/favourite"}
                                count={5}
                                element={FavouriteIcon}
                            />
                            <TopIcon
                                link={"/shopping-cart"}
                                count={6}
                                element={ShoppingCartIcon}
                            />
                            <TopIcon
                                setIsOpen={() => setNotificationVisible((prev) => !prev)}
                                count={7}
                                element={NotificationIcon}
                            />
                            {props.isScrolled&&
                                <TopIcon
                                    showMobile
                                    isSearch
                                    element={ <CiSearch size={28}/>}
                                />
                            }
                            <Language
                                hideMobile
                            />
                        </div>
                        <div className={styles.logo}>
                            <Link href='/'>
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    layout={"cover"}
                                    width={150}
                                    height={150}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.toolsDiv}>
                        <SearchBar
                            isScrolled={props.isScrolled}
                        />
                    </div>
                    <div className={styles.toolsDiv}>
                        <DownloadAppWithLogo/>
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

    )
}
export default ToolNav

