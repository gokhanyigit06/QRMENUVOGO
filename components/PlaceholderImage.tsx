'use client';

import React from 'react';
import { useMenu } from '@/lib/store';
import { cn, getContrastColor } from '@/lib/utils';
import { getThemeVariables } from '@/lib/themeEngine';

interface PlaceholderImageProps {
  alt?: string;
  className?: string;
}

export default function PlaceholderImage({ alt, className }: PlaceholderImageProps) {
  const { settings, restaurant } = useMenu();

  const themeId = settings.themeId || 'default';
  const isDark = !!settings.darkMode;
  const isCustomMode = themeId === 'custom';

  // Content to display: Logo or Site Name
  const logoUrl = settings.logoUrl;
  const siteName = settings.siteName || restaurant?.name || 'LOGO';

  // Contrast logic for Custom mode
  let customStyle = {};
  if (isCustomMode && settings.customAccentColor) {
    const textColor = getContrastColor(settings.customAccentColor);
    customStyle = {
      backgroundColor: settings.customAccentColor,
      color: textColor === 'white' ? '#ffffff' : '#000000'
    };
  }

  return (
    <div 
      className={cn(
        "flex h-full w-full items-center justify-center p-4 bg-[var(--theme-primary)] text-[var(--theme-primary-text)] font-black text-center uppercase tracking-tighter leading-none",
        className
      )}
      style={customStyle}
    >
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={alt || siteName} 
          className="max-h-[70%] max-w-[70%] object-contain opacity-90 transition-opacity"
        />
      ) : (
        <span className="text-xl sm:text-2xl md:text-3xl line-clamp-2">
          {siteName}
        </span>
      )}
    </div>
  );
}
