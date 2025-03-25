import Link from 'next/link';
import styles from './MainNavigation.module.css'
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";
import Language from "@/Components/Shared/Language/Language";
import DownloadAppWithLogo from "@/Components/Header/ToolNav/DownloadAppWithLogo/DownloadWithLogo";
import {navLinks} from "@/Data/NavLinks";
const MainNavigation = (props) => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.contDiv}>
                <nav className={`${styles.navItems} ${props.isMenuOpen ? styles.active : ''}`}
                     onMouseEnter={()=>props.setIsOpenDropdown(true)}
                     onMouseLeave={() => props.setIsOpenDropdown(false)}
                >
                    {navLinks.map((link, index) => (
                        <Link key={index} href={link.href} className={styles.navItem}>
                            {link.label}
                        </Link>
                    ))}
                        <div className={styles.logoWithLang}>
                            <Language/>
                            <DownloadAppWithLogo hideLogo/>
                        </div>
                </nav>

            </div>
            {props.isOpenDropdown ?
                <div
                    onMouseEnter={()=>props.setIsOpenDropdown(true)}
                    onMouseLeave={() => props.setIsOpenDropdown(false)}
                >
                    <DropdownMenu
                        isShow={props.isOpenDropdown}
                    />
                </div>
                : ''
            }
        </div>
    );
};

export default MainNavigation;