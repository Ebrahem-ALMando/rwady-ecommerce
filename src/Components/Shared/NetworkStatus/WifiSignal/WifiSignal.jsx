import React from "react";
import styles from "./WifiSignal.module.css";

export default function WifiSignal() {
    return (
        <div className={styles.container}>
            <div className={styles.wifi}>
                <div className={`${styles.arc} ${styles.arc1}`}></div>
                <div className={`${styles.arc} ${styles.arc2}`}></div>
                <div className={`${styles.arc} ${styles.arc3}`}></div>
                <div className={`${styles.arc} ${styles.arc4}`}></div>
                <div className={styles.dot}></div>

            </div>
        </div>
    );
}