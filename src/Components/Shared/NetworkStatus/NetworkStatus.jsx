"use client";
import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WifiSignal from "@/Components/Shared/NetworkStatus/WifiSignal/WifiSignal";

export default function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        updateStatus();
        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {type: "spring", stiffness: 100}
                    }}
                    exit={{
                        opacity: 0,
                        y: 50,
                        transition: {duration: 0.2}
                    }}
                    className="fixed bottom-6 right-6 z-[9999] bg-red-500 text-white px-5 py-1 rounded-full flex items-center shadow-xl space-x-3 rtl:space-x-reverse backdrop-blur-sm border border-red-300/30"
                >
                    <div className="flex items-center justify-center w-10 h-10 ">
                        <WifiSignal/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">اتصال الشبكة مقطوع</span>
                        <span className="text-xs font-light opacity-90">يرجى التحقق من اتصال الإنترنت</span>
                    </div>
                </motion.div>

            )}
        </AnimatePresence>
    );
}