import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';
import {NextResponse} from 'next/server';
import {getTokenWithServer} from "@/utils/getTokenWithServer";

const intlMiddleware = createMiddleware(routing);

export function middleware(request) {
    const token = request.cookies.get("token")?.value;

    const user_id = request.cookies.get("user_id")?.value;
    const pathname = request.nextUrl.pathname;

    const langMatch = pathname.match(/^\/(ar|en)(\/|$)/);
    const locale = langMatch?.[1] || 'ar';


    const path = pathname.replace(/^\/(ar|en)(\/|$)/, '/');

    const params = request.nextUrl.searchParams;
    const isPaymentCallback =
        params.has('requestId') &&
        params.has('paymentId') &&
        params.has('paymentType') &&
        params.has('status');

    if ((token && user_id) && ["/sign-in", "/verify"].some((p) => path.includes(p))) {
        return NextResponse.redirect(new URL(`/${locale}/`, request.url));
    }

    // startsWith
    if (!(token && user_id) &&
        !isPaymentCallback &&
        ["/orders", "/profile", "/checkout", "/favourites", "/addresses-list", "/transaction-and-payment-history"]
            .some((p) => path.includes(p))) {
        return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
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
