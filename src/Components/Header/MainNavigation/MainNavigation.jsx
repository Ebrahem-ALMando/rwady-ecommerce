"use client";
import Link from 'next/link';
import styles from './MainNavigation.module.css';
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Language from "@/Components/Shared/Language/Language";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import { getNavLinks } from "@/Data/getNavLinks";
import {useLocale, useTranslations} from 'next-intl';


const MainNavigation = ({ isMenuOpen, isOpenDropdown, toggleMenu, setIsOpenDropdown }) => {
    const  t  = useTranslations("mainNav");
    const locale = useLocale();
    const navLinks = getNavLinks(locale);
    return (
        <div className={styles.mainDiv}>
            <div className={styles.contDiv}>
                <nav
                    role="navigation"
                    aria-label={t("label")}
                    className={`${styles.navItems} ${isMenuOpen ? styles.active : ''}`}
                    onMouseEnter={() => setIsOpenDropdown(true)}
                    onMouseLeave={() => setIsOpenDropdown(false)}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            prefetch={true}
                            key={index}
                            href={link.href}
                            className={styles.navItem}
                        >
                            {t(`links.${link.label}`)}
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
