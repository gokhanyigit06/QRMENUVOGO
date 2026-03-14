export interface ThemeVariables {
  '--theme-bg': string;
  '--theme-text': string;
  '--theme-primary': string;
  '--theme-primary-text': string;
  '--theme-card-bg': string;
  '--theme-card-text': string;
  '--theme-border': string;
  '--theme-muted': string;
  '--theme-muted-text': string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  variables: {
    light: ThemeVariables;
    dark: ThemeVariables;
  };
  fontFamily: string;
}

export const themes: Record<string, ThemeDefinition> = {
  default: {
    id: 'default',
    name: 'Standard',
    fontFamily: 'Inter, sans-serif',
    variables: {
      light: {
        '--theme-bg': '#f9fafb',        // gray-50
        '--theme-text': '#111827',      // gray-900
        '--theme-primary': '#000000',   // black
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#ffffff',   // white
        '--theme-card-text': '#111827',
        '--theme-border': '#e5e7eb',    // gray-200
        '--theme-muted': '#f3f4f6',     // gray-100
        '--theme-muted-text': '#6b7280' // gray-500
      },
      dark: {
        '--theme-bg': '#030712',        // gray-950
        '--theme-text': '#f9fafb',      // gray-50
        '--theme-primary': '#ffffff',   // white
        '--theme-primary-text': '#000000',
        '--theme-card-bg': '#111827',   // gray-900
        '--theme-card-text': '#f9fafb',
        '--theme-border': '#374151',    // gray-700
        '--theme-muted': '#1f2937',     // gray-800
        '--theme-muted-text': '#9ca3af' // gray-400
      }
    }
  },

  elegance: {
    id: 'elegance',
    name: 'Elegance',
    fontFamily: '"Playfair Display", serif',
    variables: {
      light: {
        '--theme-bg': '#fff1f2',        // rose-50
        '--theme-text': '#4c0519',      // rose-950
        '--theme-primary': '#be123c',   // rose-700
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#ffffff',
        '--theme-card-text': '#4c0519',
        '--theme-border': '#fecdd3',    // rose-200
        '--theme-muted': '#ffe4e6',
        '--theme-muted-text': '#9f1239'
      },
      dark: {
        '--theme-bg': '#4c0519',        // rose-950
        '--theme-text': '#fff1f2',      // rose-50
        '--theme-primary': '#f43f5e',   // rose-500
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#881337',   // rose-900
        '--theme-card-text': '#fff1f2',
        '--theme-border': '#be123c',
        '--theme-muted': '#be123c',
        '--theme-muted-text': '#fda4af'
      }
    }
  },

  vibrant: {
    id: 'vibrant',
    name: 'Vibrant',
    fontFamily: '"Poppins", sans-serif',
    variables: {
      light: {
        '--theme-bg': '#fffbeb',        // amber-50
        '--theme-text': '#451a03',      // amber-950
        '--theme-primary': '#f59e0b',   // amber-500
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#ffffff',
        '--theme-card-text': '#451a03',
        '--theme-border': '#fde68a',    // amber-200
        '--theme-muted': '#fef3c7',
        '--theme-muted-text': '#b45309'
      },
      dark: {
        '--theme-bg': '#451a03',        // amber-950
        '--theme-text': '#fffbeb',      // amber-50
        '--theme-primary': '#fbbf24',   // amber-400
        '--theme-primary-text': '#451a03',
        '--theme-card-bg': '#78350f',   // amber-900
        '--theme-card-text': '#fffbeb',
        '--theme-border': '#b45309',
        '--theme-muted': '#b45309',
        '--theme-muted-text': '#fde68a'
      }
    }
  },

  rustic: {
    id: 'rustic',
    name: 'Rustic',
    fontFamily: '"Playfair Display", serif',
    variables: {
      light: {
        '--theme-bg': '#f4efe6',
        '--theme-text': '#4a3623',
        '--theme-primary': '#8b5a2b',
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#ffffff',
        '--theme-card-text': '#4a3623',
        '--theme-border': '#d8cbb8',
        '--theme-muted': '#e9e2d5',
        '--theme-muted-text': '#7a644f'
      },
      dark: {
        '--theme-bg': '#1a1410',
        '--theme-text': '#e8dccb',
        '--theme-primary': '#b88645',
        '--theme-primary-text': '#1a1410',
        '--theme-card-bg': '#2c241b',
        '--theme-card-text': '#e8dccb',
        '--theme-border': '#3c3024',
        '--theme-muted': '#3c3024',
        '--theme-muted-text': '#a89480'
      }
    }
  },
  paper: {
    id: 'paper',
    name: 'Paper',
    fontFamily: '"Brodo", serif',
    variables: {
      light: {
        '--theme-bg': '#fafaf9',        // stone-50
        '--theme-text': '#1c1917',      // stone-900
        '--theme-primary': '#44403c',   // stone-700
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#f5f5f4',   // stone-100
        '--theme-card-text': '#1c1917',
        '--theme-border': '#d6d3d1',    // stone-300
        '--theme-muted': '#e7e5e4',
        '--theme-muted-text': '#78716c'
      },
      dark: {
        '--theme-bg': '#1c1917',        // stone-900
        '--theme-text': '#e7e5e4',      // stone-200
        '--theme-primary': '#d6d3d1',   // stone-300
        '--theme-primary-text': '#1c1917',
        '--theme-card-bg': '#292524',   // stone-800
        '--theme-card-text': '#e7e5e4',
        '--theme-border': '#44403c',    // stone-700
        '--theme-muted': '#44403c',
        '--theme-muted-text': '#a8a29e'
      }
    }
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    fontFamily: '"Source Sans Pro", sans-serif',
    variables: {
      light: {
        '--theme-bg': '#ffffff',
        '--theme-text': '#273938',
        '--theme-primary': '#B83B31',
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#ffffff',
        '--theme-card-text': '#273938',
        '--theme-border': '#f3f4f6',
        '--theme-muted': '#f9fafb',
        '--theme-muted-text': '#9ca3af'
      },
      dark: {
        '--theme-bg': '#111827',
        '--theme-text': '#f9fafb',
        '--theme-primary': '#ef4444',
        '--theme-primary-text': '#ffffff',
        '--theme-card-bg': '#1f2937',
        '--theme-card-text': '#f9fafb',
        '--theme-border': '#374151',
        '--theme-muted': '#374151',
        '--theme-muted-text': '#9ca3af'
      }
    }
  }
};

export function getThemeVariables(themeId: string, isDark: boolean): ThemeVariables {
  const theme = themes[themeId] || themes['default'];
  return isDark ? theme.variables.dark : theme.variables.light;
}
