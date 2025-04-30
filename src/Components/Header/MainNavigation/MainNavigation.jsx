"use client";
import Link from 'next/link';
import styles from './MainNavigation.module.css';
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Language from "@/Components/Shared/Language/Language";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import { navLinks } from "@/Data/NavLinks";
import { useTranslation } from "next-i18next";
import "@/i18n";

const MainNavigation = ({ isMenuOpen, isOpenDropdown, toggleMenu, setIsOpenDropdown }) => {
    const { t } = useTranslation("common");

    return (
        <div className={styles.mainDiv}>
            <div className={styles.contDiv}>
                <nav
                    role="navigation"
                    aria-label={t("mainNav.label")}
                    className={`${styles.navItems} ${isMenuOpen ? styles.active : ''}`}
                    onMouseEnter={() => setIsOpenDropdown(true)}
                    onMouseLeave={() => setIsOpenDropdown(false)}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={styles.navItem}
                        >
                            {t(`mainNav.links.${link.label}`)}
                        </Link>
                    ))}


                    <div className={styles.logoWithLang}>
                        <Language />
                        <DownloadAppWithLogo hideLogo />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MainNavigation;
