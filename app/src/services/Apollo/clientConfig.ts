import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { authLink, errorLink, httpLink } from './links'

const link = ApolloLink.from([errorLink, authLink, httpLink])

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})
