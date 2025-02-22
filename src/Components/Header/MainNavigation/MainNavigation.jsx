"use client"
import React from 'react';
import Link from 'next/link';
import Select from 'react-select';

const options = [
    { value: '', label: 'كل المنتجات' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
];


const MainNavigation = () => {
    return (
        <div className="flex items-center bg-gray-100 p-2 space-x-4 space-x-reverse" dir="rtl">
            {/* All Products Dropdown */}

            <div className="relative">
                <Select
                    options={options}

                    placeholder="كل المنتجات"
                    components={{
                        DropdownIndicator: () => (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                            </svg>
                        ),
                    }}
                />
            </div>
            {/* Navigation Links */}
            <nav className="flex space-x-4 space-x-reverse">
                <Link href="/categories" className="text-gray-600 hover:text-gray-900">الاقسام</Link>
                <Link href="/offers" className="text-gray-600 hover:text-gray-900">العروض/ التخفيضات</Link>
                <Link href="/brands" className="text-gray-600 hover:text-gray-900">الماركات</Link>
                <Link href="/blogs" className="text-gray-600 hover:text-gray-900">المدونات</Link>
                <Link href="/best-sellers" className="text-gray-600 hover:text-gray-900">اكثر مبيعا</Link>
                <Link href="/featured" className="text-gray-600 hover:text-gray-900">المميزة</Link>
            </nav>
        </div>
    );
};

export default MainNavigation;