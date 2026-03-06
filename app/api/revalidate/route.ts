
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { slug, secret } = await request.json();

        // Güvenlik kontrolü (Opsiyonel ama tavsiye edilir)
        // if (secret !== process.env.REVALIDATION_SECRET) {
        //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
        // }

        if (!slug) {
            return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
        }

        // Belirli bir restoranın menü sayfasını ve liste görünümünü yenile
        revalidatePath(`/${slug}`);
        revalidatePath(`/listemenu/${slug}`);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: `Cache cleared for ${slug}`
        });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
