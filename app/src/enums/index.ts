export enum COLOR {
  DARK = 'dark',
  LIGHT = 'light',
  ACCENT = 'accent',
  MEDIUM = 'medium',
  ACTIVE = 'active',
}

export enum LOCAL_STORAGE {
  KEY = 'noted::access_token',
}

export enum GRAPHQL {
  DEV_GRAPHQL = process.env.REACT_APP_GRAPHQL_DEV! as any,
  PROD_GRAPHQL = process.env.REACT_APP_GRAPHQL_PROD! as any,
}

export enum APOLLO_ERRORS {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
