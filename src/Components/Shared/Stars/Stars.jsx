import styles from './Stars.module.css';
import Star from "@/Components/Shared/Stars/Star/Star";

const Stars = (props) => {
    const {title, rating, totalStars = 5, filledColor = '#FFD700', emptyColor = '#D3D3D3' } = props;

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {

            stars.push(
                <Star
                    key={i}
                    fill={i <= rating ? filledColor : emptyColor}
                />
            );
        }
        return stars;
    };

    return (
        <div className={styles.starsContainer}>
            {
                !title?
                renderStars() :''
            }
        </div>
    );

};

export default Stars;
