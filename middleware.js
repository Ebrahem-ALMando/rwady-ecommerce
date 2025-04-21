import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    const isAuth = Boolean(token);
    const isPublic = ["/sign-in", "/verify"].some((path) => pathname.startsWith(path));
    const isProtected = ["/profile", "/wishlist", "/orders"].some((path) => pathname.startsWith(path));

    if (isAuth && isPublic) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuth && isProtected) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in", "/verify", "/profile/:path*", "/wishlist/:path*", "/orders/:path*"],
};
