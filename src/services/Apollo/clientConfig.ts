import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { authLink, errorLink, httpLink } from './links'

const link = ApolloLink.from([errorLink, authLink, httpLink])

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link,
})

cache.writeData({
  data: { currentRepoName: null, currentFileName: null, isEdit: true },
})
