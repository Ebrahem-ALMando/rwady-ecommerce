'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, CircleX, Home, ClipboardList } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from 'next-intl';

const StateModal = ({ type, onClose }) => {
    const isSuccess = type === 'success' || type === 'externel';
    const router = useRouter();
    const t = useTranslations("Checkout");

    const titles = {
        success: t("state.successTitle"),
        failure: t("state.failureTitle"),
        externel: t("state.externelTitle"),
    };

    const messages = {
        success: t("state.successMsg"),
        failure: t("state.failureMsg"),
        externel: t("state.externelMsg"),
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSuccess) router.push('/');
        }, 15000);

        return () => clearTimeout(timer);
    }, [isSuccess, router]);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    className="bg-white p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-md"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, repeatType: 'loop', duration: 2 }}
                        className="flex justify-center mb-6"
                    >
                        {type === 'success' && <CheckCircle2 size={80} className="text-green-500" />}
                        {type === 'failure' && <XCircle size={80} className="text-red-500" />}
                        {type === 'externel' && <Clock size={80} className="text-yellow-500" />}
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-4">{titles[type]}</h2>
                    <p className="text-gray-600 mb-8">{messages[type]}</p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href={'/'}
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
                        >
                            <Home size={20} /> {t("state.home")}
                        </Link>

                        {isSuccess && (
                            <Link
                                href={'/orders'}
                                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
                            >
                                <ClipboardList size={20} /> {t("state.viewOrders")}
                            </Link>
                        )}
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
                        >
                            <CircleX size={20} /> {t("state.close")}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StateModal;
