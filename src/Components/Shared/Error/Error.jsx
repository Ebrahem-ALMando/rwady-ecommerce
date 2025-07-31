"use client"
import { useState } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import styles from "./Error.module.css";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Error({ onRetry, message }) {
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const handleRetry = async () => {
        if (isRetrying) return; // Prevent multiple retries
        
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);
        
        try {
            // Simulate API call with delay
            await delay(2000);
            
            // Call the actual retry function
            if (onRetry) {
                await onRetry();
            }
            
            // Success - reset retry count
            setRetryCount(0);
            
        } catch (error) {
            console.warn("Retry failed:", error.message);
            
            // If we've retried too many times, show a different message
            if (retryCount >= 2) {
                console.error("Maximum retry attempts reached");
            }
        } finally {
            setIsRetrying(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Main content */}
                <div className={styles.mainContent}>
                    <div className={styles.iconContainer}>
                        <AlertCircle size={64} className={styles.icon} />
                    </div>

                    <h2 className={styles.title}>
                        حدث خطأ غير متوقع
                    </h2>

                    <p className={styles.message}>
                        {message ?? "تعذر تحميل البيانات، يرجى المحاولة مرة أخرى"}
                    </p>

                    {retryCount >= 3 && (
                        <p className={styles.maxRetriesMessage}>
                            تم تجاوز الحد الأقصى للمحاولات. يرجى تحديث الصفحة يدوياً.
                        </p>
                    )}

                    {!message && (
                        <div className={styles.actions}>
                            <button
                                className={`${styles.retryButton} ${isRetrying ? styles.retrying : ''}`}
                                onClick={handleRetry}
                                disabled={isRetrying || retryCount >= 3}
                            >
                                {isRetrying ? (
                                    <>
                                        <RefreshCw size={20} className={styles.spinningIcon} />
                                        جاري إعادة المحاولة...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw size={20} />
                                        المحاولة مرة أخرى
                                        {retryCount > 0 && (
                                            <span className={styles.retryCount}>
                                                ({retryCount}/3)
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>

                            <button
                                className={styles.refreshButton}
                                onClick={() => window.location.reload()}
                                disabled={isRetrying}
                            >
                                تحديث الصفحة
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
