'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const NotificationToast = ({ 
    isVisible, 
    onClose, 
    title, 
    message, 
    type = 'info', 
    image, 
    duration = 6000,
    style = {}
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            default:
                return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    if (isMobile) {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed left-4 right-4 z-50"
                        style={style}
                    >
                        <div className={`${getBgColor()} border rounded-xl shadow-lg p-4`}>
                            <div className="flex items-start space-x-3 space-x-reverse">
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Notification"
                                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        {getIcon()}
                                    </div>
                                )}
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900 font-arabic">
                                                {title}
                                            </p>
                                            {message && (
                                                <p className="mt-1 text-sm text-gray-600 font-arabic line-clamp-2">
                                                    {message}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="mr-2 flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            <X className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="fixed z-50 max-w-sm w-full"
                        style={style}
                >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start space-x-3 space-x-reverse">
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Notification"
                                        className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        {getIcon()}
                                    </div>
                                )}
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900 font-arabic">
                                                {title}
                                            </p>
                                            {message && (
                                                <p className="mt-1 text-sm text-gray-600 font-arabic line-clamp-3">
                                                    {message}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="mr-2 flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            <X className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="h-1 bg-gray-200">
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: duration / 1000, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationToast;
