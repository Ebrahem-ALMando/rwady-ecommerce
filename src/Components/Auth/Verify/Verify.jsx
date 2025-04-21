'use client';
import { useState, useEffect, Suspense } from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import { motion } from 'framer-motion';
import {sendOtp} from "@/api/services/auth/sendOtp";
import {toast} from "react-hot-toast";
import {clientLogin} from "@/api/services/auth/clientLogin";
import Cookies from "js-cookie";
import {getTokenWithClient} from "@/utils/getTokenWithClient";


const Verify = (props) => {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverOtp, setServerOtp] = useState(5555);
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    useEffect(() => {
        const timer = timeLeft > 0 && setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleOtpChange = (index, value) => {
        if (/^\d+$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };


    const token = getTokenWithClient()
    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token]);
    const handleResend = async () => {
        setIsResending(true);
        try {
            const response = await sendOtp(phone);
            if (response.status_code === 200) {
                toast.success("تم إرسال رمز التحقق بنجاح");
                setTimeLeft(60);
                setServerOtp(response.data.code);
            } else {
                toast.error("فشل في إرسال رمز التحقق");
            }
        } catch (e) {
            console.error("Error while sending OTP:", e.message);
            toast.error("حدث خطأ أثناء إرسال الكود");
        } finally {
            setIsResending(false);
        }
    };



    const handleConfirm = async () => {
        const code = otp.join("");
        if (code.length !== 4) {
            toast.error("الرجاء إدخال رمز مكون من 4 أرقام");
            return;
        }

        if (code !== serverOtp?.toString()) {
            toast.error("رمز التحقق غير صحيح");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("phone", phone);

            const response = await clientLogin(formData);
            console.log(response);

            if (response.status_code === 200) {
                toast.success("تم تسجيل الدخول بنجاح");

                Cookies.remove("token");
                Cookies.remove("user_id");

                Cookies.set("token", response.data.api_token, {
                    expires: 90,
                    secure: true,
                    sameSite: "Strict",
                    path: "/",
                });

                Cookies.set("user_id", response.data.id, {
                    expires: 90,
                    secure: true,
                    sameSite: "Strict",
                    path: "/",
                });

                if (!response.data.name || !response.data.email) {
                    router.push("/profile");
                } else {
                    router.push("/");
                }
            } else {
                toast.error("فشل في تسجيل الدخول");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            toast.error("فشل في العملية. حاول لاحقًا");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

            <motion.div
                dir={"ltr"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4"
            >
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
                    <h1 className="text-3xl font-arabic font-bold text-right mb-6 text-gray-800">
                        رمز التفعيل
                    </h1>

                    <p className="text-right text-gray-600 mb-8 font-arabic">
                        قم بإدخال رمز التفعيل الخاص بك الذي وصلك للتو من خلالنا على رقم جوالك
                        <span className="font-bold text-black"> {phone} </span>
                    </p>

                    <div className="flex justify-center gap-3 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-lg
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                inputMode="numeric"
                            />
                        ))}
                    </div>
                    <div className="text-center text-gray-600 font-arabic mb-6">
                        {timeLeft > 0 ? (
                            <span>يمكنك إعادة الإرسال بعد:
                              <span className={"mr-1 text-blue-600 font-bold "}>
                                    {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                              </span>
                            </span>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                            >
                                {isResending ? 'جاري الإرسال...' : 'إعادة إرسال الرمز'}
                            </button>
                        )}
                    </div>
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting || otp.some(d => d === '')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg
                            font-arabic text-xl transition-all mb-4 disabled:opacity-50"
                    >
                        {isSubmitting ? "جارٍ التحقق..." : "تأكيد"}
                    </button>


                    <div className={"text-right"}>
                        <p className={'text-gray-600'}>
                            لديك مشكلة ما ؟
                            <span className={"mr-1 text-blue-600 font-bold "}>
                                الاتصال بالدعم الفني
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>

    );
}
export default Verify;
