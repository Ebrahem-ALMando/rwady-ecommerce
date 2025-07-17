import React, {useEffect} from "react";
import {AnimatePresence,motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {CheckCircle2, Home, XCircle,ClipboardList,CircleX,Clock } from "lucide-react";
import Link from "next/link";
const StateModal = ({ type, onClose, lang, orderId }) => {
    const router = useRouter();
    const t = useTranslations("Checkout");

    const isSuccess = type === 'success' || type === 'externel';
    const isInstallment = type === 'installment';

    const titles = {
        success: t("state.successTitle"),
        failure: t("state.failureTitle"),
        externel: t("state.externelTitle"),
        installment: t("state.installmentTitle"),
    };

    const messages = {
        success: t("state.successMsg"),
        failure: t("state.failureMsg"),
        externel: t("state.externelMsg"),
        installment: t("state.installmentMsg"),
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isInstallment && orderId) {
                router.push(`/${lang}/orders/${orderId}`);
            } else if (isSuccess) {
                router.push(`/${lang}/`);
            }
        }, isInstallment ? 3000 : 15000);

        return () => clearTimeout(timer);
    }, [isInstallment, isSuccess, router, orderId, lang]);

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
                        {(type === 'externel' || type === 'installment') && (
                            <Clock size={80} className="text-yellow-500" />
                        )}
                    </motion.div>

                    <h2 className="text-2xl font-bold mb-4">{titles[type]}</h2>
                    <p className="text-gray-600 mb-8">{messages[type]}</p>

                    {!isInstallment && (
                        <div className="flex flex-col gap-4">
                            <Link
                                href={`/${lang}/`}
                                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
                            >
                                <Home size={20} /> {t("state.home")}
                            </Link>

                            {isSuccess && (
                                <Link
                                    href={`/${lang}/orders`}
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
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
export default StateModal