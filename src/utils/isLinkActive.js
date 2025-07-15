export function isLinkActive(pathname, href, locale) {
    if (!locale) return false;

    const normalizedHref = href.endsWith('/') ? href : href + '/';
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';


    if (normalizedHref === `/${locale}/` || normalizedHref === `/${locale}`) {
        return normalizedPath === `/${locale}/`;
    }

    return normalizedPath.startsWith(normalizedHref);
}
