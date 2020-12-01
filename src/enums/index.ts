export enum COLOR {
  DARK = 'dark',
  LIGHT = 'light',
  ACCENT = 'accent',
  MEDIUM = 'medium',
  ACTIVE = 'active',
  INHERIT = 'inherit',
}

export enum APOLLO_ERRORS {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  JWT_EXPIRED = 'JWT_EXPIRED',
  JWT_SIGNATURE_MISMATCH = 'JWT_SIGNATURE_MISMATCH',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_NOT_VALID = 'REFRESH_TOKEN_NOT_VALID',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export enum COLOR_MODE {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum CONTAINER_ID {
  SIDEBAR = 'sidebar',
  EDITOR = 'editor',
}

export enum THEME_SETTINGS {
  IS_LIGHT_THEME = 'isLightTheme',
  IS_LARGE_TEXT = 'isLargeText',
  IS_FULL_WIDTH = 'isFullWidth',
  FONT = 'font',
}

export enum FONT {
  IS_DEFAULT = 'isDefault',
  IS_SERIF = 'isSerif',
  IS_MONO = 'isMono',
}
