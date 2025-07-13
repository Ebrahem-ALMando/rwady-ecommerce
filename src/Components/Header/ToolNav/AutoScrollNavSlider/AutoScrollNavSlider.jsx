'use client';
import { useEffect, useRef, useState } from 'react';
import { FaHome, FaTags, FaFireAlt, FaStar } from 'react-icons/fa';
import { MdDiscount, MdCollections } from 'react-icons/md';
import Link from 'next/link';
import './scrollbar-hide.css';
import styles from '../SearchBar/SearchBar.module.css';

const navItems = [
    { label: 'الرئيسية', icon: <FaHome />, href: '/', isStatic: true },
    { label: 'العروض / التخفيضات', icon: <MdDiscount />, href: '/offers' },
    { label: 'الماركات', icon: <FaTags />, href: '/brands' },
    { label: 'الأكثر مبيعاً', icon: <FaFireAlt />, href: '/top-selling' },
    { label: 'المميزة', icon: <FaStar />, href: '/featured' },
];

export default function MobileNavScrollBar({ isScrolled,className }) {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const hintTimeout = useRef(null);


    const handleScroll = () => {
        if (hintTimeout.current) {
            clearTimeout(hintTimeout.current);
        }
    };


    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            startX.current = e.pageX - container.offsetLeft;
            scrollLeft.current = container.scrollLeft;
            document.body.style.userSelect = 'none';
            container.style.cursor = 'grabbing';
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = 'auto';
            container.style.cursor = 'grab';
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();

            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX.current) * 1.8;
            container.scrollLeft = scrollLeft.current - walk;
        };

        container.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('scroll', handleScroll);
        };
    }, [isDragging]);

    return (
        <div className={`${styles.navWrapper} ${isScrolled ? styles.scrolled : ''} ${className}`}>
            <div
                ref={scrollRef}
                className={`flex overflow-x-auto scrollbar-hide gap-4 px-4 py-3 scroll-smooth transition-shadow duration-300 ${
                    isDragging ? 'shadow-lg' : 'shadow-none'
                }`}
                style={{
                    WebkitOverflowScrolling: 'touch',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    direction: 'rtl',
                }}
            >
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href="#"
                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform ${
                            item.isStatic
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                : `bg-gray-200 hover:bg-gray-300 text-gray-600 shadow-sm 
                 ${isDragging ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                ))}

                <div className="flex-shrink-0 w-4"/>
            </div>
        </div>
    );
}
