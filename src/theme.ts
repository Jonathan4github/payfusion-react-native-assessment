export const theme = {
  colors: {
    background: '#0B1021',
    surface: '#141A33',
    surfaceAlt: '#1C2347',
    text: '#F5F7FF',
    textMuted: '#9AA3C7',
    accent: '#7C9CFF',
    accentMuted: '#3D4F8A',
    border: '#222A4F',
    danger: '#FF6B7A',
    success: '#4ED6A1',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 6,
    md: 12,
    lg: 20,
  },
} as const;

export type Theme = typeof theme;
