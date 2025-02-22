// components/Navbar/Navbar.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
       <header>

       </header>
    );
}

// مكونات مساعدة
const NavItem = ({ href, title }) => (
    <Link href={href} className="text-gray-700 hover:text-blue-600 px-3 py-2 font-arabic">
        {title}
    </Link>
);

const MobileNavItem = ({ href, title }) => (
    <Link href={href} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 font-arabic">
        {title}
    </Link>
);

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative" onMouseLeave={() => setIsOpen(false)}>
            <button
                onMouseEnter={() => setIsOpen(true)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 font-arabic"
            >
                {title}
                <svg className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {children}
                </div>
            )}
        </div>
    );
};

const MobileDropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 font-arabic"
            >
                {title}
                <svg className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="pl-4">
                    {children}
                </div>
            )}
        </div>
    );
};