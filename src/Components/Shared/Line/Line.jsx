import styles from "./Line.module.css";
import React from "react";

const Line = ({ style, className = "" }) => (
    <hr
        className={`${styles.line} ${className}`}
        style={style}
        aria-hidden="true"
    />
);

export default Line;
