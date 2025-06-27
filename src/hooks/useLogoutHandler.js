'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import {useRouter} from "@/i18n/navigation";

export const useLogoutHandler = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const t = useTranslations("verify");

    const handleLogout = async () => {
        try {
            logout();
            toast.success(t("logoutSuccess"));
            router.push(`/sign-in`);
        } catch (error) {
            toast.error(t("logoutError"));
            console.error("Error during logout:", error.message);
        }
    };

    return handleLogout;
};
