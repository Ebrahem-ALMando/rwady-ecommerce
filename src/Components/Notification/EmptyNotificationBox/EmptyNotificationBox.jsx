import { BellOff } from "lucide-react";
import {useTranslations} from "next-intl";

export default function EmptyNotificationBox() {
    const t=useTranslations('notification');
    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gray-100 rounded-2xl shadow-inner p-4 mt-4">
            <div className="text-gray-400">
                <BellOff size={80} strokeWidth={1.2} className="mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                {t('emptyTitle')}
            </h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
                {t('emptySubtitle')}
            </p>
        </div>
    );
}
