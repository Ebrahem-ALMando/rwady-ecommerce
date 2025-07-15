"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const RecentSearches = ({ searches, onDelete, onToggleShowMore, showMore, onSearch, onBlur, onClearHistory }) => {
    const t = useTranslations("searchBar.recent");
    return (
        <div onBlur={() => onBlur()} className="px-4 mb-4">
            <div className="flex justify-between items-center">
                <h3 className="text-gray-600 mb-4 text-lg font-medium">{t("title")}</h3>
                <button
                    onClick={onClearHistory}
                    className="flex items-center text-red-400 hover:text-red-600 transition-colors mb-4"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t("clear")}
                </button>
            </div>

            {searches.slice(0, showMore ? 5 : 3).map((search, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 mb-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => onSearch(search)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(index);
                        }}
                        className="text-red-400 hover:text-red-500 p-1"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span className="flex-1 text-right mx-3 text-gray-700 font-medium">{search}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                </motion.div>
            ))}

            {searches.length > 3 && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggleShowMore}
                    className="text-blue-500 hover:text-blue-600 mt-3 text-sm font-medium"
                >
                    {showMore ? t("showLess") : t("showMore")}
                </motion.button>
            )}
        </div>
    );
};

export default RecentSearches;
