import { HttpLink } from 'apollo-boost'

export const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL })
