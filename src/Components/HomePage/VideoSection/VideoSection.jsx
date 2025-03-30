"use client"
import styles from './VideoSection.module.css';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import {getSettings} from "@/api/services/settings";
import ApiConfig from "@/api/apiConfig";

const VideoSection=(props)=>{

       const [isPlaying, setIsPlaying] = useState(false);
        const [isModalOpen, setIsModalOpen] = useState(false);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

    const { data, error, isLoading, mutate } = useSWR(
        "VideoSection",
         getSettings,

    );
    const hasError = error;

    if (isLoading) return <Loading />;
    if (hasError)
        return (
            <Error
                onRetry={() =>
                    mutate(undefined, {
                        revalidate: true,
                    })
                }
            />
        );

    const Data = data?.data.settings || {};
    let promo_video_url=null
    let poster_video_url=null

    if(Data.id){
        poster_video_url =`${ApiConfig.IMAGE_BASE_URL}${Data.poster_video_url}`
        promo_video_url =`${ApiConfig.IMAGE_BASE_URL}${Data.promo_video_url}`
    }

        return (
            <div className={styles.container}>



                        <div className={styles.overlay}></div>
                <div className={styles.videoContainer}>
                    <div style={{position: "relative", width: "100%", height: "60vh"}}>
                        {!isPlaying ? (
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
                                onClick={() => setIsPlaying(true)}
                            />
                        ) : (
                            <ReactPlayer
                                url={promo_video_url}
                                width="100%"
                                height="100%"
                                playing={true}
                                controls={true}
                                loop={true}
                                muted={false}
                            />
                        )}
                    </div>

                    <button className={styles.playButton} onClick={openModal}>
                        <svg width="140" height="141" viewBox="0 0 140 141" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M69.6366 19.2505H70.3634H70.3635C80.9842 19.2504 89.4514 19.2503 96.0901 20.1428C102.945 21.0644 108.576 23.0174 113.03 27.4707C117.483 31.924 119.436 37.5557 120.358 44.4104C121.25 51.0492 121.25 59.5163 121.25 70.1372V70.8638C121.25 81.4847 121.25 89.9518 120.358 96.5906C119.436 103.445 117.483 109.077 113.03 113.53C108.576 117.984 102.945 119.937 96.0901 120.858C89.4513 121.751 80.9842 121.751 70.3633 121.75H69.6367C59.0158 121.751 50.5487 121.751 43.9099 120.858C37.0552 119.937 31.4235 117.984 26.9702 113.53C22.5169 109.077 20.564 103.445 19.6424 96.5906C18.7498 89.9519 18.7499 81.4848 18.75 70.864V70.8639V70.137V70.1369C18.7499 59.5162 18.7498 51.0491 19.6424 44.4104C20.564 37.5557 22.5169 31.924 26.9702 27.4707C31.4235 23.0174 37.0552 21.0644 43.9099 20.1428C50.5486 19.2503 59.0158 19.2504 69.6365 19.2505H69.6366ZM75.6382 54.3356L75.6384 54.3357L76.1539 54.6546L76.154 54.6547C79.5164 56.7345 82.4127 58.526 84.5307 60.2107C86.729 61.9592 88.8567 64.1707 89.6256 67.3519C90.1248 69.4174 90.1248 71.5836 89.6256 73.649C88.8567 76.8303 86.729 79.0418 84.5307 80.7903C82.4127 82.475 79.5163 84.2666 76.1539 86.3464L75.6384 86.6653C72.4022 88.6675 69.5915 90.4065 67.2363 91.4973C64.8388 92.6077 61.8356 93.5811 58.6254 92.5906C56.5809 91.9597 54.7732 90.7784 53.3515 89.2164C51.2138 86.8679 50.5673 83.8595 50.2829 81.1231C49.9998 78.3983 49.9999 74.9069 50 70.7742V70.2266C49.9999 66.0938 49.9998 62.6026 50.2829 59.8779C50.5673 57.1415 51.2138 54.1331 53.3515 51.7845C54.7732 50.2226 56.5809 49.0413 58.6254 48.4104C61.8356 47.4199 64.8388 48.3933 67.2363 49.5037C69.5914 50.5945 72.4021 52.3334 75.6382 54.3356Z"
                                  fill="white"/>
                        </svg>

                    </button>
                </div>


                {isModalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={closeModal}>
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



}
export default VideoSection