export function isLinkActive(pathname, href) {
    if (href === '/') {
        return pathname === '/';
    }
    const normalizedHref = href.endsWith('/') ? href : href + '/';
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';
    return normalizedPath.startsWith(normalizedHref);
}