import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Bulunduğumuz ortamın Host değeri (örn: mickeyscafe.com veya qrsystem.vercel.app)
    const hostname = req.headers.get('host') || '';

    // Sistem Ana Domain'leri (Localhost veya Vercel sağladığınız ana uygulamanın domainleri)
    // Buraya projenin kendi ana app domainini (örn: qrmenu.vogolab.com) ekleyebilirsiniz.
    const isMainDomain =
        hostname.includes('localhost') ||
        hostname.includes('vercel.app') ||
        hostname === 'qrmenu.vogolab.com' ||
        hostname === 'www.qrmenu.vogolab.com';

    // 1. Eğer Hostname, bizim ana domainimiz ise karışmıyoruz, normal yönlendirmeye devam etsin (SaaS sayfası veya /admin vb.)
    if (isMainDomain) {
        return NextResponse.next();
    }

    // 2. Eğer bir Restoran KENDİ DOMAIN'ine girmişse (örn: mickeyscafe.com):
    // Arka planda gizlice "/d/mickeyscafe.com" dizinine yönlendirip (rewrite) menüsünü sunacağız.
    return NextResponse.rewrite(new URL(`/d/${hostname}${url.pathname}`, req.url));
}
