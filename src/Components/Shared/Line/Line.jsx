import styles from "./Line.module.css";
import React from "react";

const Line=(props)=> (
    <hr className={styles.line} style={props.styles}/>
)
export default Line

