"use client";

import { getBrowserInfo } from "./browser-utils";
import { useEffect, useState } from "react";

export default function ForegroundNotificationListenerProvider(props) {
    const [Component, setComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isPWASupported } = getBrowserInfo();

    // if instagram webview 
    // const userAgent1 = `mozilla/5.0 (iphone; cpu iphone os 18_6 like mac os x) applewebkit/605.1.15 (khtml, like gecko) mobile/22g5054d instagram 388.0.0.15.79 (iphone15,3; ios 18_6; de_de; de; scale=3.00; 1290x2796; 758508722; iabmv/1) nw/3`.toLowerCase();
    // const userAgent2 = `Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22e252 Instagram 388.0.0.15.79 (iPhone17,1; iOS 18_4_1; en_US; en; scale=3.00; 1206x2622; 758508722; iabmv/1)`.toLowerCase();
    let userAgent = "";
    if (typeof window !== "undefined" && 'serviceWorker' in navigator) {
        userAgent = navigator.userAgent.toLowerCase();
    }

    useEffect(() => {
        // فحص الشروط قبل تحميل المكون
        if (!isPWASupported) return;

        if (userAgent.includes("instagram")) return;

        setIsLoading(true);
        setError(null);

        // Dynamic import للمكون
        import("./foreground-notification-listener.jsx")
            .then((module) => {
                setComponent(() => module.default);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [isPWASupported, userAgent]);

    // إرجاع المكون المحمل أو null
    if (isLoading) return null;
    if (error) return null;
    if (!Component) return null;
    else return <Component {...props} />;
} 