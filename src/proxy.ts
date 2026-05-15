import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './lib/auth'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'super-secret-key-arin-temizlik'
const key = new TextEncoder().encode(secretKey)

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(sessionCookie, key, { algorithms: ['HS256'] })
    } catch {
      // Invalid or expired token → redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }

  // Refresh session expiry on every admin request
  const res = await updateSession(request)
  return res || NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
