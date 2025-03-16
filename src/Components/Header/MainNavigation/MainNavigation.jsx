"use client"
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Select from 'react-select';
import styles from './MainNavigation.module.css'
import DropdownMenu from "@/Components/Header/DropdownMenu/DropdownMenu";

const options = [
    { value: '', label: 'كل المنتجات' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
];

const MainNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll) {
                setIsHidden(false); // إظهار عند التمرير لأسفل
            } else {
                setIsHidden(true); // إخفاء عند التمرير لأعلى
            }
            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.mainDiv}>

            <div className={styles.contDiv}>
                {/* زر القائمة المتنقلة */}
                <button
                    className={`${styles.menuToggle} ${isHidden ? styles.hide : ''}`}
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    )}
                </button>

                <div className={styles.selectDiv}>

                    <span className={styles.menuSelect}>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                            fill="#0741AD"/>
                        <path
                            d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                            fill="#0741AD"/>
                        <path
                            d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                            fill="#0741AD"/>
                        </svg>

                    </span>
                    <Select
                        options={options}
                        placeholder="كل المنتجات"
                        className={styles.select}
                        components={{
                            DropdownIndicator: () => (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            ),
                        }}
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: '45px',
                                textAlign: 'right',
                                paddingRight: '40px',
                                background:'#f2f5fb'
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#0741ad !important',
                                opacity: '0.8',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                position: 'relative',
                                right: '10px'
                            }),
                        }}
                        instanceId="unique-select"

                    />

                </div>

                <nav className={`${styles.navItems} ${isMenuOpen ? styles.active : ''}`}
                     onMouseEnter={()=>setIsOpenDropdown(true)}
                     onMouseLeave={() => setIsOpenDropdown(false)}
                >

                    <Link

                        href="/#" className={styles.navItem}>الاقسام</Link>
                    <Link
                        // onMouseEnter={()=>setIsOpenDropdown(true)}
                        // onMouseLeave={() => setIsOpenDropdown(false)}
                        href="/#" className={styles.navItem}> العروض/ التخفيضات</Link>
                    <Link
                        // onMouseEnter={()=>setIsOpenDropdown(true)}
                        // onMouseLeave={() => setIsOpenDropdown(false)}
                        href="/#" className={styles.navItem}>الماركات</Link>
                    <Link
                        // onMouseEnter={()=>setIsOpenDropdown(true)}
                        // onMouseLeave={() => setIsOpenDropdown(false)}
                        href="/#" className={styles.navItem}>المدونات</Link>
                    <Link
                        // onMouseEnter={()=>setIsOpenDropdown(true)}
                        // onMouseLeave={() => setIsOpenDropdown(false)}
                        href="/#" className={styles.navItem}>اكثر مبيعا</Link>
                    <Link
                        // onMouseEnter={()=>setIsOpenDropdown(true)}
                        // onMouseLeave={() => setIsOpenDropdown(false)}
                        href="/#" className={styles.navItem}>المميزة</Link>
                </nav>

            </div>
            {isOpenDropdown ?
                <div
                    onMouseLeave={() => setIsOpenDropdown(false)}
                    onMouseEnter={()=>setIsOpenDropdown(true)}
                >
                    <DropdownMenu
                        isShow={isOpenDropdown}
                    />
                </div>
                : ''
            }
        </div>
    );
};

export default MainNavigation;