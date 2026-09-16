import {NextResponse} from 'next/server'; import type {NextRequest} from 'next/server';
export function middleware(req:NextRequest){const token=req.cookies.get('session')?.value;const protectedPath=['/dashboard','/forecast','/optimize','/scenarios'].some(p=>req.nextUrl.pathname.startsWith(p));if(protectedPath&&!token)return NextResponse.redirect(new URL('/login',req.url));return NextResponse.next()}
export const config={matcher:['/dashboard/:path*','/forecast/:path*','/optimize/:path*','/scenarios/:path*']};
