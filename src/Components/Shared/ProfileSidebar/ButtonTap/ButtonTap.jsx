import styles from './ButtonTap.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const ButtonTap = ({ link = "profile", icon, text, isLogout, isSelect, onClick }) => {
    const pathname = usePathname();
    const href = `/${link}`;
    const isCurrent = pathname === href;

    const button = (
        <button
            type="button"
            className={`${styles.buttonTap} 
                ${isSelect ? styles.buttonSelect : ''}
                ${isLogout ? styles.buttonLogout : ''}`}
            onClick={(e) => {
                if (isLogout) return onClick?.();
                if (isCurrent) return;
            }}
        >
            {icon}
            {text}
        </button>
    );

    return isLogout || isCurrent ? button : <Link href={href}  scroll={true}>{button}</Link>;
};

export default ButtonTap;
