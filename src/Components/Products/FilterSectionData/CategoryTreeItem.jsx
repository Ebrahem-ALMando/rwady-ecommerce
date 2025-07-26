"use client"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";

const CategoryTreeItem = ({ 
    item, 
    onChange, 
    selected, 
    lang, 
    isPendingUpdate, 
    t,
    level = 0,
    parentNumber = "",
    index = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isRTL = lang === 'ar';
    
    // Auto-expand if any children are selected
    useEffect(() => {
        console.log('CategoryTreeItem useEffect triggered:', {
            itemId: item.id,
            itemName: item.name?.[lang],
            hasChildren,
            selected,
            selectedLength: selected?.length,
            children: item.children?.map(child => ({ id: child.id, name: child.name?.[lang] }))
        });

        if (hasChildren && selected && Array.isArray(selected) && selected.length > 0) {
            // Convert selected to strings for comparison
            const selectedStrings = selected.map(id => String(id));
            
            // Check if current item is selected
            const isCurrentSelected = selectedStrings.includes(String(item.id));
            
            // Check if any children are selected
            const hasSelectedChild = item.children.some(child => 
                selectedStrings.includes(String(child.id))
            );
            
            // Check if any grandchildren are selected (recursive check)
            const hasSelectedGrandchild = item.children.some(child => {
                if (child.children && child.children.length > 0) {
                    return child.children.some(grandchild => 
                        selectedStrings.includes(String(grandchild.id))
                    );
                }
                return false;
            });
            
            console.log('Expansion check:', {
                itemId: item.id,
                selectedStrings,
                isCurrentSelected,
                hasSelectedChild,
                hasSelectedGrandchild,
                shouldExpand: isCurrentSelected || hasSelectedChild || hasSelectedGrandchild
            });
            
            // Expand if current item is selected, has selected children, or has selected grandchildren
            if (isCurrentSelected || hasSelectedChild || hasSelectedGrandchild) {
                console.log(`Auto-expanding category: ${item.name?.[lang]} (ID: ${item.id})`);
                setIsExpanded(true);
            }
        }
    }, [hasChildren, selected, item.children, item.id, item.name, lang]);
    
    // Calculate margins and borders based on level
    const getLevelStyles = (level) => {
        const baseMargin = isRTL ? 'mr' : 'ml';
        const basePadding = isRTL ? 'pr' : 'pl';
        const borderSide = isRTL ? 'border-r' : 'border-l';
        
        return {
            margin: `${baseMargin}-${level * 2}`,
            padding: `${basePadding}-${level * 4}`,
            border: `${borderSide}-2`,
            borderColor: level === 0 ? 'border-transparent' : 
                        level === 1 ? 'border-blue-200' :
                        level === 2 ? 'border-green-200' :
                        level === 3 ? 'border-purple-200' :
                        'border-gray-200',
            position: 'relative'
        };
    };

    const handleToggle = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    const levelStyles = getLevelStyles(level);

    // Generate numbering system using index
    const getNumbering = (level, parentNumber, index) => {
        if (level === 0) {
            return `${index + 1}`;
        } else if (level === 1) {
            return `${parentNumber}.${index + 1}`;
        } else if (level === 2) {
            return `${parentNumber}.${index + 1}`;
        } else {
            return `${parentNumber}.${index + 1}`;
        }
    };

    const currentNumber = getNumbering(level, parentNumber, index);

    const getNumberColor = (level) => {
        if (level === 0) return "text-blue-600 font-semibold";
        if (level === 1) return "text-green-600 font-medium";
        if (level === 2) return "text-purple-600";
        if (level === 3) return "text-orange-600";
        return "text-gray-600";
    };

    return (
        <div className="w-full">
            <motion.div 
                className={`flex items-center w-full transition-all duration-300 ${
                    level > 0 ? 'hover:bg-gray-50 rounded-lg' : ''
                }`}
                style={{
                    ...levelStyles,
                    marginLeft: isRTL ? 'auto' : `${level * 8}px`,
                    marginRight: isRTL ? `${level * 8}px` : 'auto',
                    paddingLeft: isRTL ? 'auto' : `${level * 12}px`,
                    paddingRight: isRTL ? `${level * 12}px` : 'auto',
                }}
                whileHover={{ 
                    scale: level > 0 ? 1.02 : 1,
                    x: level > 0 ? (isRTL ? -2 : 2) : 0
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Numbering System */}
                <span className={`text-xs ${isRTL ? 'ml-2' : 'mr-2'} ${getNumberColor(level)} bg-gray-50 px-2 py-1 rounded-full`}>
                    {currentNumber}
                </span>

                {/* Border line for visual hierarchy */}
                {level > 0 && (
                    <motion.div
                        className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b ${
                            level === 1 ? 'from-blue-300 to-blue-100' :
                            level === 2 ? 'from-green-300 to-green-100' :
                            level === 3 ? 'from-purple-300 to-purple-100' :
                            'from-gray-300 to-gray-100'
                        }`}
                        style={{
                            [isRTL ? 'right' : 'left']: '-6px',
                            height: '100%'
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    />
                )}

                {hasChildren && (
                    <motion.button
                        onClick={handleToggle}
                        className={`p-1 ${isRTL ? 'ml-2' : 'mr-2'} text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    key="expanded"
                                    initial={{ rotate: -90 }}
                                    animate={{ rotate: 0 }}
                                    exit={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-blue-600"
                                >
                                    <IoChevronDown size={16} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="collapsed"
                                    initial={{ rotate: 90 }}
                                    animate={{ rotate: 0 }}
                                    exit={{ rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IoChevronForward size={16} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                )}
                
                <div className="flex-1">
                    <FilterCriteriaSelect
                        disabled={isPendingUpdate}
                        selected={selected}
                        id={item.id}
                        section="category_id"
                        title={item.name?.[lang] || "—"}
                        quantity={item.products_count ?? 0}
                        type="checkbox"
                        onChange={onChange}
                    />
                </div>

                {/* Category indicator dot */}
                {level > 0 && (
                    <motion.div
                        className={`w-2 h-2 rounded-full ${
                            level === 1 ? 'bg-blue-400' :
                            level === 2 ? 'bg-green-400' :
                            level === 3 ? 'bg-purple-400' :
                            'bg-gray-400'
                        }`}
                        style={{
                            [isRTL ? 'left' : 'right']: '-3px',
                            position: 'absolute'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    />
                )}
            </motion.div>

            {hasChildren && (
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <motion.div
                                initial={false}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className={`${isRTL ? 'border-r-2' : 'border-l-2'} border-dashed ${
                                    level === 0 ? 'border-blue-200' :
                                    level === 1 ? 'border-green-200' :
                                    level === 2 ? 'border-purple-200' :
                                    'border-gray-200'
                                }`}
                                style={{
                                    [isRTL ? 'marginRight' : 'marginLeft']: `${level * 8 + 4}px`,
                                    [isRTL ? 'paddingRight' : 'paddingLeft']: '8px'
                                }}
                            >
                                {item.children.map((child, childIndex) => (
                                    <motion.div
                                        key={child.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.3,
                                            delay: childIndex * 0.1,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <CategoryTreeItem
                                            item={child}
                                            onChange={onChange}
                                            selected={selected}
                                            lang={lang}
                                            isPendingUpdate={isPendingUpdate}
                                            t={t}
                                            level={level + 1}
                                            parentNumber={currentNumber}
                                            index={childIndex}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default CategoryTreeItem; 