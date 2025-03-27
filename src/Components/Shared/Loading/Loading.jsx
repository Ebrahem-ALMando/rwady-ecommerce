// components/Loading/index.jsx
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
            <p className={styles.text}>جاري تحميل البيانات...</p>
        </div>
    );
}