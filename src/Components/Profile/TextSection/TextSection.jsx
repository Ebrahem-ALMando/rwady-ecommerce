import styles from './TextSection.module.css'
import React from 'react'
const TextSection=props=>{
    return(
        <div className={styles.textSection}>
            <p>
                {props.title}
            </p>
            <p>
                {props.isEmail?
                <a href={"mailto:" + props.value}  rel="noopener noreferrer" >
                    { props.value}
                </a>:
                    props.value
                }
            </p>
        </div>
    )
}
export default React.memo(TextSection);