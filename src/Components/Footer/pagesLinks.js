

export const getStaticLinks = (lang, t) => [
    { href: `/${lang}/about-us`, label: t("about") },
    { href: `/${lang}/contact-us`, label: t("contact") },
    { href: `/${lang}/terms-and-conditions`, label: t("privacy") },
    { href: `/${lang}/return-policy`, label: t("returnPolicy") },
    { href: `/${lang}/shipment-policies`, label: t("shippingPolicy") },
    { href: `/${lang}/FAQ-list`, label: t("faq") },
];
