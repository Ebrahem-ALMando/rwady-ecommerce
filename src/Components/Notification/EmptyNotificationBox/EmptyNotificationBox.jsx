import { BellOff } from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";

export default function EmptyNotificationBox({onClose}) {
    const t = useTranslations('notification');
    const lang = useLocale();
    return (
        <div className="w-full h-full flex flex-col items-center mt-4 min-h-[320px]">
            <div className="relative flex flex-col items-center justify-center bg-white rounded-2xl shadow-inner p-6  w-full mx-auto border border-blue-100">
                <span className="animate-pulse-slow inline-flex items-center justify-center rounded-full bg-blue-50 p-4 mb-2">
                    <BellOff size={64} strokeWidth={1.5} className="text-[#0741AD]" />
                </span>
                <style jsx>{`
                  @keyframes pulse-slow {
                    0% { box-shadow: 0 0 0 0 rgba(7,65,173,0.15); }
                    70% { box-shadow: 0 0 0 16px rgba(7,65,173,0); }
                    100% { box-shadow: 0 0 0 0 rgba(7,65,173,0); }
                  }
                  .animate-pulse-slow {
                    animation: pulse-slow 2.2s cubic-bezier(0.4,0,0.6,1) infinite;
                  }
                `}</style>
                <h3 className="text-xl font-bold text-[#0741AD] mb-2">
                    {t('creativeEmptyTitle')}
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-xs mb-4">
                    {t('creativeEmptySubtitle')}
                </p>
                <Link href={`/${lang}/products`} onClick={onClose?onClose:null} className="mt-2 px-5 py-2 rounded-lg bg-[#0741AD] hover:bg-blue-900 text-white font-semibold shadow transition">
                    {t('creativeEmptyAction')}
                </Link>
            </div>
        </div>
    );
}
