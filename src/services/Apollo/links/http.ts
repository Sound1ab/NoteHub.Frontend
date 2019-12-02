import { HttpLink } from 'apollo-link-http'

export const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL })
