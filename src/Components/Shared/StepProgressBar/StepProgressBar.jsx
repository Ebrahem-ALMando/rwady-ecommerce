import styles from './StepProgressBar.module.css';

const StepProgressBar = ({ currentStep = 1, totalSteps = 3, stepsTitles = [] }) => {
    return (
        <div className={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isDone = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                const isActive = stepNum <= currentStep;

                return (
                    <div
                        className={`${styles.stepWrapper} 
                            ${isDone ? styles.doneStep : ''}
                            ${isCurrent ? styles.currentStep : ''}
                            ${index !== 0 && index!==totalSteps-1 ? styles.hasLine : ''}`}
                        key={index}
                    >
                        <div className={styles.circleContainer}>
                            <div
                                className={`${styles.circle} 
                                    ${isDone ? styles.done : ''}
                                    ${isCurrent ? styles.current : ''}`}
                            >
                                {isDone ? (
                                    <span className={styles.checkmark}>✓</span>
                                ) : (
                                    <span className={styles.number}>{stepNum}</span>
                                )}
                            </div>
                        </div>

                        {stepsTitles?.[index] && (
                            <div className={styles.label}>{stepsTitles[index]}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepProgressBar;