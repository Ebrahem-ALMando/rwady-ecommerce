import styles from './VideoSection.module.css';
const VideoSection=(props)=>{
    return(
/*<video id="vidioB" className={` ${styles.vidioBody}   `}

       autoPlay={true} loop={true} muted>
    <source src={props.src} type="video/mp4" />
</video>*/
        <img src="/bigzone4.jpg" alt="وصف الصورة" className={styles.vidioBody}/>

        )
}
export default VideoSection