
import styles from './ButtonTap.module.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const ButtonTap = (props) => {
    const pathname = usePathname();
    const href = `/${props.link ?? "profile"}`;
    const isCurrent = pathname === href;

    const button = (
        <button
            type="button"
            className={`${styles.buttonTap} 
                ${props.isSelect ? styles.buttonSelect : ''}
                ${props.isLogout ? styles.buttonLogout : ''}`}
            onClick={(e) => {
                if (props.isLogout) return props.onClick?.();
                if (isCurrent) return;
            }}
        >
            {props.icon}
            {props.text}
        </button>
    );

    return props.isLogout || isCurrent ? button : <Link href={href} replace>{button}</Link>;
};

export default ButtonTap;
