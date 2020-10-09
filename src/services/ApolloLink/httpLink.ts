import { HttpLink } from '@apollo/client'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export const httpLink = () =>
  new HttpLink({ uri: GRAPHQL, credentials: 'include' })
