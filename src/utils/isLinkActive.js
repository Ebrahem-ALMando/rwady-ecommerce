export function isLinkActive(pathname, href, locale, navItems = []) {
    if (!locale) return false;

    const normalizedHref = href.endsWith('/') ? href : href + '/';
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';

    const isHome = normalizedHref === `/${locale}/` || normalizedHref === `/${locale}`;

    if (isHome) {
        const knownHrefs = navItems.map(item =>
            item.href.endsWith('/') ? item.href : item.href + '/'
        );


        const isMatched = knownHrefs.some(href => normalizedPath === href);
        return !isMatched;
    }

    return normalizedPath === normalizedHref;
}
