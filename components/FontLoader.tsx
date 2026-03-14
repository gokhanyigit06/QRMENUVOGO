'use client';

import { useMenu } from '@/lib/store';
import { useEffect } from 'react';

// All Google Fonts that support Turkish (latin-ext subset)
export const AVAILABLE_FONTS = [
    // --- Mevcut / Temel ---
    { name: 'Inter', label: 'Inter (Standart)' },
    { name: 'Montserrat', label: 'Montserrat (Modern)' },
    { name: 'Playfair Display', label: 'Playfair Display (Zarif Serif)' },
    { name: 'Source Sans Pro', label: 'Source Sans Pro (Elite)' },
    { name: 'Outfit', label: 'Outfit (Çağdaş)' },
    // --- Yeni / Türkçe Destekli ---
    { name: 'Nunito', label: 'Nunito (Samimi & Yuvarlak)' },
    { name: 'Poppins', label: 'Poppins (Geometrik)' },
    { name: 'Lato', label: 'Lato (Profesyonel)' },
    { name: 'Raleway', label: 'Raleway (Zarif & İnce)' },
    { name: 'Open Sans', label: 'Open Sans (Okunabilir)' },
    { name: 'Josefin Sans', label: 'Josefin Sans (Retro Butik)' },
    { name: 'DM Sans', label: 'DM Sans (Minimal)' },
    { name: 'Barlow', label: 'Barlow (Endüstriyel)' },
    { name: 'Cabin', label: 'Cabin (Kafe Hissi)' },
    { name: 'Quicksand', label: 'Quicksand (Sevimli)' },
    { name: 'Cinzel', label: 'Cinzel (Antik Lüks)' },
    { name: 'Cormorant Garamond', label: 'Cormorant Garamond (Klasik Serif)' },
    { name: 'Bebas Neue', label: 'Bebas Neue (Güçlü Başlık)' },
    { name: 'Exo 2', label: 'Exo 2 (Futuristik)' },
];

const SYSTEM_FONTS = ['Times New Roman', 'Arial', 'Helvetica', 'Courier New', 'Brodo'];

export default function FontLoader() {
    const { settings } = useMenu();

    useEffect(() => {
        const allFontNames = AVAILABLE_FONTS.map(f => f.name);
        const uniqueFonts = Array.from(new Set([
            settings.fontFamily || 'Inter',
            settings.categoryFontFamily,
            ...allFontNames
        ].filter(Boolean) as string[]));

        const fontsToLoad = uniqueFonts.filter(f => !SYSTEM_FONTS.includes(f));

        if (fontsToLoad.length > 0) {
            // Build multi-family query with latin-ext subset for Turkish character support (İ, Ş, Ğ, ö, ü, ç...)
            const familiesQuery = fontsToLoad
                .map(f => `family=${f.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400`)
                .join('&');

            const fontUrl = `https://fonts.googleapis.com/css2?${familiesQuery}&subset=latin-ext&display=swap`;

            const linkId = 'dynamic-font-loader';
            const existingLink = document.getElementById(linkId) as HTMLLinkElement;

            if (existingLink) {
                existingLink.href = fontUrl;
            } else {
                const link = document.createElement('link');
                link.id = linkId;
                link.href = fontUrl;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
        }

        // Apply main font to body
        const mainFont = settings.fontFamily || 'Inter';
        document.body.style.fontFamily = `"${mainFont}", sans-serif`;

    }, [settings.fontFamily, settings.categoryFontFamily]);

    return null;
}
