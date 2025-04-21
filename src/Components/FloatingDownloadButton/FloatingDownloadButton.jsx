import styles from "./FloatingDownloadButton.module.css";
import { DownloadIcon } from "@/utils/Icons";
import Link from "next/link";

export default function FloatingDownloadButton({ ariaLabel = "زر تحميل التطبيق" }) {
    return (
        <Link
            href="#"
            className={styles.floatingButton}
            aria-label={ariaLabel}
        >
            {DownloadIcon}
        </Link>
    );
}
