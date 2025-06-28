'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { verifyOtp } from "@/api/services/auth/verifyOtp";
import { clientLogin } from "@/api/services/auth/clientLogin";
import Cookies from "js-cookie";
import { getTokenWithClient } from "@/utils/getTokenWithClient";
import { toast } from "react-hot-toast";
import { useTranslations } from 'next-intl';
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/api/services/auth/getProfile";
import {syncCartWithServerOnLogin} from "@/utils/syncCartWithServer";

const Verify = () => {
    const t = useTranslations("verify");
    const router = useRouter();
    const searchParams = useSearchParams();

    const phone = searchParams.get('phone');

    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        const timer = timeLeft > 0 && setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOtpChange = (index, value) => {
        if (/^\d+$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            const response = await clientLogin({ phone });
            if (!response.error) {
                toast.success(t("otpSent"));
                setTimeLeft(60);
            } else {
                toast.error(t("otpFailed"));
            }
        } catch (e) {
            console.error("Error while sending OTP:", e.message);
            toast.error(t("genericError"));
        } finally {
            setIsResending(false);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault()
        const code = otp.join("");
        if (code.length !== 5) {
            toast.error(t("enter5Digits"));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await verifyOtp(phone, code);
            if (!response?.error) {
                toast.success(t("loginSuccess"));
                Cookies.set("token", response.data.token);

                const userData = await getProfile();
                if (!userData.error) {
                    login(response.data.token, {
                        id: userData.data?.id,
                        name: userData.data?.name
                    });
                    await syncCartWithServerOnLogin()
                    router.push(userData.data?.name ? "/" : "/profile");
                } else {
                    toast.error("فشل في تحميل بيانات المستخدم");
                    Cookies.remove("token");
                }
            }
            else {
                toast.error(response.message || t("loginFailed"));
            }
        } catch (error) {
            console.error("Login error:", error.message);
            // toast.error(t("loginError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4"
        >
            <form
                onSubmit={handleConfirm}
            >
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
                    <h1 className="text-3xl font-arabic font-bold text-start mb-6 text-gray-800">
                        {t("title")}
                    </h1>

                    <p className="text-start text-gray-600 mb-8 font-arabic">
                        {t("instruction")} <span className="font-bold text-black">{phone}</span>
                    </p>

                    <div className="flex justify-center gap-3 mb-8 ltr">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                inputMode="numeric"
                            />
                        ))}
                    </div>

                    <div className="text-center text-gray-600 font-arabic mb-6">
                        {timeLeft > 0 ? (
                            <span>
                            {t("resendAfter")} <span className="mr-1 text-blue-600 font-bold">
                                {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                            </span>
                        </span>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                            >
                                {isResending ? t("sending") : t("resend")}
                            </button>
                        )}
                    </div>

                    <button
                        type={"submit"}
                        disabled={isSubmitting || otp.some(d => d === '')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-arabic text-xl transition-all mb-4 disabled:opacity-50"
                    >
                        {isSubmitting ? t("verifying") : t("confirm")}
                    </button>

                    <div className="text-start">
                        <p className="text-gray-600">
                            {t("problem")} <span className="mr-1 text-blue-600 font-bold">{t("support")}</span>
                        </p>
                    </div>
                </div>
            </form>
        </motion.div>
);
};

export default Verify;
