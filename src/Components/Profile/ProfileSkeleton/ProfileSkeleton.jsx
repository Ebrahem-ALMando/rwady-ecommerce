"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/Components/Orders/Orders.module.css";

const ProfileSkeleton = () => {
    const baseColor = "#e0e0e0";
    const highlightColor = "#f1f0f0";

    return (

        <div className="flex flex-col lg:flex-row gap-6 w-full p-4 px-[5%]">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow">
                <div className={styles.sidebar}>
                    <div style={{display: "flex", marginBottom: "1.5rem"}}>
                        <Skeleton circle height={60} width={60}/>
                        <Skeleton height={35} width={200} style={{margin: "1rem 1rem "}}/>
                    </div>

                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} height={40} style={{marginBottom: "1rem", borderRadius: 8}}/>
                    ))}
                    <Skeleton height={20} width="50%" style={{margin: "2rem auto 0", borderRadius: 8}}/>
                </div>
            </div>


            <div className="w-full lg:w-3/4 bg-white p-6 rounded-xl shadow">
                <Skeleton width={180} height={24} baseColor={baseColor} className="mb-4"/>
                <Skeleton height={1} width="100%" baseColor={baseColor} className="mb-4"/>

                <div className="flex mb-6  gap-4 overflow-x-hidden ">
                    <Skeleton circle width={70} height={70} baseColor={baseColor}/>
                    <div className="flex-col gap-4 mb-6 mt-2 ">
                        <Skeleton width={150} height={16} baseColor={baseColor}/>
                        <div className="sm:flex-row flex flex-col mb-6 gap-4">
                            <Skeleton height={36} width={120} baseColor={baseColor}/>
                            <Skeleton height={30} width={100} baseColor={baseColor}/>
                        </div>
                    </div>
                </div>

                {/*<div className="flex gap-4 mb-6">*/}
                {/*    <Skeleton height={36} width={120} baseColor={baseColor}/>*/}
                {/*    <Skeleton height={30} width={100} baseColor={baseColor}/>*/}
                {/*</div>*/}

                <Skeleton width={160} height={20} baseColor={baseColor} className="mb-4"/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Skeleton width={100} height={14} baseColor={baseColor} className="mb-1"/>
                        <Skeleton width={180} height={18} baseColor={baseColor}/>
                    </div>
                    <div>
                        <Skeleton width={100} height={14} baseColor={baseColor} className="mb-1"/>
                        <Skeleton width={180} height={18} baseColor={baseColor}/>
                    </div>
                </div>

                <div className="mt-6">
                    <Skeleton height={40} width={100} baseColor={baseColor}/>
                </div>
            </div>
        </div>

    );
};

export default ProfileSkeleton;
