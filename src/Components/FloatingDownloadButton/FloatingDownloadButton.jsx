import styles from "./FloatingDownloadButton.module.css";
import {DownloadIcon} from "@/utils/Icons";
import Link from "next/link";


export default function FloatingDownloadButton() {
    return (
        <Link
            href="#"
            className={styles.floatingButton}
        >
            {DownloadIcon}
        </Link>
    );
}
