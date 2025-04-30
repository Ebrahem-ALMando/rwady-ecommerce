"use client"

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Success = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const router = useRouter();

    let title = "تم تأكيد طلبك بنجاح!";
    let message = "شكراً لتسوقك معنا. سنقوم بمعالجة طلبك قريباً.";

    if (type === 'cod') {
        title = "تم تأكيد طلبك بنجاح!";
        message = "سيتم تجهيز طلبك وسيتم التواصل معك قريباً للدفع عند الاستلام.";
    } else if (type === 'externel') {
        title = "طلبك قيد المراجعة!";
        message = "تم استلام طلبك، سنقوم بمراجعة الحوالة المالية والتواصل معك قريباً.";
    } else if (type === 'gateway') {
        title = "تم الدفع بنجاح!";
        message = "شكراً لك! تم تأكيد الدفع وسيتم تجهيز طلبك حالاً.";
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center p-6">
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="text-green-500 mb-6"
            >
                <CheckCircle2 size={120} strokeWidth={1.5} />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-4"
            >
                {title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gray-600 mb-8 max-w-md"
            >
                {message}
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow"
            >
                العودة للرئيسية
            </motion.button>
        </div>
    );
};

export default Success;