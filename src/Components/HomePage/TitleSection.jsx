import styles from './TitleSection.module.css';

const TitleSection = (props) => {
    return (
        <div className={styles.titleSection}>
            <h3 className={styles.title}>
                {props.title}
            </h3>
            <p className={styles.viewAll}>
                عرض الكل
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#0741AD"/>
                    <path
                        d="M23 28.67C22.81 28.67 22.62 28.6 22.47 28.45L15.95 21.93C14.89 20.87 14.89 19.13 15.95 18.07L22.47 11.55C22.76 11.26 23.24 11.26 23.53 11.55C23.82 11.84 23.82 12.32 23.53 12.61L17.01 19.13C16.53 19.61 16.53 20.39 17.01 20.87L23.53 27.39C23.82 27.68 23.82 28.16 23.53 28.45C23.38 28.59 23.19 28.67 23 28.67Z"
                        fill="white"/>
                </svg>
            </p>
        </div>
    );
};

export default TitleSection;
