"use client";
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './MainNavigation.module.css';
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Language from "@/Components/Shared/Language/Language";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import { getNavLinks } from "@/Data/getNavLinks";
import {useLocale, useTranslations} from 'next-intl';

const MainNavigation = ({ isMenuOpen, isOpenDropdown, toggleMenu, setIsOpenDropdown,downloadApp }) => {
    const  t  = useTranslations("mainNav");
    const locale = useLocale();
    const pathname = usePathname();
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
                    {navLinks.map((link, index) => {

                        const cleanPath = pathname.split("?")[0]; // بدون الـ query
                        const linkPath = link.href.split("?")[0];

                        const searchParams = useSearchParams();
                        const currentQuery = searchParams.toString();
                        const linkQuery = link.href.split("?")[1] || "";

                        // لو بدك تطابق تام (مع البارامترات):
                        const isActive = cleanPath === linkPath && currentQuery === linkQuery;

                        
                        // Remove the domain from window.location.href and compare from the language segment
                        // const currentPath = window.location.pathname + window.location.search;
                        // const linkPath = new URL(link.href, window.location.origin).pathname + new URL(link.href, window.location.origin).search;
                        // const isActive = currentPath === linkPath;
                        return (
                            <Link
                                prefetch={true}
                                key={index}
                                href={link.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                {isActive && <div className={styles.activeIndicator}></div>}
                                {t(`links.${link.label}`)}
                            </Link>
                        );
                    })}


                    <div className={styles.logoWithLang}>
                        <Language />
                        <DownloadAppWithLogo hideLogo downloadApp={downloadApp} />
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MainNavigation;
