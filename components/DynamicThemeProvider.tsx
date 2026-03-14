'use client';

import React, { useMemo } from 'react';
import { getThemeVariables, themes } from '@/lib/themeEngine';
import { cn } from '@/lib/utils';
import { SiteSettings } from '@/lib/data';

interface DynamicThemeProviderProps {
  children: React.ReactNode;
  settings: SiteSettings;
  className?: string;
}

export default function DynamicThemeProvider({ children, settings, className }: DynamicThemeProviderProps) {
  // Determine actual theme
  const themeId = settings.themeId || 'default';
  const isCustomMode = themeId === 'custom';
  const isDark = !!settings.darkMode;
  
  // Calculate variables
  const variables = useMemo(() => {
    if (isCustomMode) {
      // Fallback to custom colors logic if theme is custom
      return {
        '--theme-bg': isDark ? '#111827' : (settings.customBgColor || '#f9fafb'),
        '--theme-text': isDark ? '#ffffff' : (settings.customTextColor || '#111827'),
        '--theme-primary': settings.customAccentColor || '#000000',
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': isDark ? '#1f2937' : '#ffffff',
        '--theme-card-text': isDark ? '#ffffff' : (settings.customTextColor || '#111827'),
        '--theme-border': isDark ? '#374151' : '#e5e7eb',
        '--theme-muted': isDark ? '#374151' : '#f3f4f6',
        '--theme-muted-text': isDark ? '#9ca3af' : '#6b7280'
      } as Record<string, string>;
    }
    
    return getThemeVariables(themeId, isDark) as unknown as Record<string, string>;
  }, [themeId, isDark, isCustomMode, settings]);

  // Determine font:
  // - settings.fontFamily always wins (user can override any theme's font)
  // - if no fontFamily is explicitly set, fall back to the theme's built-in font
  const fontFamily = useMemo(() => {
    if (settings.fontFamily) {
      return settings.fontFamily;
    }
    const themeDef = themes[themeId] || themes['default'];
    return themeDef.fontFamily;
  }, [themeId, settings.fontFamily]);

  return (
    <div 
      className={cn(
        "theme-provider-root transition-colors duration-500", 
        className
      )}
      style={{
        ...variables,
        fontFamily: fontFamily,
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* We inject global wrapper styles here so that children inherit them */}
      {children}
    </div>
  );
}
