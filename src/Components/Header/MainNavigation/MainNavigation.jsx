import Link from 'next/link';
import styles from './MainNavigation.module.css';
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Language from "@/Components/Shared/Language/Language";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import { navLinks } from "@/Data/NavLinks";

const MainNavigation = ({ isMenuOpen, isOpenDropdown, toggleMenu, setIsOpenDropdown }) => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.contDiv}>
                <nav
                    role="navigation"
                    aria-label="القائمة الرئيسية"
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
                            {link.label}
                        </Link>
                    ))}

                    <div className={styles.logoWithLang}>
                        <Language />
                        <DownloadAppWithLogo hideLogo />
                    </div>
                </nav>
            </div>

            {/*{isOpenDropdown && (*/}
            {/*    <div*/}
            {/*        onMouseEnter={() => setIsOpenDropdown(true)}*/}
            {/*        onMouseLeave={() => setIsOpenDropdown(false)}*/}
            {/*    >*/}
            {/*        <DropdownMenu isShow={isOpenDropdown} />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default MainNavigation;
