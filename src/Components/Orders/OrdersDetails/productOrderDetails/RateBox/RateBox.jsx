import styles from './RateBox.module.css';

const RateBox = (props) => {
    const {icon,text,buttonText,onClick} = props;
    return (
        <div className={styles.container}>
            <span>
                    {icon}
            </span>
            <p>
                {text}
            </p>
            <button
            onClick={onClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default RateBox;
