"use client"
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import React, { useState, useEffect } from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTreeItem from "./CategoryTreeItem";

const CategoriesData = ({ data, onChange, selected, lang, isPendingUpdate, t }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ITEMS_TO_SHOW = 5;

    console.log('CategoriesData received:', {
        selected,
        selectedType: typeof selected,
        selectedLength: selected?.length,
        dataLength: data?.length
    });

    // Auto-expand "Show More" if any selected category is in hidden items
    useEffect(() => {
        if (selected && Array.isArray(selected) && selected.length > 0 && data && data.length > ITEMS_TO_SHOW) {
            const visibleItems = data.slice(0, ITEMS_TO_SHOW);
            const hiddenItems = data.slice(ITEMS_TO_SHOW);
            
            // Check if any selected category is in hidden items
            const hasSelectedInHidden = hiddenItems.some(item => {
                // Check current item
                if (selected.includes(String(item.id))) return true;
                
                // Check children recursively
                const checkChildren = (children) => {
                    if (!children) return false;
                    return children.some(child => {
                        if (selected.includes(String(child.id))) return true;
                        return checkChildren(child.children);
                    });
                };
                
                return checkChildren(item.children);
            });
            
            console.log('CategoriesData auto-expand check:', {
                hasSelectedInHidden,
                selected,
                hiddenItemsCount: hiddenItems.length,
                visibleItemsCount: visibleItems.length
            });
            
            if (hasSelectedInHidden) {
                console.log('Auto-expanding "Show More" because selected category is in hidden items');
                setIsExpanded(true);
            }
        }
    }, [selected, data]);

    const visibleItems = isExpanded ? data : data?.slice(0, ITEMS_TO_SHOW);
    const hasMoreItems = data && data.length > ITEMS_TO_SHOW;

    return (
        <FilterSection isMore title={t("categories")}>
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
                                    {visibleItems?.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 0.3,
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <CategoryTreeItem
                                                item={item}
                                                onChange={onChange}
                                                selected={selected}
                                                lang={lang}
                                                isPendingUpdate={isPendingUpdate}
                                                t={t}
                                                index={index}
                                            />
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

export default CategoriesData;
