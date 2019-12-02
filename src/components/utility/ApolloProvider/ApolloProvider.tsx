import React, { ReactNode } from 'react'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { ApolloLink } from 'apollo-link'
import { authLink, errorLink, httpLink } from '../../../services/Apollo/links'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children }: IApolloProvider) {
  const link = ApolloLink.from([errorLink, authLink, httpLink])

  const cache = new InMemoryCache()

  cache.writeData({
    data: { currentRepoName: null, currentFileName: null },
  })

  const client = new ApolloClient({
    cache,
    link,
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
