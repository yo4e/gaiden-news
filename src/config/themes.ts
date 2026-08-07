export const THEME_IDS = ['editorial-2026', 'plain'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = 'editorial-2026';

const configuredTheme = import.meta.env.PUBLIC_GAIDEN_THEME;

export const ACTIVE_THEME: ThemeId = THEME_IDS.includes(configuredTheme as ThemeId)
  ? (configuredTheme as ThemeId)
  : DEFAULT_THEME;
