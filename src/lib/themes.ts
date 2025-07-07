export const themeList = ['violet', 'amber', 'indigo', 'slate', 'fuchsia', 'lime', 'arcaneRed', 'arcaneAlchemy'] as const;
export type Theme = (typeof themeList)[number];
export const defaultTheme: Theme = 'violet';

export const themePalettes: Record<Theme, Record<'500' | '600' | '700' | '800' | '900' | '950' | 'golden', string>> = {
  violet: {
    '500': '#8b5cf6',
    '600': '#7c3aed',
    '700': '#6d28d9',
    '800': '#5b21b6',
    '900': '#4c1d95',
    '950': '#2e1065',
    'golden': '#fbbf24', // rich golden yellow
  },
  amber: {
    '500': '#f59e0b',
    '600': '#d97706',
    '700': '#b45309',
    '800': '#92400e',
    '900': '#78350f',
    '950': '#6b2e0f',
    'golden': '#fff689', // SUPER bright yellow (max contrast vs amber oranges)
  },
  indigo: {
    '500': '#6366f1',
    '600': '#4f46e5',
    '700': '#4338ca',
    '800': '#3730a3',
    '900': '#2e1f8f',
    '950': '#1e1b7e',
    'golden': '#ffd700', // true metallic gold
  },
  slate: {
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a',
    '950': '#0a1118',
    'golden': '#facc15', // rich vibrant yellow
  },
  fuchsia: {
    '500': '#d946ef',
    '600': '#c026d3',
    '700': '#a21caf',
    '800': '#8616af',
    '900': '#701a75',
    '950': '#581d58',
    'golden': '#fcd34d', // warm golden yellow
  },
  lime: {
    '500': '#84cc16',
    '600': '#65a30d',
    '700': '#4d7c0f',
    '800': '#3b5b08',
    '900': '#2a4e06',
    '950': '#213d05',
    'golden': '#ffd60a', // vibrant yellow-gold
  },
  arcaneRed: {
    '500': '#a11d33',
    '600': '#8b162c',
    '700': '#731224',
    '800': '#5a0d1a',
    '900': '#400611',
    '950': '#2a0309',
    'golden': '#ffc300', // bold golden-yellow (sharper contrast with reds)
  },
  arcaneAlchemy: {
    '500': '#16a34a',
    '600': '#15803d',
    '700': '#166534',
    '800': '#14532d',
    '900': '#0f3a23',
    '950': '#081d13',
    'golden': '#ffd700', // metallic gold (works with deep greens)
  },
};
