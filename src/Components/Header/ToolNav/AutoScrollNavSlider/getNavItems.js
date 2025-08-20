import { FaHome, FaTags, FaFireAlt, FaStar } from 'react-icons/fa';
import { MdDiscount, MdCategory } from 'react-icons/md';
import { Sparkles } from 'lucide-react';

export const getNavItems = (lang) => [
    { label: "home", icon: <FaHome />, href: `/${lang}`, isStatic: false },
    // { label: "offers", icon: <MdDiscount />, href: `/${lang}/collections/offers-list` },
    { label: "promotions_offers", icon: <Sparkles />, href: `/${lang}/promotions` },
    { label: "categories", icon: <MdCategory />, href: `/${lang}/section/categories` },
    { label: "brands", icon: <FaTags />, href: `/${lang}/section/brands` },
    { label: "topSelling", icon: <FaFireAlt />, href: `/${lang}/products?most_sold=1` },
    { label: "featured", icon: <FaStar />, href: `/${lang}/products?is_recommended=1` },
];
