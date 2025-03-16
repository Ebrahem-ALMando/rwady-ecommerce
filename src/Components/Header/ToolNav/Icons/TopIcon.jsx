
import React from "react";
import styles from './TopIcon.module.css'
import Link from "next/link";
const TopIcon=(props)=>{
    return (
        <Link
            href={props.link??"#"}
            style={{height:'50px'}}

        >
        <div className={''} style={

            {
                cursor:'pointer',
                height:'50px',
                borderRadius:'12px',
                width:'50px',
                backgroundColor: props.isSelect ? '#0741ad' : '#eeeff2',
                padding:'13px',
                margin:' 0 0.5rem',

            }
        }
             onClick={()=>props.setIsOpen(prev=>!prev)}
        >

            <div style={{position: 'relative', display: 'inline-block'

            }}>

                  {props.element}

                {props.count > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '-25px',
                        backgroundColor: '#0741ad',
                        color: 'white',
                        borderRadius: '60%',
                        padding: '3px 9px',
                        fontSize: '13px',
                        fontWeight:'bold'
                    }}>
          {props.count}
        </span>
                )}
            </div>

        </div>
</Link>

    )
}
export default TopIcon