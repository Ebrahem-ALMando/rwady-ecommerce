import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';
import {NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const user_id = request.cookies.get("user_id")?.value;
    const pathname = request.nextUrl.pathname;


    if ((token&&user_id) && ["/sign-in", "/verify"].some((path) => pathname.includes(path))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!(token&&user_id)&& ["/orders", "/profile","/checkout","/favourites","/addresses-list","/favourites"].some((path) => pathname.includes(path))) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    ],
};
