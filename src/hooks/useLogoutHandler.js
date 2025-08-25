'use client';

import {useLocale, useTranslations} from 'next-intl';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import {useRouter} from "next/navigation";
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';

export const useLogoutHandler = (mutate) => {
    const { logout } = useAuth();
    const router = useRouter();
    const lang=useLocale()
    const t = useTranslations("verify");

    const handleLogout = async () => {
        try {
            await logout();
            // await mutate();
            toast.custom(() => (
                <CustomToast
                    title={t("logoutSuccess")}
                    type="success"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            router.push(`/${lang}/sign-in`);
        } catch (error) {
            toast.custom(() => (
                <CustomToast
                    title={t("logoutError")}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            console.error("Error during logout:", error.message);
        }
    };

    return handleLogout;
};
