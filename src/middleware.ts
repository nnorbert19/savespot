import { User } from 'next-auth';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const session: session = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/session`,
    {
      headers: headers(),
      // cache: "no-store"
    }
  ).then(async (res) => await res.json());

  const loggedIn = Object.keys(session).length > 0 ? true : false;
  const pathname = request.nextUrl.pathname;

  if (pathname == '/dashboard' && !loggedIn) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

type session = {} | User;
