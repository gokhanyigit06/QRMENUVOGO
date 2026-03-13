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
    const hostname = req.headers.get('host')?.replace(/:\d+$/, '') || '';

    // Sistem Ana Domain'leri - SADECE ana uygulama hostları.
    // Otomatik oluşturulan restoran subdomain'leri (volkancafe-3005-qrmenu.vogolab.com) burada OLMAMALI.
    const MAIN_DOMAINS = [
        'localhost',
        'qrmenu.vogolab.com',
        'www.qrmenu.vogolab.com',
    ];

    const isMainDomain =
        MAIN_DOMAINS.some(d => hostname === d || hostname.startsWith(d + ':')) ||
        hostname.endsWith('.vercel.app');

    // 1. Eğer Hostname, bizim ana domainimiz ise karışmıyoruz, normal yönlendirmeye devam etsin (SaaS sayfası veya /admin vb.)
    if (isMainDomain) {
        return NextResponse.next();
    }

    // 2. Eğer bir Restoran KENDİ DOMAIN'ine girmişse (örn: mickeyscafe.com veya volkancafe-3005-qrmenu.vogolab.com):
    // Arka planda gizlice "/d/mickeyscafe.com" dizinine yönlendirip (rewrite) menüsünü sunacağız.
    return NextResponse.rewrite(new URL(`/d/${hostname}${url.pathname}`, req.url));
}
