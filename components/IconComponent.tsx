'use client';

import React from 'react';
import { MANUAL_ICONS, ManualIconName } from '@/lib/icons';

interface IconComponentProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Optimized Icon Component
 * Uses MANUAL_ICONS registry to avoid heavy lucide-react dynamic imports.
 * Automatically scales to fit the container.
 */
export default function IconComponent({ name, className, style }: IconComponentProps) {
    if (!name) return null;

    // 1. Normalize name (remove Lucide prefix, lowercase, remove special chars)
    const normalized = name
        .replace(/^Lucide/i, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();

    // 2. Try to find in manual registry
    // The keys in MANUAL_ICONS are like 'pizza', 'burger' etc.
    const iconKey = Object.keys(MANUAL_ICONS).find(key =>
        key.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') === normalized
    ) as ManualIconName | undefined;

    const Icon = iconKey ? MANUAL_ICONS[iconKey] : null;

    if (!Icon) {
        // Fallback for common UI icons if they aren't in manual registry yet
        // You can add more fallback logic here or just return null
        return null;
    }

    return (
        <span className={className} style={{ ...style, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon
                width="100%"
                height="100%"
                style={{ display: 'block' }}
            />
        </span>
    );
}

// Export manual icons list for pickers
export const AVAILABLE_ICONS = Object.keys(MANUAL_ICONS);
