import { type NextRequest, NextResponse } from 'next/server';
import { Models } from 'appwrite';
import httpStatus from 'http-status';

import appwriteConfig from '~/config/appwrite';

export const config = {
    matcher: [
        /*
         * Match all request paths for the ones starting with:
         * - api (API routes)
         */
        '/apis/:path*',
    ],
};

/*
 * This middleware is used to protect API routes only.
 * It checks if the request has a token in the cookie.
 * If not, it responds with a 401 status code.
 * If yes, it initializes the Appwrite client with the token.
 * If the token is invalid, it responds with a 401 status code.
 * If the token is valid, it continues to the API route.
 */

const middleware = async (req: NextRequest) => {
    if (req.nextUrl.pathname.startsWith('/api/')) {
        const cookieStore = req.cookies;
        const authorization = cookieStore.get('Authorization')?.value;
        const sessionId = cookieStore.get('Session-Id')?.value;
        if (!authorization || !sessionId)
            return NextResponse.json({ message: httpStatus['401_MESSAGE'] }, { status: httpStatus.UNAUTHORIZED });

        try {
            const user: Models.User<Models.Preferences> = await fetch(`${appwriteConfig.appwriteUrl}/account`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-appwrite-project': appwriteConfig.appwriteProjectID,
                    'x-appwrite-jwt': String(authorization),
                },
            }).then(r => r.json());

            const session: Models.Session = await fetch(`${appwriteConfig.appwriteUrl}/account/sessions/${sessionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-appwrite-project': appwriteConfig.appwriteProjectID,
                    'x-appwrite-jwt': String(authorization),
                },
            }).then(r => r.json());

            if (!user || !session || (user && !user.$id)) return NextResponse.redirect(new URL('/auth/logout', req.url));

            const requestHeaders = new Headers(req.headers);
            requestHeaders.set('user', JSON.stringify({ ...user, session }));

            return NextResponse.next({
                ...req,
                headers: requestHeaders,
            });
        } catch (error) {
            return NextResponse.json(
                { error, message: httpStatus['500_MESSAGE'] },
                { status: httpStatus.INTERNAL_SERVER_ERROR }
            );
        }
    } else {
        return NextResponse.next(req);
    }
};

export { middleware };
