import React, { ReactNode } from 'react'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { ApolloLink } from 'apollo-link'
import { authLink, errorLink, httpLink } from '../../../services/Apollo/links'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

export interface LocalData {
  currentRepoName: string | null
  currentFileName: string | null
}

export const localData: LocalData = {
  currentRepoName: null,
  currentFileName: null,
}

interface IApolloProvider {
  children?: ReactNode
}

export function ApolloProvider({ children }: IApolloProvider) {
  const link = ApolloLink.from([errorLink, authLink, httpLink])

  const cache = new InMemoryCache()

  cache.writeData({
    data: localData,
  })

  const client = new ApolloClient({
    cache,
    link,
    resolvers: {},
  })

  return <ApolloProviderHooks client={client}>{children}</ApolloProviderHooks>
}
