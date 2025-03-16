import styles from './CategoryCard.module.css'
import Link from "next/link";
const CategoryCard=props=>{
    return(
        <Link href={props.link ?? "#"}>
            <div className={styles.categoryCard}>
                <img
                    src={props.image}
                    alt={props.name}
                />
                <h3
                    className={""}
                >
                    {props.name}
                </h3>
            </div>
        </Link>
    )
}
export default CategoryCard