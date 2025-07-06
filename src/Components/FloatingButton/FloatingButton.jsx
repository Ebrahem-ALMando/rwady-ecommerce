import styles from "./FloatingButton.module.css";
import Link from "next/link";

export default function FloatingButton({
                                           ariaLabel = "زر عائم",
                                           icon,
                                           href = "#",
                                           position = "right",
                                           positionVal = "20px",
                                       }) {
    const isLeft = position === "left";
    const dynamicStyle = {
        left: isLeft ? positionVal : "unset",
        right: !isLeft ? positionVal : "unset",
        bottom: positionVal,
    };

    const dynamicStyleMob = {
        left: position === "left" ? positionVal : "unset",
        bottom: position === "left" ? positionVal : "unset",
    };

    return (
        <Link
            href={href}
            className={styles.floatingButton}
            aria-label={ariaLabel}
            style={dynamicStyle}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
        </Link>

    );
}
