import { HttpLink } from 'apollo-link-http'

const GRAPHQL = process.env.REACT_APP_GRAPHQL

export const httpLink = () =>
  new HttpLink({ uri: GRAPHQL, credentials: 'include' })
