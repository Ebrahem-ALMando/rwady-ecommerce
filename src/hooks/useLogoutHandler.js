'use client';

import {useLocale, useTranslations} from 'next-intl';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import {useRouter} from "next/navigation";



export const useLogoutHandler = (mutate) => {
    const { logout } = useAuth();
    const router = useRouter();
    const lang=useLocale()
    const t = useTranslations("verify");

    const handleLogout = async () => {
        try {
            await logout();
            // await mutate();
            toast.success(t("logoutSuccess"));
            router.push(`/${lang}/sign-in`);
        } catch (error) {
            toast.error(t("logoutError"));
            console.error("Error during logout:", error.message);
        }
    };

    return handleLogout;
};
