import styles from './ButtonTap.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useLocale} from "next-intl";

const ButtonTap = ({ link = "profile", icon, text, isLogout, isSelect, onClick }) => {
    const pathname = usePathname();
    const lang=useLocale()
    const href = `/${lang}/${link}/`;
    const isCurrent = pathname === href;

    const button = (
        <button
            type="button"
            className={`${styles.buttonTap} 
                ${isSelect ? styles.buttonSelect : ''}
                ${isLogout ? styles.buttonLogout : ''}`}
            onClick={(e) => {
                e.preventDefault();
                if (isLogout) return onClick?.();
                if (isCurrent) return;
            }}
        >
            {icon}
            {text}
        </button>
    );

    return isLogout || isCurrent ? button : <Link href={href}  scroll={true} prefetch={true}>{button}</Link>;
};

export default ButtonTap;
