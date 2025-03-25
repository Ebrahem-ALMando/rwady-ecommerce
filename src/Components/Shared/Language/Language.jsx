"use client"
import styles from './Language.module.css'
import React, { useState } from 'react';

function Language({hideMobile}) {
    const [isSelected, setIsSelected] = useState(0);

    const toggleLanguage = (val) => {
        setIsSelected(val);
    };

    return (
        <div

            className={`${styles.languageDiv} ${hideMobile?styles.hideMobile:''}`}
        >
            <div
                onClick={
                    ()=>{
                        toggleLanguage(0);
                    }
                }
                className={styles.language}
                style={{
                    backgroundColor:isSelected===0 ? '#ffffff' : '#eeeff2',
                    color: isSelected===0 ? '#424242' : '#000',
                }}
            >
                ع
            </div>
            <div
                onClick={
                    ()=>{
                        toggleLanguage(1);
                    }
                }
                className={styles.language}
                style={{
                    backgroundColor: isSelected===1 ?  '#ffffff' : '#eeeff2',
                    color: isSelected===1 ? '#424242' :'#000',
                }}
            >
                En
            </div>

        </div>
    );
}

export default Language;
