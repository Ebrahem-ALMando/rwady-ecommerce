'use client';
import {useEffect, useState} from 'react';
import {redirect, useRouter} from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './SignIn.module.css'
import {toast} from "react-hot-toast";
import {sendOtp} from "@/api/services/auth/sendOtp";
import {getTokenWithClient} from "@/utils/getTokenWithClient";

const SignIn=(props)=> {



    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 70, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };


    const token = getTokenWithClient()
    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token]);
    const handleSetPhone=(e) => {
        setPhone(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await sendOtp(phone);
            if (response.status_code===200) {
                toast.success("تم إرسال رمز التحقق بنجاح");
                router.push(`/verify?phone=${encodeURIComponent(phone)}`);
            } else {
                toast.error("فشل في إرسال رمز التحقق");
            }
        } catch (e) {
            console.error("Error while sending OTP:", e.message);
            toast.error("حدث خطأ أثناء إرسال الكود");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"

            className={`min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 ${styles.mainDiv}`}
        >
            <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
            >
                <motion.h1
                    variants={itemVariants}
                    className="xl:text-4xl md:text-3xl lg:text-2xl sm:text-xl font-arabic font-bold text-right mb-2 text-gray-800"
                >
                    مرحباً بك في
                    <span className={styles.rwadyName}>
                     RWADY
                    </span>
                    ! 🤩

                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-xl font-arabic text-right mb-8 text-gray-500"
                >
                    قم بتسجيل الدخول للمتابعة داخل Rwady
                </motion.p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <label className="block text-gray-700 text-xl font-arabic mb-2">
                            رقم الهاتف
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                value={phone}
                                onChange={handleSetPhone}
                                placeholder="أدخل رقم الهاتف"
                                className="
                                text-right
                                w-full p-2 border-2 border-gray-200 rounded-lg text-lg font-arabic
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all
                         text-black
                         "
                                pattern="^\d{8,15}$"
                                required
                            />

                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button

                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg
                       font-arabic text-lg transition-all disabled:opacity-50 flex justify-center items-center"
                        >
                            {isSubmitting ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'تسجيل الدخول'
                            )}
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </motion.div>
    );
}
export default SignIn