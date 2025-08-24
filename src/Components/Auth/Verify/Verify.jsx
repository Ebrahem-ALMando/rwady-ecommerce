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
import { useToast } from "@/hooks/useToast";

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
    const { requestPermission } = useToast();
    const [deviceToken, setDeviceToken] = useState(null);

    useEffect(() => {
        const timer = timeLeft > 0 && setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Get device token on component mount
    useEffect(() => {
        console.log('🚀 [Verify] Component mounted, phone:', phone);
        console.log('⏰ [Verify] Timer started, timeLeft:', timeLeft);
        
        const getDeviceToken = async () => {
            console.log('🔔 [Verify] Getting device token...');
            const token = await requestPermission();
            console.log('🔔 [Verify] Device token result:', token ? 'Token obtained' : 'No token');
            setDeviceToken(token);
        };

        getDeviceToken();
    }, [requestPermission, phone, timeLeft]);

    const handleOtpChange = (index, value) => {
        console.log('🔢 [Verify] OTP change:', { index, value, currentOtp: otp });
        
        if (/^\d+$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            console.log('🔢 [Verify] OTP updated:', newOtp);
            
            // إذا تم إدخال رقم، انتقل للحقل التالي
            if (value && index < otp.length - 1) {
                console.log('🔢 [Verify] Moving to next field:', index + 1);
                setTimeout(() => {
                    document.getElementById(`otp-${index + 1}`)?.focus();
                }, 50);
            }
            
            // إذا تم حذف رقم، انتقل للحقل السابق
            if (!value && index > 0) {
                console.log('🔢 [Verify] Moving to previous field:', index - 1);
                setTimeout(() => {
                    document.getElementById(`otp-${index - 1}`)?.focus();
                }, 50);
            }
        } else {
            console.log('🔢 [Verify] Invalid input ignored:', value);
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
        console.log('📋 [Verify] Paste event:', { pastedData });
        
        const numbers = pastedData.replace(/\D/g, '').slice(0, 5);
        console.log('📋 [Verify] Extracted numbers:', numbers);
        
        if (numbers.length > 0) {
            const newOtp = [...otp];
            numbers.split('').forEach((digit, index) => {
                if (index < 5) {
                    newOtp[index] = digit;
                }
            });
            setOtp(newOtp);
            console.log('📋 [Verify] OTP after paste:', newOtp);
            
            // التركيز على آخر حقل مملوء أو الحقل التالي
            const nextIndex = Math.min(numbers.length, 4);
            console.log('📋 [Verify] Focusing on field:', nextIndex);
            document.getElementById(`otp-${nextIndex}`)?.focus();
        } else {
            console.log('📋 [Verify] No valid numbers found in pasted data');
        }
    };

    const handleCopy = (e) => {
        e.preventDefault();
        const code = otp.join('');
        console.log('📋 [Verify] Copy event, code:', code);
        
        if (code.length === 5) {
            console.log('📋 [Verify] Copying code to clipboard:', code);
            navigator.clipboard.writeText(code);
            toast.success(t("otpCopied"));
        } else {
            console.log('📋 [Verify] Code not complete, cannot copy');
        }
    };

    const handleResend = async () => {
        console.log('🔄 [Verify] Resend OTP requested');
        setIsResending(true);
        try {
            // Request notification permission and get device token
            let finalDeviceToken = deviceToken;
            console.log('🔔 [Verify] Current device token for resend:', deviceToken ? 'Exists' : 'None');
            
            if (!deviceToken) {
                console.log('🔔 [Verify] Requesting new device token for resend...');
                finalDeviceToken = await requestPermission();
                console.log('🔔 [Verify] New device token for resend result:', finalDeviceToken ? 'Obtained' : 'Failed');
            }

            console.log('📱 [Verify] Sending resend request with phone:', phone);
            console.log('🔔 [Verify] Device token being sent for resend:', finalDeviceToken ? 'Token included' : 'No token');
            
            const response = await clientLogin({ 
                phone,
                device_token: finalDeviceToken 
            });
            
            console.log('📱 [Verify] Resend response:', response);
            if (!response.error) {
                console.log('✅ [Verify] Resend successful, resetting timer');
                toast.success(t("otpSent"));
                setTimeLeft(60);
            } else {
                console.error('❌ [Verify] Resend failed:', response);
                toast.error(t("otpFailed"));
            }
        } catch (e) {
            console.error("❌ [Verify] Error while resending OTP:", e.message);
            toast.error(t("genericError"));
        } finally {
            setIsResending(false);
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault()
        const code = otp.join("");
        console.log('🔐 [Verify] OTP verification requested, code:', code);
        
        if (code.length !== 5) {
            console.warn('⚠️ [Verify] Invalid OTP length:', code.length);
            toast.error(t("enter5Digits"));
            return;
        }

        setIsSubmitting(true);
        try {
            console.log('🔐 [Verify] Sending OTP verification request...');
            const response = await verifyOtp(phone, code);
            console.log('🔐 [Verify] OTP verification response:', response);
            
            if (!response?.error) {
                console.log('✅ [Verify] OTP verification successful');
                toast.success(t("loginSuccess"));
                Cookies.set("token", response.data.token);
                console.log('🔐 [Verify] Token saved to cookies');

                console.log('👤 [Verify] Fetching user profile...');
                const userData = await getProfile();
                console.log('👤 [Verify] User profile response:', userData);
                
                if (!userData.error) {
                    console.log('✅ [Verify] User profile loaded successfully');
                    login(response.data.token, {
                        id: userData.data?.id,
                        name: userData.data?.name
                    });
                    console.log('👤 [Verify] User logged in, redirecting...');
                    
                    // await syncCartWithServerOnLogin()
                    setTimeout(() => {
                        const redirectPath = userData.data?.name ? "/" : "/profile";
                        console.log('🔄 [Verify] Redirecting to:', redirectPath);
                        router.push(redirectPath);  
                    }, 100);

                } else {
                    console.error('❌ [Verify] Failed to load user profile:', userData);
                    toast.error("فشل في تحميل بيانات المستخدم");
                    Cookies.remove("token");
                }
            }
            else {
                console.error('❌ [Verify] OTP verification failed:', response);
                toast.error(response.message || t("loginFailed"));
            }
        } catch (error) {
            console.error("❌ [Verify] Login error:", error.message);
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
                <div
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8">

                    <h1 className="text-3xl font-arabic font-bold text-start mb-6 text-gray-800">
                        {t("title")}
                    </h1>

                    <p className="text-start text-gray-600 mb-8 font-arabic">
                        {t("instruction")} <span className="font-bold text-black">{phone}</span>
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
