'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { verifyOtp } from "@/api/services/auth/verifyOtp";
import { clientLogin } from "@/api/services/auth/clientLogin";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from "@/hooks/useAuth";
import { getProfile } from "@/api/services/auth/getProfile";
import Link from 'next/link';
import { useNotification } from "@/hooks/useNotification";
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';

const Verify = () => {
    const t = useTranslations("verify");
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = useLocale();
    const phone = searchParams.get('phone');

    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const { deviceToken, setDeviceToken, requestNotificationPermission } = useNotification();

    useEffect(() => {
        const timer = timeLeft > 0 && setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Get device token on component mount
    useEffect(() => {

        const getDeviceToken = async () => {
            const token = await requestNotificationPermission();
            setDeviceToken(token);
        };

        getDeviceToken();
    }, [requestNotificationPermission, setDeviceToken, phone, timeLeft]);

    const handleOtpChange = (index, value) => {
        
        if (/^\d+$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // إذا تم إدخال رقم، انتقل للحقل التالي
            if (value && index < otp.length - 1) {
                setTimeout(() => {
                    document.getElementById(`otp-${index + 1}`)?.focus();
                }, 50);
            }
            
            // إذا تم حذف رقم، انتقل للحقل السابق
            if (!value && index > 0) {
                setTimeout(() => {
                    document.getElementById(`otp-${index - 1}`)?.focus();
                }, 50);
            }
        } 
    };

    const handleKeyDown = (index, e) => {
        // دعم الحذف
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        
        const numbers = pastedData.replace(/\D/g, '').slice(0, 5);
        
        if (numbers.length > 0) {
            const newOtp = [...otp];
            numbers.split('').forEach((digit, index) => {
                if (index < 5) {
                    newOtp[index] = digit;
                }
            });
            setOtp(newOtp);
            
            // التركيز على آخر حقل مملوء أو الحقل التالي
            const nextIndex = Math.min(numbers.length, 4);
            document.getElementById(`otp-${nextIndex}`)?.focus();
        }
    };

    const handleCopy = (e) => {
        e.preventDefault();
        const code = otp.join('');
        
        if (code.length === 5) {
            navigator.clipboard.writeText(code);
            toast.custom(() => (
                <CustomToast
                    title={t("otpCopied")}
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            // Request notification permission and get device token
            let finalDeviceToken = deviceToken;
            
            if (!deviceToken) {
                finalDeviceToken = await requestNotificationPermission();
            }

            
            const response = await clientLogin({ 
                phone,
                device_token: finalDeviceToken 
            });
            
            if (!response.error) {
                toast.custom(() => (
                    <CustomToast
                        title={t("otpSent")}
                        type="success"
                    />
                ) ,{
                    duration: 3000,
                    position: 'top-center',
                });
                setTimeLeft(60);
            }
        } catch (e) {
            toast.custom(() => (
                <CustomToast
                    title={t("genericError")}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
        } finally {
            setIsResending(false);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault()
        const code = otp.join("");
        
        if (code.length !== 5) {
                toast.custom(() => (
                <CustomToast
                    title={t("enter5Digits")}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await verifyOtp(phone, code);
            
            if (!response?.error) {
                toast.custom(() => (
                    <CustomToast
                        title={t("loginSuccess")}
                        type="success"
                    />
                ) ,{
                    duration: 3000,
                    position: 'top-center',
                });
                Cookies.set("token", response.data.token);

                const userData = await getProfile();
                
                if (!userData.error) {
                    login(response.data.token, {
                        id: userData.data?.id,
                        name: userData.data?.name
                    });
                    
                    // await syncCartWithServerOnLogin()
                    setTimeout(() => {
                        const redirectPath = userData.data?.name ? "/" : "/profile";
                        router.push(redirectPath);  
                    }, 100);

                } else {

                    toast.custom(() => (
                        <CustomToast
                            title={t("loginFailed")}
                            type="error"
                        />
                    ) ,{
                        duration: 3000,
                        position: 'top-center',
                    });
                    Cookies.remove("token");
                }
            }
            else {
                toast.custom(() => (
                    <CustomToast
                        title={response.message || t("loginFailed")}
                        type="error"
                    />
                ) ,{
                    duration: 3000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error("❌ [Verify] Login error:", error.message);
            toast.custom(() => (
                <CustomToast
                    title={t("loginError")}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
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
                <div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8">

                    <h1 className="text-3xl font-arabic font-bold text-start mb-6 text-gray-800">
                        {t("title")}
                    </h1>

                    <p className="text-start text-gray-600 mb-8 font-arabic">
                        {t("instruction")} <span className="font-bold text-black " dir="ltr">{phone}</span>
                    </p>

                    <motion.div 
                        className="flex justify-center gap-3 mb-8 ltr"
                        animate={{
                            scale: otp.every(digit => digit !== '') ? [1, 1.02, 1] : 1
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                    >
                        {otp.map((digit, index) => (
                            <motion.input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                onCopy={handleCopy}
                                onClick={(e) => e.target.select()}
                                className={`w-16 h-16 text-3xl text-center border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                                    digit 
                                        ? 'border-green-500 bg-green-50 text-green-700' 
                                        : 'border-gray-200 bg-white text-gray-700'
                                }`}
                                inputMode="numeric"
                                animate={{
                                    scale: digit ? [1, 1.05, 1] : 1,
                                    backgroundColor: digit ? '#f0fdf4' : '#ffffff',
                                    borderColor: digit ? '#22c55e' : '#e5e7eb',
                                    boxShadow: digit ? '0 4px 12px rgba(34, 197, 94, 0.2)' : '0 0 0 rgba(0, 0, 0, 0)'
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </motion.div>

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
                           {t("problem")}    
                            <span className="mr-1 text-blue-600 font-bold">
                            <Link href={`/${lang}/contact-us`} prefetch={true}>
                                {t("support")}
                                </Link>
                                </span>
                              

                        </p>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default Verify;
