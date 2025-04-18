"use client"
import {useState} from "react";
import styles from "./Error.module.css";
export default function Error({ onRetry ,message}) {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        setIsRetrying(true);
        await onRetry();
        setIsRetrying(false);
    };


    return (
        <div className={styles.container}>
                <div className={styles.icon}>!</div>
                <h2 className={styles.title}>حدث خطأ غير متوقع</h2>
                <p className={styles.message}>

                    {message??"تعذر تحميل البيانات، يرجى المحاولة مرة أخرى"}
                </p>

            {!message &&
                <button
                    className={styles.button}
                    onClick={handleRetry}
                    disabled={isRetrying}
                >
                    {isRetrying ? 'جاري إعادة المحاولة...' : 'المحاولة مرة أخرى'}
                </button>
            }
        </div>
    );
}