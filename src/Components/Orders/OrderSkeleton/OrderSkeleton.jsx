import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from ".././Orders.module.css";
import stylesCard from "../OrderCard/./OrderCard.module.css";
import React from "react";

const SidebarSkeleton = () => {
    const baseColor = "#e0e0e0";
    const highlightColor = "#f1f0f0";
    return (
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
    )

}

const OrderCardSkeleton = () => (
    <div className={stylesCard.card}>
        <div className={stylesCard.info}>
            <p className={stylesCard.line}><Skeleton width={120} height={14}/></p>
            <p className={stylesCard.line}><Skeleton width={180} height={14}/></p>
            <p className={stylesCard.line}><Skeleton width={140} height={14}/></p>
            <p className={stylesCard.line}><Skeleton width={140} height={14}/></p>
        </div>
        <div className={stylesCard.actions}>
            <Skeleton width={80} height={36} borderRadius={8}/>
        </div>
    </div>
);

const OrdersSkeleton = () => {
    return (
        <div className={styles.container}>
            <SidebarSkeleton/>
            <div className={styles.orders}>
            <div className={styles.header}>
                    <h3><Skeleton width={100} height={24}/></h3>
                    <div className={styles.filterSection}>
                        <Skeleton width={160} height={36} borderRadius={6} />
                        <Skeleton width={160} height={36} borderRadius={6} style={{ marginRight: "1rem" }} />
                    </div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                    <OrderCardSkeleton />
                    <OrderCardSkeleton />
                    <OrderCardSkeleton />
                </div>
            </div>
        </div>
    );
};

export default OrdersSkeleton;
