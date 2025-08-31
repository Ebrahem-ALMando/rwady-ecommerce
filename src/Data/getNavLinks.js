export const getNavLinks = (lang) => [
    { href: `/${lang}`, label: "home" },
    { href: `/${lang}/section/categories`, label: "categories" },
    // { href: `/${lang}/collections/offers-list`, label: "offers" },
    { href: `/${lang}/promotions`, label: "promotions_offers" },
    { href: `/${lang}/section/brands`, label: "brands" },
    // { href: `/${lang}/#`, label: "groups" },
    { href: `/${lang}/products?most_sold=1`, label: "topSelling" },
    { href: `/${lang}/products?is_recommended=1`, label: "featured" },
];
