import styles from './ButtonTap.module.css'
import Link from "next/link";
const ButtonTap=(props)=>{
    return(
        <Link href={props.link??"/profile"}>
        <button className={`${styles.buttonTap} 
        ${props.isSelect ? styles.buttonSelect : ''}
        ${props.isLogout ? styles.buttonLogout : ''}
        `}
                onClick={props.onClick}
        >
            {props.icon}
            {props.text}
        </button>
       </Link>
    )
}
export default ButtonTap