export function isLinkActive(pathname, href, locale, navItems = []) {
    if (!locale) return false;

    const addTrailingSlash = (url) => url.endsWith('/') ? url : url + '/';

    const normalizedHref = addTrailingSlash(href);
    const normalizedPath = addTrailingSlash(pathname);
    const localePrefix = `/${locale}/`;


    const isHome = normalizedHref === localePrefix;

    if (isHome) {
        const knownHrefs = navItems.map(item => addTrailingSlash(item.href));
        const isMatched = knownHrefs.some(href => normalizedPath === href);

        return !isMatched || normalizedPath === localePrefix;
    }

    return normalizedPath === normalizedHref;
}
