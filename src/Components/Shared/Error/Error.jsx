"use client"
import { useState } from "react";
import styles from "./Error.module.css";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Error({ onRetry, message }) {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            await Promise.race([
                onRetry(),
                delay(10000).then(() => { throw new Error("Timeout"); }),
                setIsRetrying(false)
            ]);

        } catch (e) {
            console.warn("Retry failed or timed out:", e.message);
            setIsRetrying(false)
        } finally {

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.icon}>!</div>
            <h2 className={styles.title}>حدث خطأ غير متوقع</h2>
            <p className={styles.message}>
                {message ?? "تعذر تحميل البيانات، يرجى المحاولة مرة أخرى"}
            </p>

            {!message && (
                <button
                    className={styles.button}
                    onClick={handleRetry}
                    disabled={isRetrying}
                >
                    {isRetrying ? 'جاري إعادة المحاولة...' : 'المحاولة مرة أخرى'}
                </button>
            )}
        </div>
    );
}
