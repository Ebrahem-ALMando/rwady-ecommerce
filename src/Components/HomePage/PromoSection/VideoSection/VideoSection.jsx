"use client";
import styles from './VideoSection.module.css';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useInView } from "react-intersection-observer";
// import ApiConfig from "@/api/apiConfig";
import ReloadWithError from "@/Components/Shared/ReloadWithError/ReloadWithError";
import { promoStartIcon } from "@/utils/Icons";
import { motion } from "framer-motion";

const VideoSection = ({ dataList, initialError=false }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [canLoadVideo, setCanLoadVideo] = useState(false);

    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmall = window.innerWidth <= 630;
            setIsMobile(isSmall);
            setIsPlaying(isSmall);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);


    useEffect(() => {
        if (inView) setCanLoadVideo(true);
    }, [inView]);

    if (initialError) return <ReloadWithError />;
    if (!dataList) {
        console.error("❌ dataList is undefined in Home page server component");
        return null; // أو return fallback UI
      }
    // const Data = settingData?.settings || {};
    // const poster_video_url = Data.poster_video_url ? `${ApiConfig.IMAGE_BASE_URL}${Data.poster_video_url}` : null;
    // const promo_video_url = Data.promo_video_url ? `${ApiConfig.IMAGE_BASE_URL}${Data.promo_video_url}` : null;
    const poster_video_url = (dataList && dataList.cover_image_url_for_home_page_video) 
    || '/images/VideoCover.jpeg';

    const promo_video_url = (dataList && dataList.video_url) || null;

    return (
        <div className={styles.container} ref={ref}>
            {!isMobile && <div className={styles.overlay}></div>}

            <div className={styles.videoContainer}>


                <motion.div
                            className={styles.videoBox}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                    {isMobile ? (
                        canLoadVideo && (
                            <ReactPlayer
                                url={promo_video_url}
                                width="100%"
                                height="100%"
                                playing={true}
                                muted={true}
                                loop={true}
                                controls={true}
                                playsinline={true}
                            />
                        )
                    ) : (
                        !isPlaying ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    background: `url(${poster_video_url}) center/cover no-repeat`,
                                }}
                                onClick={() => {
                                    if (canLoadVideo) setIsPlaying(true);
                                }}
                            />
                        ) : (
                            canLoadVideo && (
                                <ReactPlayer
                                    url={promo_video_url}
                                    width="100%"
                                    height="100%"
                                    playing={true}
                                    controls={true}
                                    loop={true}
                                />
                            )
                        )
                    )}
                </motion.div>

                {!isMobile && !isPlaying && (
                    <button className={styles.playButton} onClick={() => setIsModalOpen(true)}>
                        {promoStartIcon}
                    </button>
                )}
            </div>

            {isModalOpen && canLoadVideo && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>
                        <ReactPlayer
                            url={promo_video_url}
                            width="100%"
                            height="80vh"
                            controls={true}
                            playing={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoSection;
