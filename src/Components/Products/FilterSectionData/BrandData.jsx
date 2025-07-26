"use client";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React, { useState, useEffect } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const BrandsData = ({ data, onChange, selected, lang, isPendingUpdate, t }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ITEMS_TO_SHOW = 5;

    // Auto-expand "Show More" if any selected brand is in hidden items
    useEffect(() => {
        if (selected && Array.isArray(selected) && selected.length > 0 && data && data.length > ITEMS_TO_SHOW) {
            const visibleItems = data.slice(0, ITEMS_TO_SHOW);
            const hiddenItems = data.slice(ITEMS_TO_SHOW);
            
            // Check if any selected brand is in hidden items
            const hasSelectedInHidden = hiddenItems.some(item => 
                selected.includes(String(item.id))
            );
            
            console.log('BrandsData auto-expand check:', {
                hasSelectedInHidden,
                selected,
                hiddenItemsCount: hiddenItems.length,
                visibleItemsCount: visibleItems.length
            });
            
            if (hasSelectedInHidden) {
                console.log('Auto-expanding "Show More" for brands because selected brand is in hidden items');
                setIsExpanded(true);
            }
        }
    }, [selected, data]);

    const visibleItems = isExpanded ? data : data?.slice(0, ITEMS_TO_SHOW);
    const hasMoreItems = data && data.length > ITEMS_TO_SHOW;

    return (
        <FilterSection isMore title={t("brands")}>
            {Array.isArray(data) && data.length > 0 ? (
                <>
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                        <AnimatePresence>
                            <motion.div
                                key={isExpanded ? "expanded" : "collapsed"}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: "auto",
                                    opacity: 1 
                                }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ 
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                                className="overflow-hidden min-w-max"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ 
                                        y: 0,
                                        opacity: 1 
                                    }}
                                    transition={{ 
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {visibleItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 0.3,
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                            className="flex items-center w-full"
                                        >
                                            {/* Brand Numbering */}
                                            <span className="text-xs mr-2 text-blue-600 font-semibold bg-gray-50 px-2 py-1 rounded-full">
                                                {index + 1}
                                            </span>
                                            
                                            <div className="flex-1">
                                                <FilterCriteriaSelect
                                                    id={item.id}
                                                    section="brand_id"
                                                    title={item.name?.[lang] || "بدون اسم"}
                                                    quantity={item.products_count ?? 5}
                                                    type="checkbox"
                                                    selected={selected}
                                                    onChange={onChange}
                                                    disabled={isPendingUpdate}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    {hasMoreItems && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full mt-3 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center justify-center gap-1 text-sm font-medium"
                        >
                            {isExpanded ? (
                                <div className="flex items-center gap-1">
                                    {t("showLess") || "عرض أقل"}
                                    <IoChevronUp size={16} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    {t("showMore") || "عرض المزيد"}
                                    <IoChevronDown size={16} />
                                </div>
                            )}
                        </button>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </FilterSection>
    );
};

export default BrandsData;
