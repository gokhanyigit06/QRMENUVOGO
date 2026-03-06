'use client';

import { useMenu } from '@/lib/store';
import { useEffect } from 'react';

export default function FontLoader() {
    const { settings } = useMenu();

    useEffect(() => {
        const uniqueFonts = Array.from(new Set([
            settings.fontFamily || 'Inter',
            settings.categoryFontFamily
        ].filter(Boolean) as string[]));

        const systemFonts = ['Times New Roman', 'Arial', 'Helvetica', 'Courier New', 'Brodo'];
        const fontsToLoad = uniqueFonts.filter(f => !systemFonts.includes(f));

        if (fontsToLoad.length > 0) {
            // Build multi-family query: family=Font1...&family=Font2...
            const familiesQuery = fontsToLoad
                .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;700;900`)
                .join('&');

            const fontUrl = `https://fonts.googleapis.com/css2?${familiesQuery}&display=swap`;

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
