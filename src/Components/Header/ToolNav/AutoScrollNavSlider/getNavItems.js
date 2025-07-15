import { FaHome, FaTags, FaFireAlt, FaStar } from 'react-icons/fa';
import { MdDiscount } from 'react-icons/md';

export const getNavItems = (lang) => [
    { label: "home", icon: <FaHome />, href: `/${lang}`, isStatic: false },
    { label: "offers", icon: <MdDiscount />, href: `/${lang}/collections/offers-list` },
    { label: "brands", icon: <FaTags />, href: `/${lang}/section/brands` },
    { label: "topSelling", icon: <FaFireAlt />, href: `/${lang}/collections/top-selling` },
    { label: "featured", icon: <FaStar />, href: `/${lang}/collections/recommend-list` },
];
