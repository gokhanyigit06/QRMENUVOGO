import React from 'react';

/**
 * Manual Icon Registry
 * Add your custom SVG icons here as functional components.
 * These replace the heavy lucide-react dynamic loading to save RAM.
 */

export const MANUAL_ICONS: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactNode> = {
    'pizza': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 11h.01" /><path d="M11 15h.01" /><path d="M16 16h.01" /><path d="M2 22c1.25-4.7 4.58-8.04 9.03-9.13A9 9 0 0 1 20 21.09 4.45-2.24 7.78-6.93 9.03A12.42 12.42 0 0 0 2 22Z" /><path d="M7 16h.01" /><path d="M11 11h.01" /><path d="M16 7h.01" /><path d="M11 7h.01" />
        </svg>
    ),
    'burger': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 11V6a2 2 0 0 0-2-2v0a7 7 0 0 0-14 0v0a2 2 0 0 0-2 2v5" /><path d="M4 11h16" /><path d="M20 15v0a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v0" /><path d="M12 11v4" /><path d="M8 11v4" /><path d="M16 11v4" />
        </svg>
    ),
    'coffee': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
        </svg>
    ),
    'drink': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M10 2v5" /><path d="M10 22V7" /><path d="M4 7h16" />
        </svg>
    ),
    'ice-cream': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m7 11 5 11 5-11" /><path d="M12 7a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z" /><path d="M12 2A4 4 0 0 1 16 6h-8A4 4 0 0 1 12 2z" />
        </svg>
    ),
    'cake': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16h16" /><path d="M12 11V7" /><path d="M8 7h8" /><path d="M12 7V3" />
        </svg>
    ),
    'utensils': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    ),
    'star': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    'flame': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 5.5 3 8.5a7 7 0 1 1-14 0c0-3 1-3 1.5-6a6 6 0 0 1 3 3Z" />
        </svg>
    ),
    'heart': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.044 3 5.5l7 7Z" />
        </svg>
    ),
    'soup': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" /><path d="M7 21h10" /><path d="M19 12v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><path d="M12 5V2" />
        </svg>
    ),
    'fish': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6.5 12c.94-3.46 4.03-6 7.5-6 3.47 0 6.56 2.54 7.5 6-.94 3.46-4.03 6-7.5 6-3.47 0-6.56-2.54-7.5-6Z" /><path d="M18 12c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1Z" /><path d="M2 12s5-5 5-5 3 3 3 5-3 5-3 5-5-5-5-5Z" /><path d="M11 12h3" />
        </svg>
    ),
    'wine': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M8 22h8" /><path d="M12 11v11" /><path d="M19 2H5v7a7 7 0 0 0 14 0Z" /><path d="M5 7h14" />
        </svg>
    ),
    'beef': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12.12 12.88c.83-1 1.81-1.88 2.88-2.62a13.4 13.4 0 0 1 4.46-1.64c.76-.14 1.51-.18 2.25-.12.44.03.89.08 1.29.15V4.5A2.5 2.5 0 0 0 20.5 2h-7A2.5 2.5 0 0 0 11 4.5V11a4 4 0 0 0 1.12 1.88Z" /><path d="M6.12 18.88c.83-1 1.81-1.88 2.88-2.62a13.4 13.4 0 0 1 4.46-1.64c.76-.14 1.51-.18 2.25-.12.44.03.89.08 1.29.15V14.5a2.5 2.5 0 0 1-2.5 2.5h-7a2.5 2.5 0 0 1-2.5-2.5V11a4 4 0 0 1 1.12 1.88Z" /><path d="M14.5 17.5c-1 0-2 .5-2 1v1.5a2 2 0 0 0 4 0V18.5c0-.5-1-1-2-1Z" /><path d="M8.5 22.5h7c1.4 0 2.5-1.1 2.5-2.5V14.5c0-1.4-1.1-2.5-2.5-2.5h-7c-1.4 0-2.5 1.1-2.5 2.5V20c0 1.4 1.1 2.5 2.5 2.5Z" />
        </svg>
    ),
    'salad': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 21h10" /><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" /><path d="M11 3a4 4 0 0 0-4 4 4 4 0 0 0 4 4h2a4 4 0 0 0 4-4 4 4 0 0 0-4-4h-2Z" /><path d="M15 5h.01" /><path d="M9 8h.01" />
        </svg>
    ),
    'meat': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M15 4l5 2v5a8 8 0 0 1-16 0V6l5-2" /><path d="M10 4v7" /><path d="M14 4v7" /><path d="M12 11h.01" /><path d="M12 15h.01" /><path d="M12 19h.01" />
        </svg>
    ),
    'pasta': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 21a9 9 0 0 1-9-9h18a9 9 0 0 1-9 9Z" /><path d="M7 21h10" /><path d="M19 12v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><path d="M12 5V2" /><path d="M9 12c0-4 1-8 3-8s3 4 3 8" />
        </svg>
    ),
    'kebab': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="11" y="2" width="2" height="20" rx="1" /><rect x="8" y="5" width="8" height="3" rx="1" /><rect x="8" y="10" width="8" height="3" rx="1" /><rect x="8" y="15" width="8" height="3" rx="1" />
        </svg>
    ),
    'cocktail': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m3 11 9 9 9-9" /><path d="M12 12 3 3" /><path d="M12 12l9-9" /><path d="M12 20v2" /><path d="M9 22h6" />
        </svg>
    ),
    'beer': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17 11h1a3 3 0 0 1 0 6h-1" /><path d="M5 6h12v12H5z" /><path d="M5 22h12" /><path d="M12 6V2" />
        </svg>
    ),
    'sandwich': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m2 11 20-5" /><path d="m2 15 20-5" /><path d="M2 11v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4" /><path d="M12 13h.01" /><path d="M17 11h.01" /><path d="M7 15h.01" />
        </svg>
    ),
    'chef-hat': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17 21a1 1 0 0 0 1-1v-5.33a4 4 0 1 0-8 0V20a1 1 0 0 0 1 1z" /><path d="M6 18h12" /><path d="M6 15h12" /><path d="M6 12h12" /><path d="M7 9a5 5 0 1 1 10 0" />
        </svg>
    ),
    'egg': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2a8 8 0 0 0-8 8c0 4.42 3.58 12 8 12s8-7.58 8-12a8 8 0 0 0-8-8Z" />
        </svg>
    ),
    'croissant': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m4.6 13.1 5-5a2 2 0 1 1 3 3l-5 5" /><path d="m8.5 20 4.4-4.4a2 2 0 1 1 3 3l-4.4 4.4" /><path d="M3.2 16.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" /><path d="m11.2 5.3 5.3-5.3a2.5 2.5 0 1 1 0 5L11.2 5.3Z" /><path d="m11 11 5.3 5.3" />
        </svg>
    ),
    'donut': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3" /><path d="M12 18v3" /><path d="M3 12h3" /><path d="M18 12h3" />
        </svg>
    ),
    'glass': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 21h16" /><path d="M5 2h14l-2 14H7L5 2Z" />
        </svg>
    ),
    'bottle': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9 20h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" /><path d="M7 10h10" /><path d="M12 2v4" />
        </svg>
    ),
    'shish-kebab': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M11 22V2" /><path d="M7 5h9" /><path d="M7 9h9" /><path d="M7 13h9" /><path d="M7 17h9" />
        </svg>
    ),
    'popcorn': (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" /><path d="M10 22 9 8h6l-1 14Z" /><path d="M20 8c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4" />
        </svg>
    )
};

export type ManualIconName = keyof typeof MANUAL_ICONS;
export const ICON_NAMES = Object.keys(MANUAL_ICONS) as ManualIconName[];
