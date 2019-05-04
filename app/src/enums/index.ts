export enum EXEC_COMMAND {
  UNDERLINE = 'underline',
}

export enum COLOR {
  DARK = 'dark',
  LIGHT = 'light',
  ACCENT = 'accent',
  MEDIUM = 'medium',
}

export enum LOCAL_STORAGE {
  KEY = 'noted::access_token',
}

export enum GRAPHQL {
  DEV_GRAPHQL = process.env.REACT_APP_GRAPHQL_DEV! as any,
  PROD_GRAPHQL = process.env.NODE_ENV! as any,
}

export enum APOLLO_ERRORS {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
