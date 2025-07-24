'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

// import { sendOtp } from "@/api/services/(auth)/verifyOtp";
// import { getTokenWithClient } from "@/utils/getTokenWithClient";
import styles from './SignIn.module.css';
import {useLocale, useTranslations} from 'next-intl';
import {clientLogin} from "@/api/services/auth/clientLogin";
import {ArrowRightToLine,ArrowLeftToLine} from 'lucide-react'
const phoneUtil = PhoneNumberUtil.getInstance();

const SignIn = () => {
    const t = useTranslations("signin");
    const [phone, setPhone] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const validatePhoneNumber = (phone) => {
        try {
            const parsed = phoneUtil.parse(`+${phone}`);
            return phoneUtil.isValidNumber(parsed);
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validatePhoneNumber(phone)) {
            toast.error(t("invalidPhone"));
            setIsSubmitting(false);
            return;
        }

        try {
            let fullPhone=phone.startsWith('+') ? phone : `+${phone}`
            const response = await clientLogin({ phone: fullPhone });
            console.log(response)
            if (!response.error) {
                toast.success(t("otpSent"));

                router.push(`/verify?phone=${encodeURIComponent('+' + phone)}`);
            } else {
                toast.error(t("otpFailed"));
            }
        } catch (e) {
            console.error("Error while sending OTP:", e.message);
            toast.error(t("genericError"));
        } finally {
            setIsSubmitting(false);
        }
    };
    const lang=useLocale()
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
            className={`min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 ${styles.mainDiv}`}
        >
            <motion.div
                variants={{ hidden: { y: 70, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
            >
                <motion.h1
                    variants={{ hidden: { y: 70, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    className="xl:text-4xl md:text-3xl lg:text-2xl sm:text-xl font-arabic font-bold text-start mb-2 text-gray-700"
                >
                    {t("welcome")} <span className={styles.rwadyName}>RWADY</span>! 🤩
                </motion.h1>

                <motion.p
                    variants={{ hidden: { y: 70, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    className="text-xl font-arabic text-start mb-8 text-gray-400"
                >
                    {t("subtitle")}
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={{hidden: {y: 70, opacity: 0}, visible: {y: 0, opacity: 1}}}>
                        <label className="block text-gray-700 text-xl font-arabic mb-2 text-start">
                            {t("phone")}
                        </label>
                        <PhoneInput
                            inputClass={styles.input}
                            country={'iq'}
                            preferredCountries={['iq']}
                            enableSearch
                            value={phone}
                            onChange={(value, countryData) => {
                                setPhone(value);
                            }}

                            inputProps={{
                                name: 'phone',
                                required: true,
                                dir: 'ltr',
                                placeholder: t("phonePlaceholder"),
                                onKeyDown: (e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                },
                            }}
                            containerStyle={{
                                direction: 'ltr',
                                width: '100%',
                                borderRadius: '0.75rem',
                                border: '2px solid #e5e7eb',
                                padding: '0px',
                                paddingLeft: '10px',
                            }}
                            inputStyle={{
                                width: '100%',
                                height: '3rem',
                                border: 'none',
                                borderRadius: '0.75rem',
                                fontSize: '1.125rem',
                                fontFamily: 'inherit',
                                paddingLeft: '60px',
                                paddingRight: '10px',
                                boxShadow: 'none',
                                textAlign: 'start',
                            }}
                            buttonStyle={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                borderRadius: '0.75rem 0 0 0.75rem',
                            }}
                            dropdownStyle={{
                                textAlign: 'right',
                                direction: 'rtl',
                                maxHeight: '200px',
                                overflowY: 'auto',
                            }}
                        />
                    </motion.div>

                    <motion.div variants={{hidden: {y: 70, opacity: 0}, visible: {y: 0, opacity: 1}}}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-arabic text-lg transition-all disabled:opacity-50 flex justify-center items-center"
                        >
                            {isSubmitting
                                ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                : t("submit")}
                        </button>
                    </motion.div>
                    <motion.div
                        variants={{hidden: {y: 70, opacity: 0}, visible: {y: 0, opacity: 1}}}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="mt-6 flex justify-center"
                    >
                        <button
                            type="button"
                            onClick={() => router.push(`/${lang}/`)}
                            className="flex items-center gap-2 px-5 py-3 bg-white border border-blue-100 shadow-md hover:shadow-lg text-blue-600 hover:text-blue-800 text-lg transition-all rounded-xl  animate-pulse"
                        >
                            {t("browseWithoutLogin") || "تصفح دون تسجيل"}
                            {lang === 'en' ?
                                <ArrowRightToLine/> :
                                <ArrowLeftToLine/>
                            }
                        </button>
                    </motion.div>

                </form>
            </motion.div>
        </motion.div>
    );
};

export default SignIn;
